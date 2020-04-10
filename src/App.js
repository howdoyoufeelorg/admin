import React, {useState, useEffect} from "react";
import { HydraAdmin } from "@api-platform/admin";
import { authProvider } from "./authProvider";
import { entrypoint, dataProvider } from "./dataProvider";
import ResourceGuesser from "@api-platform/admin/lib/ResourceGuesser";
import { Route } from "react-router-dom";
import {UsersList} from "./UsersList";
import {QuestionCreate, QuestionEdit, QuestionsList} from "./QuestionsAdmin";
import {QuestionLabelCreate, QuestionLabelEdit} from "./QuestionLabelsAdmin";
import {Resource, useDataProvider} from "react-admin";
import inviteUser from './inviteUser';
import HdyfLayout from './layout/HdyfLayout';
import {
    InstructionsCreate,
    InstructionsEdit,
    InstructionsList,
    InstructionsShow
} from "./ResourceElements/InstructionsAdmin";

import {
    CountriesEdit,
    CountriesList,
    CountriesShow
} from "./ResourceElements/CountriesAdmin";
import {StatesList, StatesEdit, StatesShow} from "./ResourceElements/StatesAdmin";
import {AreasEdit, AreasList, AreasShow} from "./ResourceElements/AreasAdmin";

const customRoutes = [
    <Route key="invite_user" path="/invite-user" component={inviteUser.edit} />
];

export default () => {
    return (
        <HydraAdmin
            dataProvider={ dataProvider }
            authProvider={ authProvider }
            entrypoint={entrypoint}
            customRoutes={customRoutes}
            layout={HdyfLayout}
        >
            <Resource name="countries" list={CountriesList} show={CountriesShow} edit={CountriesEdit} />
            <Resource name="states" list={StatesList} show={StatesShow} edit={StatesEdit} />
            <Resource name="areas" list={AreasList} show={AreasShow} edit={AreasEdit} />
            <Resource name="instructions" list={InstructionsList} show={InstructionsShow} create={InstructionsCreate} edit={InstructionsEdit} />
            <ResourceGuesser name="questions" list={QuestionsList} create={QuestionCreate} edit={QuestionEdit} />
            <ResourceGuesser name="question_labels" create={QuestionLabelCreate} edit={QuestionLabelEdit} />
            <ResourceGuesser name="additional_data_labels" create={QuestionLabelCreate} edit={QuestionLabelEdit} />
            <ResourceGuesser name="users" list={UsersList}/>
            <Resource name="instruction_contents" />
            {/* Custom resources (not in API) */}
            <Resource name="invite_user" />
        </HydraAdmin>
    )
};
