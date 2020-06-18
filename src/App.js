import React from "react";
import { HydraAdmin } from "@api-platform/admin";
import { authProvider } from "./authProvider";
import { entrypoint, dataProvider } from "./dataProvider";
import { Route } from "react-router-dom";
import {Resource} from "react-admin";
import inviteUser from './inviteUser';
import HdyfLayout from './layout/HdyfLayout';
import {
    InstructionsCreate,
    InstructionsEdit,
    InstructionsList,
    InstructionsShow
} from "./ResourceElements/InstructionsAdmin";
import {QuestionCreate, QuestionEdit, QuestionsList} from "./ResourceElements/QuestionsAdmin";
import {CountriesEdit, CountriesList, CountriesShow} from "./ResourceElements/CountriesAdmin";
import {StatesList, StatesEdit, StatesShow} from "./ResourceElements/StatesAdmin";
import {AreasEdit, AreasList, AreasShow} from "./ResourceElements/AreasAdmin";
import {UsersEdit, UsersList, UsersShow} from "./ResourceElements/UsersAdmin";
import {fetchUserGeoEntities, isAdmin, isSuperadmin} from "./utils";
import i18nProvider from "./i18n/i18nProvider";
import { createMuiTheme } from '@material-ui/core/styles';
import indigo from '@material-ui/core/colors/indigo';
import blueGrey from '@material-ui/core/colors/blueGrey';
import red from '@material-ui/core/colors/red';

const customRoutes = [
    <Route key="invite_user" path="/invite-user" component={inviteUser.edit}/>
];

const myTheme = createMuiTheme({
    palette: {
        primary: indigo,
        secondary: blueGrey,
        error: red,
        contrastThreshold: 3,
        tonalOffset: 0.2,
    },
    spacing: 10
});

export default () => {
    const {countries, states, areas} = fetchUserGeoEntities();
    return (
        <HydraAdmin
            dataProvider={ dataProvider }
            authProvider={ authProvider }
            i18nProvider={ i18nProvider }
            entrypoint={entrypoint}
            customRoutes={customRoutes}
            layout={HdyfLayout}
            theme={myTheme}
        >
            {permissions => {
                const admin = isAdmin(permissions);
                const superadmin = isSuperadmin(permissions);
                return [
                    <Resource name="instructions"
                              list={InstructionsList}
                              show={InstructionsShow}
                              create={InstructionsCreate}
                              edit={InstructionsEdit}
                    />,
                    <Resource name="countries"
                              list={(admin || countries.length) ? CountriesList : null}
                              show={(admin || countries.length) ? CountriesShow : null}
                              edit={(admin || countries.length) ? CountriesEdit : null}
                              options={{ label: admin ? 'Countries' : 'Country resources' }}
                    />,
                    <Resource name="states"
                              list={(admin || states.length) ? StatesList : null}
                              show={(admin || states.length) ? StatesShow : null}
                              edit={(admin || states.length) ? StatesEdit : null}
                              options={{ label: admin ? 'States' : 'State resources' }}
                    />,
                    <Resource name="areas"
                              list={(admin || areas.length) ? AreasList : null}
                              show={(admin || areas.length) ? AreasShow : null}
                              edit={(admin || areas.length) ? AreasEdit : null}
                              options={{ label: admin ? 'Areas' : 'Area resources' }}
                    />,
                    <Resource name="questions"
                              list={admin ? QuestionsList : null}
                              create={admin ? QuestionCreate : null}
                              edit={admin ? QuestionEdit : null}
                    />,
                    <Resource name="users"
                              list={superadmin ? UsersList : null}
                              show={superadmin ? UsersShow : null}
                              edit={superadmin ? UsersEdit : null}
                    />,
                    <Resource name="question_labels" />,
                    <Resource name="additional_data_labels" />,
                    <Resource name="instruction_contents"/>,
                    superadmin ? <Resource name="invite_user"/> : null,
                ]
            }
            }
        </HydraAdmin>
    )
};
