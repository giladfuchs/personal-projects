import React from "react";
import {DataGridTable} from "../common/ui/table/DataGridTable";
import { Container, CssBaseline } from "@material-ui/core";
import { NavigationEnum, TableEnum } from "../store";

import {  GridColDef } from "@mui/x-data-grid";
import {  useStylesContainer } from "../services";




const fields : GridColDef[]=      [ { field: 'name', headerName: 'Name', align: "center", width: 200, headerAlign: 'center', },
{ field: 'role', headerName: 'Role', align: "center", width: 200, headerAlign: 'center', },
{ field: 'username', headerName: 'Username', align: "center", width: 150, headerAlign: 'center', },
{ field: 'phone', headerName: 'Phone', align: "center", width: 150, headerAlign: 'center', },
{ field: 'email', headerName: 'Email', align: "center", width: 190, headerAlign: 'center', },]

const AccountUser: React.FC = () => {
  const classes = useStylesContainer();




  return (
    <React.Fragment>
      <CssBaseline />

      <Container maxWidth="xl" className={classes.container_table_root}>
        <DataGridTable fields={fields} add_navigate={NavigationEnum.ACCOUNT_USERS_FORM} update_navigate={NavigationEnum.ACCOUNT_USERS_FORM}  model_name={TableEnum.ACCOUNTS_USERS} />

      </Container>
    </React.Fragment>
  );
};

export default AccountUser