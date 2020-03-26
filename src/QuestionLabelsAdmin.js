import React from "react";
import {SimpleForm, SelectInput, TextInput, Create, Edit} from "react-admin";

const languageChoices = [
    { id: 'en', name: 'English' },
    { id: 'es', name: 'Spanish' },
];

export const QuestionLabelCreate = props => (
    <Create {...props}>
        <SimpleForm redirect={"list"}>
            <SelectInput source="language" choices={languageChoices} />
            <TextInput source="label" />
        </SimpleForm>
    </Create>
);

export const QuestionLabelEdit = props => (
    <Edit {...props}>
        <SimpleForm redirect={"list"}>
            <SelectInput source="language" choices={languageChoices} />
            <TextInput source="label" />
        </SimpleForm>
    </Edit>
);