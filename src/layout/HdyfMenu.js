import React, { createElement } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { makeStyles, useMediaQuery, Theme } from '@material-ui/core';
import DefaultIcon from '@material-ui/icons/ViewList';
import UserIcon from '@material-ui/icons/SupervisedUserCircle';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';
import inflection from 'inflection';
import { getResources, useTranslate, Translate, ReduxState } from 'ra-core';
import { DashboardMenuItem, MenuItemLink } from 'ra-ui-materialui';
import LabelIcon from '@material-ui/icons/Label';

const useStyles = makeStyles(
    {
        main: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
        },
    },
    { name: 'RaMenu' }
);

const translatedResourceName = (resource, translate) =>
    translate(`resources.${resource.name}.name`, {
        smart_count: 2,
        _:
            resource.options && resource.options.label
                ? translate(resource.options.label, {
                    smart_count: 2,
                    _: resource.options.label,
                })
                : inflection.humanize(inflection.pluralize(resource.name)),
    });

const Menu = (props) => {
    const {
        classes: classesOverride,
        className,
        dense,
        hasDashboard,
        onMenuClick,
        logout,
        ...rest
    } = props;
    const translate = useTranslate();
    const classes = useStyles(props);
    const isXSmall = useMediaQuery((theme) =>
        theme.breakpoints.down('xs')
    );
    const open = useSelector((state) => state.admin.ui.sidebarOpen);
    const resources = useSelector(getResources, shallowEqual);

    // Used to force redraw on navigation
    useSelector((state) => state.router.location.pathname);
    return (
        <div className={classnames(classes.main, className)} /*{...rest}*/>
            {hasDashboard && (
                <DashboardMenuItem
                    onClick={onMenuClick}
                    dense={dense}
                    sidebarIsOpen={open}
                />
            )}
            {resources
                .filter(r => r.hasList)
                .map(resource => (
                    <MenuItemLink
                        key={resource.name}
                        to={`/${resource.name}`}
                        primaryText={translatedResourceName(
                            resource,
                            translate
                        )}
                        leftIcon={
                            resource.icon ? <resource.icon /> : <DefaultIcon />
                        }
                        onClick={onMenuClick}
                        dense={dense}
                        sidebarIsOpen={open}
                    />
                ))}
            <MenuItemLink
                to="/invite-user"
                primaryText="Invite User"
                leftIcon={<UserIcon />}
                onClick={onMenuClick}
                sidebarIsOpen={open}
            />
            {isXSmall && logout}
        </div>
    );
};

export default withRouter(Menu);