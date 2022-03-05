import React from 'react';

import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.scss';
import Backdrop from './Backdrop/Backdrop';
import Logo from '../../logo';
interface Props {
    isLogin: boolean;
    isAdmin: boolean;
    open: boolean; isValidDomain: boolean;
    closed: () => void;
}

const sideDrawer: React.FC<Props> = (props) => {
    let attachedClasses = [classes.SideDrawer, classes.Close];
    if (props.open) {
        attachedClasses = [classes.SideDrawer, classes.Open];
    }
    return (
        <React.Fragment>
            <Backdrop show={props.open} clicked={props.closed} />
            <div className={attachedClasses.join(' ')} onClick={props.closed}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems isLogin={props.isLogin} isAdmin={props.isAdmin} isValidDomain={props.isValidDomain} />
                </nav>
            </div>
        </React.Fragment>
    );
};

export default sideDrawer;