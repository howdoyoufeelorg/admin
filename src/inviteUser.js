import React from 'react';
import { Edit, TextInput, SimpleForm, ReferenceInput, SelectInput, Toolbar, SaveButton } from 'react-admin';

const validateArea = (values) => {
    const errors = {};
    if (!values.area && !values.state && !values.country ) {
        errors.area = ['hdyf.validation.select_area_or_state'];
    }
    if (!values.emails) {
        errors.emails = ['hdyf.validation.invite_user_missing_email']
    }
    return errors;
};

const InviteUserToolbar = props => (
    <Toolbar {...props} >
        <SaveButton
            label="SEND INVITES"
            redirect="/"
            submitOnEnter={true}
        />
    </Toolbar>
)

const InviteUser = ({ staticContext, ...props }) => {

    return (
        <Edit
            id="invite_user"
            resource="invite_user"
            basePath="/invite-user"
            redirect={false} // I don't need any redirection here, there's no list page
            title="Invite User"
            undoable={false}
            successMessage="Invites sent"
            {...props}
        >
            <SimpleForm validate={validateArea} toolbar={<InviteUserToolbar />}>
                <ReferenceInput label="Area" source="area" reference="areas" allowEmpty sort={{ field: 'name', order: 'ASC' }}>
                    <SelectInput optionText="name" />
                </ReferenceInput>
                <ReferenceInput label="State" source="state" reference="states" allowEmpty sort={{ field: 'name', order: 'ASC' }}>
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