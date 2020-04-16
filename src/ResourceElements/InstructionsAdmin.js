import {Show, Create, List, Edit, ReferenceField, TextField, ReferenceManyField, SingleFieldList, ReferenceInput, TextInput, SelectInput,
    ArrayInput, SimpleFormIterator, required, SimpleForm, SimpleShowLayout, Datagrid, ShowButton, EditButton, useDataProvider,
    DateField, FormDataConsumer
} from "react-admin";
import {useFormState} from "react-final-form";
import React, { useState, useEffect } from "react";
import { InstructionContentField } from "../Components/InstructionContent";
import RichTextInput from 'ra-input-rich-text';
import {fetchUserGeoEntities, isAdmin} from "../utils";
import {languageOptions, getUnusedLanguage} from "../language"

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
    { id: 'medium', name: 'Medium' },
    { id: 'high', name: 'High' },
];

const validateLocation = (values) => {
    const errors = {};
    if (!values.area && !values.state && !values.country ) {
        errors.area = ['You must select Country, Area or State!'];
    }
    return errors;
};

const CountrySelector = props => {
    const {allowedCountries} = props;
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
                    .catch(error => {})
            } else {
                dataProvider.getList('states', {pagination: false, sort: {"name":"asc"}}).then(
                    ({data}) => setChoices(data)
                )
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
                    .catch(error => {})
            } else {
                dataProvider.getList('areas', {pagination: false, sort: {"name":"asc"}}).then(
                    ({data}) => setChoices(data)
                )
            }
        }
    }, [state, allowedAreas]);
    if(allowedAreas !== 'all' && !allowedAreas.length) return null;
    return(<SelectInput choices={choices} {...rest} />)
};

export const InstructionsCreate = ({ permissions, ...props }) => {
    const admin = isAdmin(permissions);
    const [initialValues, setInitialValues] = useState({country: null, state: null, area: null});
    const {countries, states, areas} = fetchUserGeoEntities();
    if(countries.length === 1 && initialValues.country === null) {
        setInitialValues(Object.assign({}, initialValues, {country: countries[0]}));
    }
    if(states.length === 1 && initialValues.state === null) {
        setInitialValues(Object.assign({}, initialValues, {state: states[0]}));
    }
    if(areas.length === 1 && initialValues.area === null) {
        setInitialValues(Object.assign({}, initialValues, {area: areas[0]}));
    }
    return(<Create {...props}>
        <SimpleForm redirect="list" validate={validateLocation} initialValues={initialValues}>
            {admin ?
                <ReferenceInput label="Country" source="country" reference="countries">
                    <SelectInput optionText="name" allowEmpty/>
                </ReferenceInput>
                :
                <CountrySelector allowedCountries={countries} />
            }
            {admin ?
                <StateSelector source="state" allowedStates="all"/>
                :
                states.length > 1 ? <StateSelector source="state" allowedStates={states}/> : null
            }
            {admin ?
                <AreaSelector source="area" allowedAreas="all"/>
                :
                areas.length > 1 ? <AreaSelector source="area" allowedAreas={areas}/> : null
            }
            <TextInput source="zipcode"/>
            <SelectInput source="severity" choices={severityOptions} validate={required()}/>
            <FormDataConsumer>
                {({formData, ...rest}) =>
                    <ArrayInput source="contents">
                        <SimpleFormIterator disableAdd={formData.contents.length >= languageOptions.length}>
                            <SelectInput label="Language"
                                         source="language"
                                         choices={languageOptions}
                                         defaultValue={getUnusedLanguage(formData.contents.map(item => item ? item.language : null))}
                                         validate={required()}
                            />
                            <RichTextInput label="Content" source="content" />
                        </SimpleFormIterator>
                    </ArrayInput>
                }
            </FormDataConsumer>
        </SimpleForm>
    </Create>
)};

export const InstructionsEdit = ({ permissions, ...props }) => {
    const admin = isAdmin(permissions);
    const {countries, states, areas} = fetchUserGeoEntities();
    return (<Edit {...props} >
        <SimpleForm redirect="list" validate={validateLocation}>
            {admin ?
                <ReferenceInput label="Country" source="country" reference="countries">
                    <SelectInput optionText="name" allowEmpty/>
                </ReferenceInput>
                :
                <CountrySelector allowedCountries={countries} />
            }
            {admin ?
                <StateSelector source="state" allowedStates="all"/>
                :
                states.length > 1 ? <StateSelector source="state" allowedStates={states}/> : null
            }
            {admin ?
                <AreaSelector source="area" allowedAreas="all"/>
                :
                areas.length > 1 ? <AreaSelector source="area" allowedAreas={areas}/> : null
            }
            <TextInput source="zipcode" />
            <SelectInput source="severity" choices={severityOptions} validate={required()}/>
            <FormDataConsumer>
                {({formData, ...rest}) =>
                    <ArrayInput source="contents">
                        <SimpleFormIterator disableAdd={formData.contents.length >= languageOptions.length}>
                            <SelectInput label="Language"
                                         source="language"
                                         choices={languageOptions}
                                         defaultValue={getUnusedLanguage(formData.contents.map(item => item ? item.language : null))}
                                         validate={required()}
                            />
                            <RichTextInput label="Content" source="content" />
                        </SimpleFormIterator>
                    </ArrayInput>
                }
            </FormDataConsumer>
        </SimpleForm>
    </Edit>
)};