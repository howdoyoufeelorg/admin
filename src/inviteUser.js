import React from 'react';
import { Edit, TextInput, SimpleForm, required, ReferenceInput, SelectInput } from 'react-admin';



const InviteUser = ({ staticContext, ...props }) => {
    return (
        <Edit
            id="invite_user"
            resource="invite_user"
            basePath="/invite-user"
            redirect={false} // I don't need any redirection here, there's no list page
            title="Invite User"
            {...props}
        >
            <SimpleForm>
                <ReferenceInput label="Area" source="area" reference="areas" validate={required()}>
                    <SelectInput optionText="label" />
                </ReferenceInput>
                <TextInput multiline source="emails" validate={required()} />
            </SimpleForm>
        </Edit>
    );
};

export default {
    edit: InviteUser
};