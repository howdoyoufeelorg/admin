import React from "react";
import {List, Datagrid, TextField, Edit, SimpleForm, TextInput, ReferenceArrayInput, SelectArrayInput, ShowButton, EditButton,
    Show, SimpleShowLayout, ReferenceArrayField, SingleFieldList, ChipField } from "react-admin";
export const UsersList = props => (
    <List {...props}>
        <Datagrid>
            <TextField source="email" />
            <TextField source="firstname" />
            <TextField source="lastname" />
            <ShowButton />
            <EditButton />
        </Datagrid>
    </List>
);
export const UsersShow = props => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="email" />
            <TextField source="firstname" />
            <TextField source="lastname" />
            <ReferenceArrayField label="Countries" reference="countries" source="countries">
                <SingleFieldList>
                    <ChipField source="name" />
                </SingleFieldList>
            </ReferenceArrayField>
            <ReferenceArrayField label="States" reference="states" source="states">
                <SingleFieldList>
                    <ChipField source="name" />
                </SingleFieldList>
            </ReferenceArrayField>
            <ReferenceArrayField label="Areas" reference="areas" source="areas">
                <SingleFieldList>
                    <ChipField source="name" />
                </SingleFieldList>
            </ReferenceArrayField>
        </SimpleShowLayout>
    </Show>
)
export const UsersEdit = props => (
    <Edit {...props}>
        <SimpleForm redirect="list">
            <TextInput source="email" />
            <TextInput source="firstname" />
            <TextInput source="middlename" />
            <TextInput source="lastname" />
            <ReferenceArrayInput label="Countries" source="countries" reference="countries" perPage={1000}>
                <SelectArrayInput optionText="name" allowEmpty />
            </ReferenceArrayInput>
            <ReferenceArrayInput label="States" source="states" reference="states" perPage={1000} sort={{ field: 'name', order: 'ASC' }}>
                <SelectArrayInput optionText="name" allowEmpty />
            </ReferenceArrayInput>
            <ReferenceArrayInput label="Areas" source="areas" reference="areas" perPage={1000}>
                <SelectArrayInput optionText="name" allowEmpty />
            </ReferenceArrayInput>
        </SimpleForm>
    </Edit>
)