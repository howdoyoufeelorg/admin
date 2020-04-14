import React from "react";
import {SelectInput, ReferenceArrayInput, SelectArrayInput, List, Datagrid, TextField, Show, SimpleShowLayout, Create, SimpleForm, Edit, NumberInput,
    BooleanInput, ArrayInput, SimpleFormIterator, required, ShowButton, EditButton, ReferenceField, FormDataConsumer, TextInput} from "react-admin";
import {languageOptions, getUnusedLanguage} from "../language"


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

export const QuestionCreate = props => (
    <Create {...props}>
        <SimpleForm redirect="list">
            <NumberInput source="questionWeight" />
            <SelectInput source="type" choices={inputChoices} />
            <TextInput source="description" />
            <ArrayInput source="labels">
                <SimpleFormIterator>
                    <SelectInput label="Language" source="language" choices={languageOptions} validate={required()} />
                    <TextInput label="Label" source="label" />
                </SimpleFormIterator>
            </ArrayInput>
            <BooleanInput source="required" />
            <BooleanInput source="requiresAdditionalData" />
            <FormDataConsumer>
                {({formData, ...rest}) => formData.requiresAdditionalData &&
                    <SelectInput source="additionalDataType" choices={inputChoices} {...rest} />
                }
            </FormDataConsumer>
            <FormDataConsumer>
                {({formData, ...rest}) => formData.requiresAdditionalData &&
                    <ArrayInput source="additionalDataLabels" {...rest}>
                        <SimpleFormIterator>
                            <SelectInput label="Language" source="language" choices={languageOptions}
                                         validate={required()}/>
                            <TextInput label="Label" source="label"/>
                        </SimpleFormIterator>
                    </ArrayInput>
                }
            </FormDataConsumer>
            <BooleanInput source="disabled" />
        </SimpleForm>
    </Create>
)

export const QuestionEdit = props => (
    <Edit {...props}>
        <SimpleForm redirect="list">
            <NumberInput source="questionWeight" />
            <SelectInput source="type" choices={inputChoices} />
            <TextInput source="description" />
            <FormDataConsumer>
                {({formData, ...rest}) =>
                    <ArrayInput source="labels" {...rest}>
                        <SimpleFormIterator disableAdd={formData.labels.length >= languageOptions.length}>
                            <SelectInput label="Language"
                                         source="language"
                                         choices={languageOptions}
                                         defaultValue={getUnusedLanguage(formData.labels.map(item => item ? item.language : null))}
                                         validate={required()}
                            />
                            <TextInput label="Label" source="label" />
                        </SimpleFormIterator>
                    </ArrayInput>
                }
            </FormDataConsumer>
            <BooleanInput source="required" />
            <BooleanInput source="requiresAdditionalData" />
            <FormDataConsumer>
                {({formData, ...rest}) => formData.requiresAdditionalData &&
                    <SelectInput source="additionalDataType" choices={inputChoices} {...rest} />
                }
            </FormDataConsumer>
            <FormDataConsumer>
                {({formData, ...rest}) => formData.requiresAdditionalData &&
                    <ArrayInput source="additionalDataLabels" {...rest}>
                        <SimpleFormIterator disableAdd={formData.additionalDataLabels.length >= languageOptions.length}>
                            <SelectInput label="Language"
                                         source="language"
                                         choices={languageOptions}
                                         defaultValue={getUnusedLanguage(formData.additionalDataLabels.map(item => item ? item.language : null))}
                                         validate={required()}/>
                            <TextInput label="Label" source="label"/>
                        </SimpleFormIterator>
                    </ArrayInput>
                }
            </FormDataConsumer>
            <BooleanInput source="disabled" />
        </SimpleForm>
    </Edit>
)