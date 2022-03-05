import React, { useState } from 'react';



import classes from './layout.module.scss';
import Toolbar from './Navigation/Toolbar/Toolbar';
import SideDrawer from './Navigation/SideDrawer/SideDrawer';

interface Props {
  isLogin: boolean;
  isAdmin: boolean;
  isValidDomain: boolean;
}

const Layout: React.FC<Props> = props => {
  const [sideDrawerIsVisible, setSideDrawerIsVisible] = useState(false);

  const sideDrawerClosedHandler = () => {
    setSideDrawerIsVisible(false);
  };

  const sideDrawerToggleHandler = () => {
    setSideDrawerIsVisible(!sideDrawerIsVisible);
  };

  return (
    <React.Fragment>
      <Toolbar
        isLogin={props.isLogin} isAdmin={props.isAdmin} isValidDomain={props.isValidDomain}
        drawerToggleClicked={sideDrawerToggleHandler}
      />
      <SideDrawer
        isLogin={props.isLogin}
        isAdmin={props.isAdmin} isValidDomain={props.isValidDomain}
        open={sideDrawerIsVisible}
        closed={sideDrawerClosedHandler}
      />
      <main className={classes.Content}>{props.children}</main>
    </React.Fragment>
  );
};

export default Layout;

