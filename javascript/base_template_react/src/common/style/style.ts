import { makeStyles } from "@material-ui/core/styles";

export const useStylesContainer = makeStyles((theme) => ({
    root: {
      alignItems: "center",
      justifyContent: "center",
      display: "flex",
      flexDirection: "column",
      margin: theme.spacing(4, 4, 4),
  
      "& .MuiTextField-root": {
        width: "25ch",
        margin: theme.spacing(2, 2, 2, 2),
      },
    },
    container: {
      alignItems: "center",
      margin: "0 auto",
      display: "flex",
      zIndex:12,
      justifyContent: "center",
      // backgroundColor: 'red',
      background: 'linear-gradient(45deg, #fdf5e6 30%, #6495ed 90%)',

      flexDirection: "column",
      height: "95%",
      width:'60rem'
    },
    media: {
      height: 340,
      width: "100%",
    },
    table: {
      margin: "auto",
      background: 'linear-gradient(45deg, #fdf5e6 30%, #6495ed 90%)',

      marginTop:'22px',
      width: "67rem",
      [theme.breakpoints.down('sm')]: {
        width: "27rem",
      },
      [theme.breakpoints.down('xs')]: {
        width: "99%",
      },
      height: "93%",
      fontSize: "18px",
    },
    container_table_root: {
      alignItems: "center",
      margin: "auto",
      marginBottom: "2rem",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      background: 'linear-gradient(45deg, #00ced1 30%, #d8bfd8 90%)',

      height: "50rem",
      width: "100%",
    },
    box_button_add_table: {
      alignItems: "center",
      marginTop: ".51rem",
      justifyContent: "center",
      textAlign:'center'
    },

  }));
  

