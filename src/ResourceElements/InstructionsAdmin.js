import {Show, Create, List, Edit, ReferenceField, TextField, ReferenceManyField, SingleFieldList, ReferenceInput, TextInput, SelectInput,
    ArrayInput, SimpleFormIterator, required, SimpleForm, SimpleShowLayout, Datagrid, ShowButton, EditButton, useDataProvider,
    DateField
} from "react-admin";
import {useFormState} from "react-final-form";
import React, { useState, useEffect } from "react";
import { InstructionContentField } from "../Components/InstructionContent";
import RichTextInput from 'ra-input-rich-text';
import {isAdmin} from "../utils";

export const InstructionsList = props => (
    <List {...props} sort={{ field: 'updatedAt', order: 'DESC' }}>
        <Datagrid>
            <DateField label="Created" source="createdAt" />
            <DateField label="Updated" source="updatedAt" />
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

const CountrySelector = props => {
    const {allowedCountries, ...rest} = props;
    if(!allowedCountries.length) return null;
    return (
        <ReferenceInput label="Country" source="country" reference="countries" filter={{ id: allowedCountries}}>
            <SelectInput optionText="name" allowEmpty/>
        </ReferenceInput>
    )
};

const StateSelector = ({allowedStates, ...rest}) => {
    const [choices, setChoices] = useState([]);
    const {values: {country}} = useFormState();
    const dataProvider = useDataProvider();
    useEffect(() => {
        if(allowedStates !== 'all' && allowedStates.length) {
            dataProvider.getMany('states', {ids: allowedStates}).then(
                ({data}) => setChoices(data)
            )
        } else {
            if (country) {
                dataProvider.getOne('countries', {id: country})
                    .then(({data: {states}}) => {
                        dataProvider.getMany('states', {ids: states}).then(
                            ({data}) => setChoices(data)
                        )
                    })
                    .catch(error => {
                    })
            }
        }
    }, [country, allowedStates]);
    if(allowedStates !== 'all' && !allowedStates.length) return null;
    return(<SelectInput choices={choices} {...rest} />)
};

const AreaSelector = ({allowedAreas, ...rest}) => {
    const [choices, setChoices] = useState([]);
    const { values: {state} } = useFormState();
    const dataProvider = useDataProvider();
    useEffect(() => {
        if(allowedAreas !== 'all' && !allowedAreas.length) {
            dataProvider.getMany('areas', {ids: allowedAreas}).then(
                ({data}) => setChoices(data)
            )
        } else {
            if (state) {
                dataProvider.getOne('states', {id: state})
                    .then(({data: {areas}}) => {
                        dataProvider.getMany('areas', {ids: areas}).then(
                            ({data}) => setChoices(data)
                        )
                    })
                    .catch(error => {
                    })
            }
        }
    }, [state, allowedAreas]);
    if(allowedAreas !== 'all' && !allowedAreas.length) return null;
    return(<SelectInput choices={choices} {...rest} />)
};

export const InstructionsCreate = ({ permissions, ...props }) => {
    const dataProvider = useDataProvider();
    const admin = isAdmin(permissions);
    const [allowedCountries, setAllowedCountries] = useState([]);
    const [allowedStates, setAllowedStates] = useState([]);
    const [allowedAreas, setAllowedAreas] = useState([]);
    const [initialValues, setInitialValues] = useState({country: null, state: null, area: null});
    useEffect(() => {
        dataProvider.getOne('users', {id: 'api/users/'+localStorage.getItem('id')})
            .then(({data}) => {
                setAllowedCountries(data.countries);
                setAllowedStates(data.states);
                setAllowedAreas(data.areas);
            })
            .catch(error => {})
    }, []);
    if(allowedCountries.length === 1 && initialValues.country === null) {
        setInitialValues(Object.assign({}, initialValues, {country: allowedCountries[0]}));
    }
    if(allowedStates.length === 1 && initialValues.state === null) {
        setInitialValues(Object.assign({}, initialValues, {state: allowedStates[0]}));
    }
    if(allowedAreas.length === 1 && initialValues.area === null) {
        setInitialValues(Object.assign({}, initialValues, {area: allowedAreas[0]}));
    }
    return(<Create {...props}>
        <SimpleForm redirect="list" validate={validateLocation} initialValues={initialValues}>
            {admin ?
                <ReferenceInput label="Country" source="country" reference="countries">
                    <SelectInput optionText="name" allowEmpty/>
                </ReferenceInput>
                :
                <CountrySelector allowedCountries={allowedCountries} />
            }
            {admin ?
                <StateSelector source="state" allowedStates="all"/>
                :
                allowedStates.length > 1 ? <StateSelector source="state" allowedStates={allowedStates}/> : null
            }
            {admin ?
                <AreaSelector source="area" allowedAreas="all"/>
                :
                allowedAreas.length > 1 ? <AreaSelector source="area" allowedAreas={allowedAreas}/> : null
            }
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

export const InstructionsEdit = ({ permissions, ...props }) => {
    const dataProvider = useDataProvider();
    const admin = isAdmin(permissions);
    const [allowedCountries, setAllowedCountries] = useState([]);
    const [allowedStates, setAllowedStates] = useState([]);
    const [allowedAreas, setAllowedAreas] = useState([]);
    useEffect(() => {
        dataProvider.getOne('users', {id: 'api/users/'+localStorage.getItem('id')})
            .then(({data}) => {
                setAllowedCountries(data.countries);
                setAllowedStates(data.states);
                setAllowedAreas(data.areas);
            })
            .catch(error => {})
    }, []);
    return (<Edit {...props} >
        <SimpleForm redirect="list" validate={validateLocation}>
            {admin ?
                <ReferenceInput label="Country" source="country" reference="countries">
                    <SelectInput optionText="name" allowEmpty/>
                </ReferenceInput>
                :
                <CountrySelector allowedCountries={allowedCountries} />
            }
            {admin ?
                <StateSelector source="state" allowedStates="all"/>
                :
                allowedStates.length > 1 ? <StateSelector source="state" allowedStates={allowedStates}/> : null
            }
            {admin ?
                <AreaSelector source="area" allowedAreas="all"/>
                :
                allowedAreas.length > 1 ? <AreaSelector source="area" allowedAreas={allowedAreas}/> : null
            }
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