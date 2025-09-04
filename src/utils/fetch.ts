import {
    fetchBaseQuery,
    type BaseQueryApi,
    type BaseQueryFn,
} from "@reduxjs/toolkit/query";

export const vanillaFetch = fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}/api/`,
    credentials: "include", // To send the cookies
});

export const fetchWithAutoRefresh: BaseQueryFn = async (
    args: any,
    api: BaseQueryApi,
    extraOptions: any,
) => {
    // Try to execute the request with the given arguments.
    let result = await vanillaFetch(args, api, extraOptions);

    /**
     * If the request fails with a 401, it means that the token is expired or invalid.
     * In this case, try to refresh the token and execute the request again.
     */
    if ([401].includes(result?.error?.status as number)) {
        // Send a request to the server to refresh the token.
        const refreshResult = await vanillaFetch(
            { url: "/auth/refresh", method: "POST" },
            api,
            extraOptions,
        );

        if (refreshResult.meta?.response?.status === 200) {
            // Execute the request again with the new token.
            result = await vanillaFetch(args, api, extraOptions);
        }
    }

    return result;
};
