import React, {  useEffect } from "react";


import {
  Route,
  Routes,BrowserRouter
} from "react-router-dom";


// import "./App.css";

import { useTypedSelector, useActions, NavigationEnum } from "./store";
import { SnackbarProvider } from 'notistack';
import ContextAccount from "./ThemeContext";
import ResponsiveAppBar from './common/ui/navbar/NavBar';



const Auth = React.lazy(() => {
  return import("./containers/Auth");
});

const AccountUserTable = React.lazy(() => {
  return import("./containers/AccountUser");
});

const AccountTable = React.lazy(() => {
  return import("./containers/Account");
});

const DeviceTable = React.lazy(() => {
  return import("./containers/Device");
});

const NetworkTable = React.lazy(() => {
  return import("./containers/Network");
});

const AccountUser = React.lazy(() => {
  return import("./componentes/AccountUser");
});


const Account = React.lazy(() => {
  return import("./componentes/Account");
});


const Device = React.lazy(() => {
  return import("./componentes/Device");
});

const Network = React.lazy(() => {
  return import("./componentes/Network");
});


const Chart = React.lazy(() => {
  return import("./common/ui/chart/chart");
});




type Props = any
const App: React.FC<Props> = (props) => {

  const isTokenSet = useTypedSelector((state) => state.reducer.isTokenSet)
  const [account, setAccount] = React.useState({})
  const [routes, setRoutes] = React.useState( <Routes><Route path="/auth" element={ <Auth />} />
  <Route path="/" element={ <Auth />} /></Routes>)
  const { loginCheck } = useActions();
  useEffect(() => {
    if(isTokenSet)
    setRoutes( <Routes>
      <Route path={NavigationEnum.ACCOUNT_USERS_TABLE} element={ <AccountUserTable />} />
      <Route path={NavigationEnum.ACCOUNTS_TABLE} element={ <AccountTable />} />
      <Route path={NavigationEnum.DEVICES_TABLE} element={ <DeviceTable />} />
      <Route path={NavigationEnum.NETWORKS_TABLE} element={ <NetworkTable />} />
      {  ['/:id', '' ].map(path => (
    <Route  path={`${NavigationEnum.ACCOUNTS_FORM}${path}`} element={<Account />} />
  ))}
      {  ['/:id', '' ].map(path => (
    <Route  path={`${NavigationEnum.ACCOUNT_USERS_FORM}${path}`} element={<AccountUser />} />
  ))}
      {  ['/:id', '' ].map(path => (
    <Route  path={`${NavigationEnum.DEVICES_FORM}${path}`} element={<Device />} />
  ))}
      {  ['/:id', '' ].map(path => (
    <Route  path={`${NavigationEnum.NETWORKS_FORM}${path}`} element={<Network />} />
  ))}
      <Route path="/chart" element={<Chart />} /> 
      <Route path="/" element={ <Chart />} />
   
   </Routes>)
    else{
    setRoutes(  <Routes><Route path="/auth" element={ <Auth />} />
    <Route path="/" element={ <Auth />} /></Routes>
    )
    loginCheck();
  }
  },[isTokenSet]);

 

const DevicesContextValue = React.useMemo(() => ({ account, setAccount}), [account]);
  return (
    <div  style={{ height:'100%', 
    
    background: 'linear-gradient(45deg, #fdf5e6 30%, #6495ed 90%)',
    
    }}>

    <SnackbarProvider   maxSnack={17}>

  <ContextAccount.Provider value={DevicesContextValue}>
    <BrowserRouter>
      <ResponsiveAppBar />
      {routes}
    </BrowserRouter>
        </ContextAccount.Provider>
     </SnackbarProvider>
     </div>

  );
};


export default App
