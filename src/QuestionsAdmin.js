import React from "react";
import {ListGuesser, FieldGuesser, ShowGuesser, InputGuesser, CreateGuesser, EditGuesser} from "@api-platform/admin";
import {SelectInput, ReferenceArrayInput, SelectArrayInput, ReferenceManyField, ReferenceArrayField, SingleFieldList, ChipField} from "react-admin";

export const QuestionsList = props => (
    <ListGuesser {...props}>
        <FieldGuesser source="questionNo" />
        <FieldGuesser source="questionWeight" />
        <FieldGuesser source="type" />
        <FieldGuesser source="required" />
    </ListGuesser>
)

export const QuestionShow = props => (
    <ShowGuesser {...props}>
        <FieldGuesser source="questionNo" />
        <FieldGuesser source="questionWeight" />
        <FieldGuesser source="type" />
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
        {/*<InputGuesser source="questionNo" />*/}
        <InputGuesser source="questionWeight" />
        <SelectInput source="type" choices={inputChoices} />
        <ReferenceArrayInput source="labels" reference="question_labels" label="Labels per Language">
            <SelectArrayInput optionText="label" />
        </ReferenceArrayInput>
        <InputGuesser source="required" />
        <InputGuesser source="requiresAdditionalData" />
        <SelectInput source="additionalDataType" choices={inputChoices} />
        <ReferenceArrayInput source="additionalDataLabels" reference="additional_data_labels" label="Labels per Language">
            <SelectArrayInput optionText="label" />
        </ReferenceArrayInput>
        <InputGuesser source="disabled" />
    </CreateGuesser>
)

export const QuestionEdit = props => (
    <EditGuesser {...props}>
        {/*<InputGuesser source="questionNo" />*/}
        <InputGuesser source="questionWeight" />
        <SelectInput source="type" choices={inputChoices} />
        <ReferenceArrayInput source="labels" reference="question_labels" label="Labels per Language">
            <SelectArrayInput optionText="label" />
        </ReferenceArrayInput>
        <InputGuesser source="required" />
        <InputGuesser source="requiresAdditionalData" />
        <SelectInput source="additionalDataType" choices={inputChoices} />
        <ReferenceArrayInput source="additionalDataLabels" reference="additional_data_labels" label="Labels per Language">
            <SelectArrayInput optionText="label" />
        </ReferenceArrayInput>
        <InputGuesser source="disabled" />
    </EditGuesser>
)