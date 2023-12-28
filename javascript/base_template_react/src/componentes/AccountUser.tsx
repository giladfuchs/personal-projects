import React from "react";
import {
  Typography,
  Container,
   CssBaseline
} from "@material-ui/core";

import {  useStylesContainer } from "../services";
import { useActions, NavigationEnum, TableEnum } from "../store";
import Form from "../common/ui/forms/form";


const AccountUser: React.FC = () => {
  const  classes = useStylesContainer();



  return (
    <React.Fragment >
            <CssBaseline />
      <Container maxWidth="sm" className={classes.container}>
        <Typography component="div" />
                    <h4 className="card-title">Account User</h4>
                    <Form key={213} 
                        navigate={NavigationEnum.ACCOUNT_USERS_TABLE}
                        object_type={TableEnum.ACCOUNTS_USERS}
                        
                        />
    </Container>


    </React.Fragment>
  );
};


export default AccountUser;

