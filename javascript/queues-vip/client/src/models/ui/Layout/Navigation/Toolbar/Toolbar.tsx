import React from 'react';

import classes from './Toolbar.module.scss';
// import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
import Logo from '../../logo';
interface Props {
    isLogin: boolean;
    isAdmin: boolean; isValidDomain: boolean;
    drawerToggleClicked: () => void;
}
const Toolbar: React.FC<Props> = (props) => (
    <header className={classes.Toolbar}>
        <DrawerToggle clicked={props.drawerToggleClicked} />
        <div className={classes.Logo}>
            <Logo />
        </div>
        <nav className={classes.DesktopOnly}>
            <NavigationItems isLogin={props.isLogin} isAdmin={props.isAdmin} isValidDomain={props.isValidDomain} />
        </nav>
    </header>
);

export default Toolbar;