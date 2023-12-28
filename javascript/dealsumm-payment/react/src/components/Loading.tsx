import {Box, CircularProgress} from "@mui/material";

function Loading() {
    return (<Box sx={{display: 'flex', justifyContent: 'center'}}>
        <CircularProgress size={50}/>
    </Box>)
        ;
}

export default Loading;
