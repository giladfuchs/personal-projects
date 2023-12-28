import React, { useState, useContext, useEffect} from "react";


import {
  Typography,
  Container,
   CssBaseline
} from "@material-ui/core";

import {  useStylesContainer } from "../services";
import { NavigationEnum, TableEnum } from "../store";
import Form from "../common/ui/forms/form";

const Device: React.FC = () => {
  const classes = useStylesContainer()

  return (
    <React.Fragment >
            <CssBaseline />
      <Container maxWidth="sm" className={classes.container}>
   
        <Typography component="div" />
                    <h4 className="card-title">DEVICES</h4>
                  <Form 
                        navigate={NavigationEnum.DEVICES_TABLE}
                        object_type={TableEnum.DEVICES}
                        
                        />
       </Container>
    </React.Fragment>
  );
};


export default Device;

