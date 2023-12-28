import React from "react";

import {DataGridTable} from "../common/ui/table/DataGridTable";
import { Container, CssBaseline } from "@material-ui/core";
import { NavigationEnum, TableEnum } from "../store";

import {  GridColDef } from "@mui/x-data-grid";

import {  useStylesContainer } from "../services";


const fields : GridColDef[]=      [ 
  { field: 'ip', headerName: 'IP', align: "center", width: 200, headerAlign: 'center', },
  { field: 'mask', headerName: 'MASK', align: "center", width: 200, headerAlign: 'center', },
  { field: 'rate_limit', headerName: 'rate_limit', align: "center", width: 200, headerAlign: 'center', },
  { field: 'holistic', headerName: 'holistic', align: "center", width: 200, headerAlign: 'center', },
]

const Network: React.FC = () => {
  const classes = useStylesContainer();

  

  return (
    <React.Fragment>
      <CssBaseline />

      <Container maxWidth="xl" className={classes.container_table_root}>
        <DataGridTable fields={fields}  add_navigate={NavigationEnum.NETWORKS_FORM} update_navigate={NavigationEnum.NETWORKS_FORM} model_name={TableEnum.NETWORKS} />

      </Container>
    </React.Fragment>
  );
};

export default Network