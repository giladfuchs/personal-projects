import ReactApexChart from 'react-apexcharts';
import {usd_formatter} from "../common/utils";

import {
    calculate_percentages_for_series,
    get_months_between_dates,
} from "../common/helper";
import {ApiSeriesRes, Series} from "../common/types";
import {Grid, Switch} from "@mui/material";
import React, {  useState} from "react";
import Typography from "@mui/material/Typography";
//

const base_chart: ApexCharts.ApexOptions = {

    chart: {
        id: "basic-bar"
    },
    xaxis: {
        categories: []
    },
    yaxis: {
        labels: {
            formatter: function (value: number) {
                return value.toFixed(0)
            }
        }
    },
    legend: {
        show: true,
    },
    tooltip: {
        y: {
            formatter(val: number) {

                return val > 100 || val === 0 ? usd_formatter.format(val) : `${val?val.toFixed(2):0}%`
            }
        }
    }

}

function Chart({start_date, end_date, series}: ApiSeriesRes) {

    const [showPercentages, setShowPercentages] = useState<boolean>(false);
    const [percentages] = useState<Series[]>(calculate_percentages_for_series(series));

    const [optionsChart ] = useState<ApexCharts.ApexOptions>({...base_chart, xaxis: {categories: get_months_between_dates(start_date, end_date)}});


    return (
        <div id="chart">
            <Grid container justifyContent="center">
                <Typography mt={1} variant="h3" component="div" color="lightsteelblue">
                    Chart by {showPercentages ? 'Percentages' : 'Money'}
                </Typography>
                <Typography ml={4} variant="h6" component="div" color="lightsteelblue">
                    See relative payment
                </Typography>
                <Switch
                    checked={showPercentages}
                    onChange={() => setShowPercentages(!showPercentages)}
                    inputProps={{'aria-label': 'controlled'}}
                />

            </Grid>
            <ReactApexChart
                options={optionsChart}
                series={showPercentages ? percentages : series} type="line" height={350}/>
        </div>
    );
}

export default Chart