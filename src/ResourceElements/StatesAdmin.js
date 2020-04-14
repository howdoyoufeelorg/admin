import React from "react";
import {Show, List, Edit, TextField, TextInput, ArrayInput, SimpleFormIterator, SimpleForm, SimpleShowLayout, Datagrid, ShowButton, EditButton,
    ArrayField, BulkDeleteButton} from "react-admin";
import {fetchUserGeoEntities, isAdmin} from "../utils";

const BulkActionButtons = props => (
    <>
        <BulkDeleteButton {...props} />
    </>
);

export const StatesList = ({privileges, ...props}) => {
    const {states} = fetchUserGeoEntities();
    return (
        <List {...props} bulkActionButtons={isAdmin(privileges) ? <BulkActionButtons/> : false}
              filter={states.length ? {id: states} : {}}>
            <Datagrid>
                <TextField source="name"/>
                <ShowButton/>
                <EditButton/>
            </Datagrid>
        </List>
    )
}

export const StatesShow = props => {
    return (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="name"/>
            <ArrayField source="officialWebResources">
                <Datagrid>
                    <TextField source="description" />
                    <TextField source="value" />
                </Datagrid>
            </ArrayField>
            <ArrayField source="webResources">
                <Datagrid>
                    <TextField source="description" />
                    <TextField source="value" />
                </Datagrid>
            </ArrayField>
            <ArrayField source="twitterResources">
                <Datagrid>
                    <TextField source="description" />
                    <TextField source="value" />
                </Datagrid>
            </ArrayField>
            <ArrayField source="phoneNumbers">
                <Datagrid>
                    <TextField source="description" />
                    <TextField source="value" />
                </Datagrid>
            </ArrayField>
        </SimpleShowLayout>
    </Show>
)}

export const StatesEdit = ({privileges, ...props}) => (
    <Edit {...props} >
        <SimpleForm redirect="list">
            {isAdmin(privileges) ? <TextInput source="name"/> : null}
            <ArrayInput source="webResources">
                <SimpleFormIterator>
                    <TextInput source="description" label="Description"/>
                    <TextInput source="value" label="URL"/>
                </SimpleFormIterator>
            </ArrayInput>
            <ArrayInput source="twitterResources">
                <SimpleFormIterator>
                    <TextInput source="description" label="Description"/>
                    <TextInput source="value" label="Twitter #"/>
                </SimpleFormIterator>
            </ArrayInput>
            <ArrayInput source="officialWebResources">
                <SimpleFormIterator>
                    <TextInput source="description" label="Description"/>
                    <TextInput source="value" label="URL"/>
                </SimpleFormIterator>
            </ArrayInput>
            <ArrayInput source="phoneNumbers">
                <SimpleFormIterator>
                    <TextInput source="description" label="Description"/>
                    <TextInput source="value" label="Number"/>
                </SimpleFormIterator>
            </ArrayInput>
        </SimpleForm>
    </Edit>
)
