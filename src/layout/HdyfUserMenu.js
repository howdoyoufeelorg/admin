import React, { Component } from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import { crudGetOne, UserMenu, MenuItemLink } from 'react-admin';
import SettingsIcon from '@material-ui/icons/Settings';

class HdyfUserMenuView extends Component {
    componentDidMount() {
        this.fetchProfile();
    }

    fetchProfile = () => {
        this.props.crudGetOne(
            // The resource
            'users',
            // The id of the resource item to fetch
            1,
            // The base path. Mainly used on failure to fetch the data
            '/invite-user',
            // Whether to refresh the current view. I don't need it here
            true
        );
    };

    render() {
        const { crudGetOne, profile, ...props } = this.props;

        return (
            <UserMenu label={profile ? profile.nickname : 'crappy'} {...props}>
                <MenuItemLink
                    to="/invite-user"
                    primaryText="Invite User"
                    leftIcon={<SettingsIcon />}
                />
            </UserMenu>
        );
    }
}

const mapStateToProps = state => {
    const resource = 'profile';
    const id = 'my-profile';
    const profileState = state.admin.resources[resource];

    return {
        profile: profileState ? profileState.data[id] : null
    };
};

const HdyfUserMenu = connect(
    mapStateToProps,
    { crudGetOne }
)(HdyfUserMenuView);
export default HdyfUserMenu;