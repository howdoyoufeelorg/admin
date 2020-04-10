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