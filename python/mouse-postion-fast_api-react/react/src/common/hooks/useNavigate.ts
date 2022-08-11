import axios from 'axios';
import React from 'react';
 
 
const  HocNavigate =  (  ) => {
 
 
  const fetch_model_by_id = React.useCallback(async ( ) => {
     // const body = {"options": [ "extended", 'threshold']}
     const body = {"options": [ "extended"]}


     const ans =  await axios.post(`http://0.0.0.0:60000/api/update`, body);
    return ans
  
   }, [ ]) 
 
  
 
 
 
  

  return {  fetch_model_by_id
  };
};
export default  HocNavigate