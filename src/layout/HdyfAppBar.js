import React from 'react';
import { AppBar } from 'react-admin';
import { makeStyles } from '@material-ui/core';
import HdyfUserMenu from './HdyfUserMenu';

const useStyles = makeStyles({
    logoWrapper: {
        height: 46,
        flex: 1,
        textAlign: 'center'
    },
    logo: {
        height: '100%',
    }
});

const HdyfAppBar = props => {
    const classes = useStyles(props);
    return (<AppBar {...props} /*userMenu={<HdyfUserMenu />}*/ >
        <div className={classes.logoWrapper}>
            <img src={"/HDYF_Logo_3.png"} className={classes.logo}/>
        </div>
    </AppBar>)
};
export default HdyfAppBar;