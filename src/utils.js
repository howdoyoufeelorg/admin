import { cloneElement } from 'react'

export const StringToLabelObject = ({ record, children, ...rest }) =>
    cloneElement(children, {
        record: { label: record },
        ...rest,
    })

export const StringArrayToObject = (props) => {
    const { data, children, ...rest } = props;
    Object.keys(data).map(item => data[item] = {label: data[item]});
    return cloneElement(children, {
        data,
        ...rest,
    })
}

export const isAdmin = (role = '') => {
    if(!role) {
        const roles = localStorage.getItem('roles');
        if(roles) {
            const rolesArray = roles.split(',');
            role = rolesArray[0];
        }
    }
    return (role === 'ROLE_SUPERADMIN' || role === 'ROLE_ADMIN');
}

export const isSuperadmin = (role = '') => {
    if(!role) {
        const roles = localStorage.getItem('roles');
        if(roles) {
            const rolesArray = roles.split(',');
            role = rolesArray[0];
        }
    }
    return (role === 'ROLE_SUPERADMIN');
}