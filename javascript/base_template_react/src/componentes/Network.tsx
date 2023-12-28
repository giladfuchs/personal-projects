import React, { useState, useContext, useEffect} from "react";


import {
  Typography,
  Container,
   CssBaseline
} from "@material-ui/core";

import {  useStylesContainer } from "../services";
import { NavigationEnum, TableEnum } from "../store";
import Form from "../common/ui/forms/form";

const Network: React.FC = () => {
  const classes = useStylesContainer()

  return (
    <React.Fragment >
            <CssBaseline />
      <Container maxWidth="sm" className={classes.container}>
   
        <Typography component="div" />
                    <h4 className="card-title">NETWORKS</h4>
                  <Form 
                        navigate={NavigationEnum.NETWORKS_TABLE}
                        object_type={TableEnum.NETWORKS}
                        
                        />
       </Container>
    </React.Fragment>
  );
};


export default Network;

