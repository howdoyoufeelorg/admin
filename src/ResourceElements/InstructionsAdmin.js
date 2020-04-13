import {Show, Create, List, Edit, ReferenceField, TextField, ReferenceManyField, SingleFieldList, ReferenceInput, TextInput, SelectInput,
    ArrayInput, SimpleFormIterator, required, SimpleForm, SimpleShowLayout, Datagrid, ShowButton, EditButton, FormDataConsumer, useDataProvider
} from "react-admin";
import {useFormState} from "react-final-form";
import React, { useState, useEffect } from "react";
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

const validateLocation = (values) => {
    const errors = {};
    if (!values.area && !values.state && !values.country ) {
        errors.area = ['You must select Country, Area or State!'];
    }
    return errors;
};

const StateSelector = props => {
    const { values: {country} } = useFormState();
    const dataProvider = useDataProvider();
    const [choices, setChoices] = useState([]);
    useEffect(() => {
        if(country) {
            dataProvider.getOne('countries', {id: country})
                .then(({data: {states}}) => {
                    dataProvider.getMany('states', {ids: states}).then(
                        ({data}) => setChoices(data)
                    )
                })
                .catch(error => {})
        }
    }, [country]);
    return(<SelectInput
        choices={choices}
        {...props}
    />)
}

const AreaSelector = props => {
    const { values: {state} } = useFormState();
    const dataProvider = useDataProvider();
    const [choices, setChoices] = useState([]);
    useEffect(() => {
        if(state) {
            dataProvider.getOne('states', {id: state})
                .then(({data: {areas}}) => {
                    dataProvider.getMany('areas', {ids: areas}).then(
                        ({data}) => setChoices(data)
                    )
                })
                .catch(error => {})
        }
    }, [state]);
    return(<SelectInput
        choices={choices}
        {...props}
    />)
};

export const InstructionsCreate = props => {
    return(<Create {...props}>
        <SimpleForm redirect="list" validate={validateLocation}>
            <ReferenceInput label="Country" source="country" reference="countries">
                <SelectInput optionText="name" allowEmpty />
            </ReferenceInput>
            <StateSelector source="state"/>
            <AreaSelector source="area"/>
            <TextInput source="zipcode"/>
            <SelectInput source="severity" choices={severityOptions} validate={required()}/>
            <ArrayInput source="contents">
                <SimpleFormIterator>
                    <SelectInput label="Language" source="language" choices={languageOptions} validate={required()} />
                    <RichTextInput label="Content" source="content" />
                </SimpleFormIterator>
            </ArrayInput>
        </SimpleForm>
    </Create>
)};

export const InstructionsEdit = props => {
    return (<Edit {...props} >
        <SimpleForm redirect="list" validate={validateLocation}>
            <ReferenceInput label="Country" source="country" reference="countries">
                <SelectInput optionText="name" allowEmpty />
            </ReferenceInput>
            <ReferenceInput label="State" source="state" reference="states">
                <SelectInput optionText="name" allowEmpty />
            </ReferenceInput>
            <ReferenceInput label="Area" source="area" reference="areas">
                <SelectInput optionText="name" allowEmpty />
            </ReferenceInput>
            <TextInput source="zipcode" />
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