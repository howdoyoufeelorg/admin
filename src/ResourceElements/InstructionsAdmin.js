import {Show, Create, List, Edit, ReferenceField, TextField, ReferenceManyField, SingleFieldList, ReferenceInput, TextInput, SelectInput,
    ArrayInput, SimpleFormIterator, required, SimpleForm, SimpleShowLayout, Datagrid, ShowButton, EditButton, ReferenceArrayInput} from "react-admin";
import React, { useState } from "react";
import { InstructionContentField } from "../Components/InstructionContent";
import RichTextInput from 'ra-input-rich-text';

export const InstructionsList = props => (
    <List {...props}>
        <Datagrid>
            <ReferenceField label="Country" source="country" reference="countries">
                <TextField source="name" />
            </ReferenceField>
            <ReferenceField label="State" source="state" reference="states">
                <TextField source="name" />
            </ReferenceField>
            <ReferenceField label="Area" source="area" reference="areas">
                <TextField source="name" />
            </ReferenceField>
            <TextField source="zipcode" />
            {/*<ReferenceManyField label="Contents" reference="instruction_contents" target="instruction">
                <SingleFieldList>
                    <InstructionContentField />
                </SingleFieldList>
            </ReferenceManyField>*/}
            <ShowButton />
            <EditButton />
        </Datagrid>
    </List>
)

export const InstructionsShow = props => (
    <Show {...props}>
        <SimpleShowLayout>
            <ReferenceField label="Country" source="country" reference="countries">
                <TextField source="name" />
            </ReferenceField>
            <ReferenceField label="State" source="state" reference="states">
                <TextField source="name" />
            </ReferenceField>
            <ReferenceField label="Area" source="area" reference="areas">
                <TextField source="name" />
            </ReferenceField>
            <TextField source="zipcode" />
            <ReferenceManyField label="Contents" reference="instruction_contents" target="instruction">
                <SingleFieldList>
                    <InstructionContentField />
                </SingleFieldList>
            </ReferenceManyField>
        </SimpleShowLayout>
    </Show>
)

const severityOptions = [
    { id: 'low', name: 'Low' },
    { id: 'normal', name: 'Normal' },
    { id: 'high', name: 'High' },
];

const languageOptions = [
    {id: 'en', name: 'US English'},
    {id: 'es', name: 'Espanol'},
];

export const InstructionsCreate = props => (
    <Create {...props} >
        <SimpleForm redirect="list">
            <ReferenceInput label="Country" source="country" reference="countries">
                <SelectInput optionText="name" allowEmpty />
            </ReferenceInput>
            <ReferenceInput label="State" source="state" reference="states">
                <SelectInput optionText="name" allowEmpty />
            </ReferenceInput>
            <ReferenceInput label="Area" source="area" reference="areas">
                <SelectInput optionText="name" allowEmpty />
            </ReferenceInput>
            <TextInput source="zipcode" validate={required()}/>
            <SelectInput source="severity" choices={severityOptions} validate={required()}/>
            <ArrayInput source="contents">
                <SimpleFormIterator>
                    <SelectInput label="Language" source="language" choices={languageOptions} validate={required()} />
                    <RichTextInput label="Content" source="content" />
                </SimpleFormIterator>
            </ArrayInput>
        </SimpleForm>
    </Create>
);

export const InstructionsEdit = props => {
    return (<Edit {...props} >
        <SimpleForm redirect="list">
            <ReferenceInput label="Country" source="country" reference="countries">
                <SelectInput optionText="name" allowEmpty />
            </ReferenceInput>
            <ReferenceInput label="State" source="state" reference="states">
                <SelectInput optionText="name" allowEmpty />
            </ReferenceInput>
            <ReferenceInput label="Area" source="area" reference="areas">
                <SelectInput optionText="name" allowEmpty />
            </ReferenceInput>
            <TextInput source="zipcode" validate={required()}/>
            <SelectInput source="severity" choices={severityOptions} validate={required()}/>
            <ArrayInput source="contents">
                <SimpleFormIterator>
                    <SelectInput label="Language" source="language" choices={languageOptions} validate={required()} />
                    <RichTextInput label="Content" source="content" />
                </SimpleFormIterator>
            </ArrayInput>
        </SimpleForm>
    </Edit>
)};