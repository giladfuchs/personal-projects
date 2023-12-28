






import React from "react";
import { TextField , MenuItem, Checkbox} from "@mui/material";

import { makeStyles } from "@material-ui/core/styles";

import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { FieldsType, DropListEnum } from "../../types";

const useStyles = makeStyles((theme) => ({
  textField: {
      width: '42%',
      padding:'.2rem',
      margin:'.92rem',
      fontWeight: 500,
      '&:hover': {
        backgroundColor: 'primary.main',
        opacity: [0.9, 0.8, 0.7],
      },
  },
  input_label: {
      color: 'black', margin:'auto', padding:'auto',
      fontFamily: "Times New Roman", fontSize: 16,  textAlign: 'center',
  }, 
  input: {
    textAlign: "center",
    // height:'14rem',
    margin:'.61rem',
    padding:'.31rem'
  
  }
}));
interface DropListOption {
  label: string;
}
interface OwnProps {
  id?: string;
  label: string;
  type?: string;
  autoComplete?: string;
  error?: boolean;
  helperText?: string;
  value?: string;
  onChange?: (e: any) => void;
  type_selects?: string[];
  checked?:boolean;
  touched?:boolean;

}
const Input: React.FC<FieldsType & OwnProps> = (props) => {
  const classes = useStyles();
  
    
  if (props.type_selects){
   let width = '40%'
    
    if (DropListEnum.ROLE === props.id)
        width = '100%'
  return       <FormControl variant="standard" sx={{ m: 1, width: width,height:'4rem',paddingTop:'1rem', left:'20%' }}>
  <InputLabel  id="fullWidth" className={classes.input} >
  {props.label}</InputLabel>
    
  <Select  {...props} sx={{ m: 1, width:'50%',margin:'8rem 0',  textAlign:'center'}}
    labelId="demo-simple-select-standard-label"
    id="demo-simple-select-standard"
    onChange={props.onChange}
  >
  {props.type_selects && props.type_selects.map((option:string) => (
    <MenuItem key={option} sx={{
    textAlign: "center",
    }} value={option}>
      {option}
    </MenuItem>
  ))}
  </Select>
</FormControl>
}
    
//need to add type back
  else if(props.checked !== undefined){
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    
    return    <FormControl variant="standard" sx={{ m: 1, width: '40%' ,height:'4rem',paddingTop:'1rem', left:'20%' }}>

    <InputLabel  id="fullWidth" className={classes.input} >
    {props.label}</InputLabel><Checkbox 
    
    
    {...label} {...props} 
    
    // sx={{width:'30%'}} 
    
    
    />
    </FormControl>
}
  return <TextField {...props}  variant="outlined"    margin="normal"
  className={classes.textField}

  InputProps={{
      className: classes.input_label,
  }} />;
};

export default Input;
