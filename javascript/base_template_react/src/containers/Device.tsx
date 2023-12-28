import React from "react";

import {DataGridTable} from "../common/ui/table/DataGridTable";
import { Container, CssBaseline } from "@material-ui/core";
import { NavigationEnum, TableEnum } from "../store";

import {  GridColDef } from "@mui/x-data-grid";

import {  useStylesContainer } from "../services";


const fields : GridColDef[]=      [ 
  { field: 'name', headerName: 'Name', align: "center", width: 200, headerAlign: 'center', },
  { field: 'moderated', headerName: 'APPLY_OPTION', align: "center", width: 200, headerAlign: 'center', },
]

const Device: React.FC = () => {
  const classes = useStylesContainer();

  

  return (
    <React.Fragment>
      <CssBaseline />

      <Container maxWidth="xl" className={classes.container_table_root}>
        <DataGridTable fields={fields}  add_navigate={NavigationEnum.DEVICES_FORM} update_navigate={NavigationEnum.DEVICES_FORM} model_name={TableEnum.DEVICES} />

      </Container>
    </React.Fragment>
  );
};

export default Device