
import {
    Button,
    Container, Box
  } from "@mui/material";
  import React, { useEffect } from "react";
  import { DataGrid, GridColDef } from "@mui/x-data-grid";
  import {   useStylesContainer } from "../../../services";

  import { useNavigate } from 'react-router-dom';
import { useTypedSelector, TableEnum, useActions, NavigationEnum } from "../../../store";
interface StateProps {
  fields: GridColDef[];
  update_navigate:NavigationEnum;
  add_navigate:NavigationEnum;
  model_name:TableEnum;
}
  export const DataGridTable : React.FC<StateProps>= (props) => {
    const tableData = useTypedSelector((state) => state.reducer[props.model_name])
    const [rows, setRows] = React.useState<any[]>(tableData);
    const classes = useStylesContainer();
   const navigate = useNavigate();
   const { delete_form } = useActions();

   
   useEffect(() => {
     setRows(tableData)
     
    }, [tableData])

  


    const columns: GridColDef[] = [
      {
        field: "id",
        headerName: "Update",
        sortable: false,
        width: 100,
        align: "center",
        headerAlign: 'center',
        renderCell: (params) => {
  
          const updateAccount = async (e: React.MouseEvent) => {
            
            e.stopPropagation(); 
          navigate(`${props.update_navigate}/${params.id}`)
          }
            
            return <Button
              variant="outlined"
              onClick={updateAccount}
            >
              Update
            </Button>
         
        },
      },
      {
        field: "delete",
        headerName: "Delete",
        sortable: false,
        width: 100,
        align: "center",
        headerAlign: 'center',
        renderCell: (params) => {
  
          const delete_id = async (e: React.MouseEvent) => {
            delete_form(props.update_navigate, params.id as string)
            e.stopPropagation(); 
          }
            
            return <Button
              variant="outlined"
              color="warning"

              onClick={delete_id}
            >
              Delete
            </Button>
         
        },
      },
      ...props.fields
     ]
  
     const button_add =  <Button
     variant="contained"
 
       onClick={()=> navigate(props.add_navigate)}
          >
       ADD
     </Button>

    return (
      <Container className={classes.container}>
      <Box 
      
  className={classes.box_button_add_table}
      
      >
        {button_add}
</Box>

          <DataGrid rows={rows} columns={columns} className={classes.table}  />

</Container>

    );
  };
  