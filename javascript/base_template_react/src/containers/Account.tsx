import React from "react";

import {DataGridTable} from "../common/ui/table/DataGridTable";
import { Container, CssBaseline } from "@material-ui/core";
import { NavigationEnum, TableEnum } from "../store";

import {  GridColDef } from "@mui/x-data-grid";

import {  useStylesContainer } from "../services";


const fields : GridColDef[]=      [ { field: 'name', headerName: 'Name', align: "center", width: 200, headerAlign: 'center', },
{ field: 'type', headerName: 'Type', align: "center", width: 200, headerAlign: 'center', },
{ field: 'asns', headerName: 'ASNS', align: "center", width: 150, headerAlign: 'center', },
]

const Account: React.FC = () => {
  const classes = useStylesContainer();

  

  return (
    <React.Fragment>
      <CssBaseline />

      <Container maxWidth="xl" className={classes.container_table_root}>
        <DataGridTable fields={fields}  add_navigate={NavigationEnum.ACCOUNTS_FORM} update_navigate={NavigationEnum.ACCOUNTS_FORM} model_name={TableEnum.ACCOUNTS} />

      </Container>
    </React.Fragment>
  );
};

export default Account