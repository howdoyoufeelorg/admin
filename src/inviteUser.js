import React from 'react';
import { Edit, TextInput, SimpleForm, ReferenceInput, SelectInput } from 'react-admin';

const validateArea = (values) => {
    const errors = {};
    if (!values.area && !values.state && !values.country ) {
        errors.area = ['You must select Area or State!'];
    }
    if (!values.emails) {
        errors.emails = ['You must supply a list of emails to invite!']
    }
    return errors;
};

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
            <SimpleForm validate={validateArea}>
                <ReferenceInput label="Area" source="area" reference="areas" allowEmpty>
                    <SelectInput optionText="name" />
                </ReferenceInput>
                <ReferenceInput label="State" source="state" reference="states" allowEmpty>
                    <SelectInput optionText="name" />
                </ReferenceInput>
                {/*<ReferenceInput label="Country" source="country" reference="countries" allowEmpty>
                    <SelectInput optionText="name" />
                </ReferenceInput>*/}
                <TextInput multiline source="emails" />
            </SimpleForm>
        </Edit>
    );
};

export default {
    edit: InviteUser
};