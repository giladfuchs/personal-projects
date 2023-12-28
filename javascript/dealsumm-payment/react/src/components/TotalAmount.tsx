import React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import {Grid} from "@mui/material";
import {usd_formatter} from "../common/utils";
import {Total} from "../common/types";
import {calculate_total} from "../common/helper";


const TotalAmount = ({start_date, end_date, series}: any) => {
    const totalAmounts: Total[] = calculate_total(series)
    return (
        <div>
            <Grid    container alignItems="center"
                     direction='column'  >

                <Typography variant="h4" component="div" color="lightseagreen">
                    Total Income by tenant
                </Typography>
                <Typography variant="h5" component="div" color="lightseagreen">
                    start date {start_date} end date {end_date}
                </Typography>

            </Grid>
            <Paper elevation={3} style={{
                backgroundColor: '#f2f2f2',
                display: 'flex',
                flexDirection: 'row',
                justifyContent:'center',
                padding: '16px',
                textAlign: 'center',
                margin: '16px 0'
            }}>


                {totalAmounts.map((tenant: any, index: number) => (
                    <Grid key={index} mr={6}>

                        <Typography variant="h5" component="div" color="green">
                            {tenant.name}
                        </Typography>
                        <Typography variant="h6" component="div" style={{marginTop: '8px'}}>
                            {usd_formatter.format(tenant.amount)}
                        </Typography>
                    </Grid>
                ))}
            </Paper>
        </div>
    );
};

export default TotalAmount;
