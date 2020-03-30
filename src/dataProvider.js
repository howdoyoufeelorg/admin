import {fetchHydra as baseFetchHydra} from "@api-platform/admin";
import vkHydraDataProvider from "./dataProviders/hydraDataProvider";
import parseHydraDocumentation from "@api-platform/api-doc-parser/lib/hydra/parseHydraDocumentation";
import React from "react";
import { Redirect, Route } from "react-router-dom";

export const entrypoint = process.env.REACT_APP_API_HOST + '/api';

const fetchHeaders = { Authorization: `Bearer ${window.localStorage.getItem("token")}` };
const fetchHydra = (url, options = {}) => baseFetchHydra(url, {
    ...options,
    headers: new Headers(fetchHeaders),
});
const apiDocumentationParser = entrypoint => parseHydraDocumentation(entrypoint, {headers: new Headers(fetchHeaders)})
    .then(
        ({api}) => ({api}),
        (result) => {
            switch (result.status) {
                case 401:
                    return Promise.resolve({
                        api: result.api,
                        customRoutes: [
                            <Route path="/" render={() => {
                                let response;
                                if(window.localStorage.getItem("token")) {
                                    const expires = window.localStorage.getItem("expires");
                                    if(expires) {
                                        const currentTimestamp = (new Date()).getTime();
                                        if (parseInt(expires+'000') < currentTimestamp) {
                                            window.localStorage.removeItem("token");
                                            window.localStorage.removeItem("roles");
                                            window.localStorage.removeItem("expires");
                                        }
                                    }
                                    response = window.location.reload()
                                } else {
                                    response = <Redirect to="/login"/>
                                }
                                return response;
                            }}/>
                        ],
                    });
                default:
                    return Promise.reject(result);
            }
        },
    );
const dataProvider = vkHydraDataProvider(entrypoint, fetchHydra, apiDocumentationParser);
export {dataProvider};
