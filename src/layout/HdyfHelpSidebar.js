import React, {
    Component,
    createElement,
    useEffect,
    useRef,
    useState,
} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {helpContents} from "../helpContents"
import {Card, Paper} from "@material-ui/core";

const styles = theme =>
    ({
        helpSidebar: {
            padding: [[0, 0, 0, 24]],
            flexShrink: 1,
            flexBasis: '20%'
        },
        helpToolbar: {
            display: "flex",
            minHeight: 40,
            paddingTop: 24,
            paddingBottom: 8
        },
        helpSidebarTitle: {
            marginTop: 6,
            fontWeight: 800,
        },
        helpEntry: {
            margin: 10,
            padding: 10,
            border: 'thin solid rgba(0,0,0,0.1)',
            borderRadius: 4
        },
        helpEntryTitle: {
            fontWeight: 800,
            marginBottom: 5
        },
        helpEntryContent: {

        }
    });

const useStyles = makeStyles(styles);

const HdyfHelpSidebar = ({helpSection}) => {
    const classes = useStyles();
    const currentHelpNeeded = helpContents[helpSection];
    return (
        <div className={classes.helpSidebar}>
            <div className={classes.helpToolbar}>
                <span className={classes.helpSidebarTitle}>USAGE INSTRUCTIONS</span>
            </div>
            <Card elevation={1}>
                {
                    Object.keys(currentHelpNeeded).map((key, index) =>
                        <div className={classes.helpEntry} key={index}>
                            <div className={classes.helpEntryTitle}>{currentHelpNeeded[key].title}</div>
                            <div className={classes.helpEntryContent} dangerouslySetInnerHTML={{ __html: currentHelpNeeded[key].content}} />
                        </div>
                    )
                }
            </Card>
        </div>
    )
}

export default HdyfHelpSidebar;