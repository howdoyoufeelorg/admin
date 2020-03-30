import React from 'react';
import { Layout } from 'react-admin';
import HdyfAppBar from './HdyfAppBar';
import HdyfMenu from './HdyfMenu';

const HdyfLayout = props => <Layout {...props} appBar={HdyfAppBar} menu={HdyfMenu} />;

export default HdyfLayout;