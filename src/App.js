import React from "react";
import { Redirect, Route } from "react-router-dom";
import { HydraAdmin, hydraDataProvider as baseHydraDataProvider, fetchHydra as baseFetchHydra } from "@api-platform/admin";
import parseHydraDocumentation from "@api-platform/api-doc-parser/lib/hydra/parseHydraDocumentation";
import { authProvider } from "./authProvider";
import ResourceGuesser from "@api-platform/admin/lib/ResourceGuesser";
import {UsersList} from "./UsersList";
import {QuestionCreate, QuestionEdit, QuestionsList} from "./QuestionsAdmin";
import {QuestionLabelCreate, QuestionLabelEdit} from "./QuestionLabelsAdmin";
import {Resource} from "react-admin";

const entrypoint = process.env.REACT_APP_API_HOST + '/api';
const fetchHeaders = { Authorization: `Bearer ${window.localStorage.getItem("token")}` };
const fetchHydra = (url, options = {}) => baseFetchHydra(url, {
  ...options,
  headers: new Headers(fetchHeaders),
});
const apiDocumentationParser = entrypoint => parseHydraDocumentation(entrypoint, {headers: new Headers(fetchHeaders)})
    .then(
        ({api}) => ({api}),
        (result) => {
            console.log('Parsing Failed');
            switch (result.status) {
                case 401:
                    return Promise.resolve({
                        api: result.api,
                        customRoutes: [
                            <Route path="/" render={() => {
                                let response;
                                if(window.localStorage.getItem("token")) {
                                    console.log('WOULD RELOAD');
                                    response = window.location.reload()
                                } else {
                                    console.log('No TOKEN');
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

const dataProvider = baseHydraDataProvider(entrypoint, fetchHydra, apiDocumentationParser);

export default () => (
    <HydraAdmin
        dataProvider={ dataProvider }
        authProvider={ authProvider }
        entrypoint={entrypoint}>

        <ResourceGuesser name="instructions" />
        <ResourceGuesser name="questions" list={QuestionsList} create={QuestionCreate} edit={QuestionEdit} />
        <ResourceGuesser name="question_labels" create={QuestionLabelCreate} edit={QuestionLabelEdit} />
        <ResourceGuesser name="additional_data_labels" create={QuestionLabelCreate} edit={QuestionLabelEdit} />
        <ResourceGuesser name="areas" />
        <ResourceGuesser name="users" list={UsersList}/>
    </HydraAdmin>
);
