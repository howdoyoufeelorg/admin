import React, {useState, useEffect} from "react";
import { HydraAdmin } from "@api-platform/admin";
import { authProvider } from "./authProvider";
import { entrypoint, dataProvider } from "./dataProvider";
import { Route } from "react-router-dom";
import {QuestionCreate, QuestionEdit, QuestionsList} from "./QuestionsAdmin";
import {Resource} from "react-admin";
import inviteUser from './inviteUser';
import HdyfLayout from './layout/HdyfLayout';
import {
    InstructionsCreate,
    InstructionsEdit,
    InstructionsList,
    InstructionsShow
} from "./ResourceElements/InstructionsAdmin";

import {CountriesEdit, CountriesList, CountriesShow} from "./ResourceElements/CountriesAdmin";
import {StatesList, StatesEdit, StatesShow} from "./ResourceElements/StatesAdmin";
import {AreasEdit, AreasList, AreasShow} from "./ResourceElements/AreasAdmin";
import {UsersEdit, UsersList, UsersShow} from "./ResourceElements/UsersAdmin";
import {isAdmin, isSuperadmin} from "./utils";

const customRoutes = [
    <Route key="invite_user" path="/invite-user" component={inviteUser.edit}/>
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
            {permissions => {
                const admin = isAdmin(permissions);
                const superadmin = isSuperadmin(permissions);
                return [
                    <Resource name="countries" list={admin ? CountriesList : null} show={admin ? CountriesShow : null} edit={admin ? CountriesEdit : null}/>,
                    <Resource name="states" list={admin ? StatesList : null} show={admin ? StatesShow : null} edit={admin ? StatesEdit : null}/>,
                    <Resource name="areas" list={admin ? AreasList : null} show={admin ? AreasShow : null} edit={admin ? AreasEdit : null}/>,
                    <Resource name="instructions" list={InstructionsList} show={InstructionsShow} create={InstructionsCreate} edit={InstructionsEdit}/>,
                    <Resource name="questions" list={admin ? QuestionsList : null} create={admin ? QuestionCreate : null} edit={admin ? QuestionEdit : null}/>,
                    <Resource name="question_labels" />,
                    <Resource name="additional_data_labels" />,
                    <Resource name="users" list={superadmin ? UsersList : null} show={superadmin ? UsersShow : null} edit={superadmin ? UsersEdit : null}/>,
                    <Resource name="instruction_contents"/>,
                    superadmin ? <Resource name="invite_user"/> : null,
                ]
            }
            }
        </HydraAdmin>
    )
};
