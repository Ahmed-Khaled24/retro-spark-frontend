import type { UserDto } from "./dtos/user.dto";
import type { SignupDto } from "./dtos/signup.dto";
import type { LoginDto } from "./dtos/login.dto";
import { appApi } from "../../app/api";
import { vanillaFetch } from "../../utils/fetch";

export const authApi = appApi.injectEndpoints({
    endpoints: ({ mutation, query }) => ({
        getCurrentUser: query<UserDto, void>({
            queryFn: async (_, baseQueryApi) => {
                // Hit localstorage to find if there is a user logged in.
                const userFromLocalStorage = localStorage.getItem("user");
                if (userFromLocalStorage) {
                    return {
                        data: JSON.parse(userFromLocalStorage) as UserDto,
                    } as any;
                }

                const result = await vanillaFetch(
                    {
                        url: "users/me",
                        method: "GET",
                    },
                    baseQueryApi,
                    {},
                );

                if (result.data) {
                    // Persist the user in localstorage between reloads.
                    localStorage.setItem("user", JSON.stringify(result.data));
                    return { data: result.data as UserDto };
                }

                return { error: result.error };
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
                localStorage.removeItem("user");
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
