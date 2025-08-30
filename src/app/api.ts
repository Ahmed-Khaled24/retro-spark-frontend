import { createApi } from "@reduxjs/toolkit/query/react";
import { vanillaFetch } from "../utils/fetch";

export const appApi = createApi({
    baseQuery: vanillaFetch,
    reducerPath: "appApi",
    tagTypes: ["Auth"],
    endpoints: () => ({}),
});
