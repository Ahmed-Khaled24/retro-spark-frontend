import type { UserDto } from "./dtos/user.dto";
import type { SignupDto } from "./dtos/signup.dto";
import type { LoginDto } from "./dtos/login.dto";
import { appApi } from "../../app/api";
import { fetchWithAutoRefresh } from "../../utils/fetch";
import type { QueryReturnValue } from "@reduxjs/toolkit/query";
import { Constants } from "../../utils/constants";

export const authApi = appApi.injectEndpoints({
    endpoints: ({ mutation, query }) => ({
        getCurrentUser: query<UserDto, void>({
            queryFn: async (_, baseQueryApi) => {
                // Hit localstorage to find if there is a user logged in.
                const userFromLocalStorage = localStorage.getItem(
                    Constants.LocalStorageKeys.USER,
                );
                if (userFromLocalStorage) {
                    const user = JSON.parse(userFromLocalStorage) as UserDto;
                    return { data: user };
                }
                const result: QueryReturnValue<any> =
                    await fetchWithAutoRefresh(
                        {
                            url: "users/me",
                            method: "GET",
                        },
                        baseQueryApi,
                        {},
                    );

                // Persist the user in localstorage between reloads.
                localStorage.setItem(
                    Constants.LocalStorageKeys.USER,
                    JSON.stringify(result.data.data),
                );
                const user = result.data as UserDto;
                return { data: user };
            },
            providesTags: ["Auth"],
        }),
        signup: mutation<unknown, SignupDto>({
            query: (data) => ({
                url: "auth/signup",
                method: "POST",
                body: data,
            }),
        }),
        login: mutation<unknown, LoginDto>({
            query: (data) => ({
                url: "auth/login",
                method: "POST",
                body: data,
            }),
        }),
        logout: mutation<unknown, void>({
            query: () => ({
                url: "auth/logout",
                method: "POST",
            }),
            invalidatesTags: ["Auth"],
            async onQueryStarted(_, { queryFulfilled }) {
                await queryFulfilled;
                localStorage.removeItem(Constants.LocalStorageKeys.USER);
            },
        }),
        refreshToken: mutation<UserDto, void>({
            query: () => ({
                url: "auth/refresh",
                method: "POST",
            }),
        }),
    }),
});

export const {
    useGetCurrentUserQuery,
    useLoginMutation,
    useSignupMutation,
    useLogoutMutation,
    useRefreshTokenMutation,
} = authApi;
