import React from "react";
import {SelectInput, List, Datagrid, TextField, Show, SimpleShowLayout, Create, SimpleForm, Edit, NumberInput,
    BooleanInput, ArrayInput, SimpleFormIterator, required, ShowButton, EditButton, FormDataConsumer, TextInput} from "react-admin";
import {languageOptions, getUnusedLanguage} from "../language"
import {makeStyles} from '@material-ui/core';
import {useFormState} from "react-final-form";


export const QuestionsList = props => (
    <List {...props} sort={{ field: 'questionWeight', order: 'DESC' }}>
        <Datagrid>
            <TextField source="questionWeight" />
            <TextField source="type" />
            <TextField source="description" />
            <TextField source="required" />
            <ShowButton />
            <EditButton />
        </Datagrid>
    </List>
)

export const QuestionShow = props => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="questionWeight" />
            <TextField source="type" />
            <TextField source="description" />
            <TextField source="required" />
        </SimpleShowLayout>
    </Show>
)

const inputChoices = [
    { id: 'yesno', name: 'Yes/No' },
    { id: 'slider', name: 'Slider' },
    { id: 'entry', name: 'Entry' },
];

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

export const QuestionCreate = props => {
    const classes = useStyles();
    return(
    <Create {...props}>
        <SimpleForm redirect="list">
            <NumberInput source="questionWeight" />
            <SelectInput source="type" choices={inputChoices} />
            <TextInput source="description" />
            <QuestionLabels className={classes.contents} source="labels" />
            <BooleanInput source="required" />
            <BooleanInput source="requiresAdditionalData" />
            <FormDataConsumer>
                {({formData, ...rest}) => formData.requiresAdditionalData &&
                    <SelectInput source="additionalDataType" choices={inputChoices} {...rest} />
                }
            </FormDataConsumer>
            <FormDataConsumer className={classes.contents}>
                {({formData, ...rest}) => formData.requiresAdditionalData &&
                    <QuestionLabels className={classes.contents} source="additionalDataLabels" {...rest} />
                }
            </FormDataConsumer>
            <BooleanInput source="disabled" />
        </SimpleForm>
    </Create>
)
}

export const QuestionEdit = props => {
    const classes = useStyles();
    return(
    <Edit {...props}>
        <SimpleForm redirect="list">
            <NumberInput source="questionWeight" />
            <SelectInput source="type" choices={inputChoices} />
            <TextInput source="description" />
            <QuestionLabels className={classes.contents} source="labels" />
            <BooleanInput source="required" />
            <BooleanInput source="requiresAdditionalData" />
            <FormDataConsumer>
                {({formData, ...rest}) => formData.requiresAdditionalData &&
                    <SelectInput source="additionalDataType" choices={inputChoices} {...rest} />
                }
            </FormDataConsumer>
            <FormDataConsumer className={classes.contents}>
                {({formData, ...rest}) => formData.requiresAdditionalData &&
                    <QuestionLabels className={classes.contents} source="additionalDataLabels" {...rest} />
                }
            </FormDataConsumer>
            <BooleanInput source="disabled" />
        </SimpleForm>
    </Edit>
)}

const QuestionLabels = ({source, ...rest}) => {
    const {values} = useFormState();
    const labels = values[source] ?? [];
    const classes = useStyles();
    return (
        <ArrayInput source={source} {...rest}>
            <SimpleFormIterator disableAdd={labels.length >= languageOptions.length}>
                <SelectInput label="Language"
                             source="language"
                             choices={languageOptions}
                             validate={required()}
                             defaultValue={getUnusedLanguage(labels.map(item => item ? item.language : null))}
                />
                <TextInput className={classes.contents} label="Label" source="label" />
            </SimpleFormIterator>
        </ArrayInput>
    )
}