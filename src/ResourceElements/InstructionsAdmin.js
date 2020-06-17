import {Show, Create, List, Edit, ReferenceField, TextField, ReferenceManyField, SingleFieldList, ReferenceInput, TextInput, SelectInput,
    ArrayInput, SimpleFormIterator, required, SimpleForm, SimpleShowLayout, Datagrid, ShowButton, EditButton, useDataProvider,
    DateField, useInput
} from "react-admin";
import {useFormState} from "react-final-form";
import React, { useState, useEffect, useRef } from "react";
import { InstructionContentField } from "../Components/InstructionContentField";
import RichTextInput from 'ra-input-rich-text';
import {fetchUserGeoEntities, isAdmin} from "../utils";
import {languageOptions, getUnusedLanguage} from "../language"
import {makeStyles} from '@material-ui/core';
import {localStorageSet} from "../authProvider"
import HdyfHelpSidebar from "../layout/HdyfHelpSidebar"

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
            <TextField source="severity" />
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
        errors.area = ['hdyf.validation.select_geolocation'];
    }
    return errors;
};

const CountrySelector = ({allowedCountries, ...rest}) => {
    const [choices, setChoices] = useState([]);
    const dataProvider = useDataProvider();
    useEffect(() => {
        if(allowedCountries !== 'all' && allowedCountries.length) {
            dataProvider.getMany('countries', {ids: allowedCountries}).then(
                ({data}) => setChoices(data)
            )
        } else {
            dataProvider.getList('countries', {pagination: false, sort: {"name": "asc"}}).then(
                ({data}) => setChoices(data)
            )
        }
    }, [allowedCountries]);
    if (!choices.length) return null;
    return(<SelectInput source="country" choices={choices} translateChoice={false} resettable helperText="hdyf.instructions.country_helper_text" {...rest} />)
};

const StateSelector = ({allowedStates, ...rest}) => {
    const [choices, setChoices] = useState([]);
    const {values: {country}} = useFormState();
    const dataProvider = useDataProvider();
    useEffect(() => {
        if(country) { // State is preselected
            dataProvider.getOne('countries', {id: country})
                .then(({data: {states}}) => {
                    // If there's a list of allowed states, then remove any state not on the list, even if it's a part of the selected country
                    if(allowedStates !== 'all' && allowedStates.length) {
                        states = states.filter(value => allowedStates.includes(value));
                    }
                    dataProvider.getMany('states', {ids: states}).then(
                        ({data}) => setChoices(data)
                    )
                })
                .catch(error => {})
        } else {
            if(allowedStates === 'all') {
                dataProvider.getList('states', {pagination: false, sort: {"name":"asc"}}).then(
                    ({data}) => setChoices(data)
                )
            } else {
                if(allowedStates.length) {
                    dataProvider.getMany('states', {ids: allowedStates}).then(
                        ({data}) => setChoices(data)
                    )
                }
            }
        }
    }, [country, allowedStates]);
    if (!choices.length) return null;
    return(
        <SelectInput source="state" choices={choices}
                     translateChoice={false} resettable
                     helperText="hdyf.instructions.state_helper_text"
                     {...rest} />
        )
};

const AreaSelector = (props) => {
    const {allowedAreas, ...rest} = props;
    const [choices, setChoices] = useState([]);
    const { values: {state} } = useFormState();
    const dataProvider = useDataProvider();
    useEffect(() => {
        if(state) { // State is preselected
            dataProvider.getOne('states', {id: state})
                .then(({data: {areas}}) => {
                    // If there's a list of allowed areas, then remove any area not on the list, even if it's a part of the selected state
                    if(allowedAreas !== 'all' && allowedAreas.length) {
                        areas = areas.filter(value => allowedAreas.includes(value));
                    }
                    dataProvider.getMany('areas', {ids: areas}).then(
                        ({data}) => setChoices(data)
                    )
                })
                .catch(error => {})
        } else {
            if(allowedAreas === 'all') {
                dataProvider.getList('areas', {pagination: false, sort: {"name": "asc"}}).then(
                    ({data}) => setChoices(data)
                )
            } else {
                if(allowedAreas.length) {
                    dataProvider.getMany('areas', {ids: allowedAreas}).then(
                        ({data}) => setChoices(data)
                    )
                }
            }
        }
    }, [state, allowedAreas]);
    //useTraceUpdate(props);
    if(!choices.length) return null;
    return(<SelectInput source="area" choices={choices} translateChoice={false} resettable helperText="hdyf.instructions.area_helper_text" {...rest} />)
};

const styles = {
    editWithHelpSidebar: {
        display: "flex"
    },
    formDiv: {
        flexGrow: 1
    },
    select: {
        width: '50% !important'
    },
    contents: {
        width: '100% !important'
    }
}

const useStyles = makeStyles(styles);

export const InstructionsCreate = ({ permissions, ...props }) => {
    const admin = isAdmin(permissions);
    const {countries, states, areas} = fetchUserGeoEntities();
    const initialValues = {
        country: countries.length === 1 ? countries[0] : null,
        state: states.length === 1 ? states[0] : null,
        area: areas.length === 1 ? areas[0] : null,
    }
    const classes = useStyles();
    return (
        <div className={classes.editWithHelpSidebar}>
            <Create className={classes.formDiv} {...props}>
                <SimpleForm redirect="list" validate={validateLocation} initialValues={initialValues}>
                    {(admin || countries.length > 1) &&
                        <CountrySelector className={classes.select} allowedCountries={admin ? "all" : countries} allowEmpty/>
                    }
                    {(admin || states.length > 1) &&
                        <StateSelector className={classes.select} allowedStates={admin ? "all" : states} allowEmpty/>
                    }
                    {(admin || areas.length > 1) &&
                        <AreaSelector className={classes.select} allowedAreas={admin ? "all" : areas} allowEmpty/>
                    }
                    <TextInput source="zipcode" resettable helperText="hdyf.instructions.zipcode_helper_text"/>
                    <SelectInput source="severity" choices={severityOptions} validate={required()} helperText="hdyf.instructions.severity_helper_text"/>
                    <InstructionContent className={classes.contents} source="contents" label="Instruction contents" />
                </SimpleForm>
            </Create>
            {/*<HdyfHelpSidebar helpSection="instructions"/>*/}
        </div>
    )};

export const InstructionsEdit = ({ permissions, ...props }) => {
    const admin = isAdmin(permissions);
    const {countries, states, areas} = fetchUserGeoEntities();
    const classes = useStyles();
    return (
        <div className={classes.editWithHelpSidebar}>
            <Edit className={classes.formDiv} {...props} >
                <SimpleForm redirect="list" validate={validateLocation}>
                    {(admin || countries.length > 1) &&
                    <CountrySelector className={classes.select} allowedCountries={admin ? "all" : countries} allowEmpty/>
                    }
                    {(admin || states.length > 1) &&
                    <StateSelector className={classes.select} allowedStates={admin ? "all" : states} allowEmpty/>
                    }
                    {(admin || areas.length > 1) &&
                    <AreaSelector className={classes.select} allowedAreas={admin ? "all" : areas} allowEmpty/>
                    }
                    <TextInput source="zipcode" resettable helperText="hdyf.instructions.zipcode_helper_text"/>
                    <SelectInput source="severity" choices={severityOptions} validate={required()} helperText="hdyf.instructions.severity_helper_text"/>
                    <InstructionContent className={classes.contents} source="contents" />
                </SimpleForm>
            </Edit>
            {/*<HdyfHelpSidebar helpSection="instructions" />*/}
        </div>
    )
};

const InstructionContent = (props) => {
    const {values: {contents = []}} = useFormState();
    return (
        <ArrayInput {...props}>
            <SimpleFormIterator disableAdd={contents.length >= languageOptions.length}>
                <SelectInput label="Language"
                             source="language"
                             choices={languageOptions}
                             validate={required()}
                             defaultValue={getUnusedLanguage(contents.map(item => item ? item.language : null))}
                />
                <TranslatingInput label="Content" source="content" />
            </SimpleFormIterator>
        </ArrayInput>
    )
}

const TranslatingInput = (props) => {
    const {source, ...rest} = props;
    const {values: {contents}} = useFormState();
    const {
        id,
        isRequired,
        input: { value, onChange },
        meta: { touched, error },
    } = useInput({ source, ...rest });
    useEffect(() => {
        if(contents.length > 1) {
            // Fetch existing text
            const existingContents = contents[0];
            const currentContents = contents[contents.length-1];
            if(currentContents !== undefined) {
                const thisLanguage = currentContents.language;
                if ((value === '' || value === '<p><br></p>') && existingContents.content) {
                    const translate_uri = process.env.REACT_APP_API_HOST + '/do-translate';
                    const request = new Request(translate_uri, {
                        method: 'POST',
                        body: JSON.stringify({language: thisLanguage, content: existingContents.content}),
                        headers: new Headers({
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + localStorage.getItem('token')
                        }),
                    });
                    fetch(request).then(response => {
                        if (response.status < 200 || response.status >= 300) {
                            throw new Error(response.statusText);
                        }
                        return response.json();
                    }).then((json) => {
                        onChange(json.translation);
                    })
                }
            }
        }
    }, [contents]);
    return (<RichTextInput {...props}/>)
}

function useTraceUpdate(props) {
    const prev = useRef(props);
    useEffect(() => {
        const changedProps = Object.entries(props).reduce((ps, [k, v]) => {
            if (prev.current[k] !== v) {
                ps[k] = [prev.current[k], v];
            }
            return ps;
        }, {});
        if (Object.keys(changedProps).length > 0) {
            console.log('Changed props:', changedProps);
        }
        prev.current = props;
    });
}