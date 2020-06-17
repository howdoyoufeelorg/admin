import React, {useEffect, useState} from 'react';
import {useDataProvider} from "react-admin";
import Typography from '@material-ui/core/Typography';

export const EffectiveGeolocationField = ({ className, record = {} }) => {
    const dataProvider = useDataProvider();
    const [effectiveGeolocation, setEffectiveGeolocation] = useState();
    useEffect(() => {
        if(record.zipcode) {
            setEffectiveGeolocation('Only for ' + record.zipcode + ' zipcode');
        } else {
            if(record.area) {
                dataProvider.getOne('areas', {id: record.area})
                    .then(({data: {name}}) => {
                        setEffectiveGeolocation('Only for ' + name + ' area');
                    })
            } else {
                if(record.state) {
                    dataProvider.getOne('states', {id: record.state})
                        .then(({data: {name}}) => {
                            setEffectiveGeolocation('For the whole State of ' + name);
                        })
                } else {
                    if(record.country) {
                        dataProvider.getOne('countries', {id: record.country})
                            .then(({data: {name}}) => {
                                setEffectiveGeolocation('For the whole Country of ' + name);
                            })
                    }
                }
            }
        }
    }, [record])
    return <Typography
        component="span"
        variant="body2"
        className={className}
    >
        {effectiveGeolocation}
    </Typography>
}