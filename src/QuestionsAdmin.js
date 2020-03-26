import React from "react";
import {ListGuesser, FieldGuesser, ShowGuesser, InputGuesser, CreateGuesser, EditGuesser} from "@api-platform/admin";
import {SelectInput} from "react-admin";

export const QuestionsList = props => (
    <ListGuesser {...props}>
        <FieldGuesser source="questionNo" />
        <FieldGuesser source="type" />
        <FieldGuesser source="label" />
        <FieldGuesser source="description" />
        <FieldGuesser source="required" />
    </ListGuesser>
)

export const QuestionShow = props => (
    <ShowGuesser {...props}>
        <FieldGuesser source="questionNo" />
        <FieldGuesser source="type" />
        <FieldGuesser source="label" />
        <FieldGuesser source="description" />
        <FieldGuesser source="required" />
    </ShowGuesser>
)

const inputChoices = [
    { id: 'yesno', name: 'Yes/No' },
    { id: 'slider', name: 'Slider' },
    { id: 'entry', name: 'Entry' },
];

export const QuestionCreate = props => (
    <CreateGuesser {...props}>
        <InputGuesser source="questionNo" />
        <SelectInput source="type" choices={inputChoices} />
        <InputGuesser source="label" />
        <InputGuesser source="description" />
        <InputGuesser source="required" />
        <InputGuesser source="requiresAdditionalData" />
        <SelectInput source="additionalDataType" choices={inputChoices} />
        <InputGuesser source="additionalDataLabel" />
        <InputGuesser source="disabled" />
    </CreateGuesser>
)

export const QuestionEdit = props => (
    <EditGuesser {...props}>
        <InputGuesser source="questionNo" />
        <SelectInput source="type" choices={inputChoices} />
        <InputGuesser source="label" />
        <InputGuesser source="description" />
        <InputGuesser source="required" />
        <InputGuesser source="requiresAdditionalData" />
        <SelectInput source="additionalDataType" choices={inputChoices} />
        <InputGuesser source="additionalDataLabel" />
        <InputGuesser source="disabled" />
    </EditGuesser>
)