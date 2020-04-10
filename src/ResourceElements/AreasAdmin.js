import React from "react";
import {Show, List, Edit, TextField, TextInput, ArrayInput, SimpleFormIterator, SimpleForm, SimpleShowLayout, Datagrid, ShowButton, EditButton, ArrayField} from "react-admin";

export const AreasList = props => (
    <List {...props}>
        <Datagrid>
            <TextField source="name"/>
            <ShowButton />
            <EditButton />
        </Datagrid>
    </List>
)

export const AreasShow = props => {
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

export const AreasEdit = props => (
    <Edit {...props} >
        <SimpleForm redirect="list">
            <TextInput source="name"/>
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
