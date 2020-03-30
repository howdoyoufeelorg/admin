import ListGuesser from "@api-platform/admin/lib/ListGuesser";
import FieldGuesser from "@api-platform/admin/lib/FieldGuesser";
import React from "react";

export const UsersList = props => (
    <ListGuesser {...props}>
        <FieldGuesser source="email" />
        <FieldGuesser source="firstname" />
        <FieldGuesser source="lastname" />
    </ListGuesser>
);