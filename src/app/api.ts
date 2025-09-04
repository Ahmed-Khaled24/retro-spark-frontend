import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchWithAutoRefresh } from "../utils/fetch";

export const appApi = createApi({
    baseQuery: fetchWithAutoRefresh,
    reducerPath: "appApi",
    tagTypes: ["Auth"],
    endpoints: () => ({}),
});
