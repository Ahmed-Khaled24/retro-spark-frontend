import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchWithAutoRefresh } from "../utils/fetch";

export interface APIResponse<T> {
    data: T;
}

export const appApi = createApi({
    baseQuery: fetchWithAutoRefresh,
    reducerPath: "appApi",
    tagTypes: ["Auth", "Teams"],
    endpoints: () => ({}),
});
