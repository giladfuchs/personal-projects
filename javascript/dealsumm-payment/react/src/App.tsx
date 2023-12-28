import React, {useEffect, useState} from 'react';
import Chart from "./components/Chart";
import {API} from "./common/api_axios";
import FormFilter from "./components/FormFilter";
import TotalAmount from "./components/TotalAmount";

import {ApiSeriesRes, Series} from "./common/types";
import {AxiosResponse} from "axios";
import {useApi} from "./common/ApiContext";
import {  Divider} from "@mui/material";
import Loading from "./components/Loading";

function App() {
    const {tenantsIdToName} = useApi();

    const [data, setData] = useState<ApiSeriesRes | undefined>(undefined);
    //
    const [loading, setLoading] = useState<boolean>(false);
    const fetchData = async (params = {}) => {
        setLoading(true)
        const response: AxiosResponse<ApiSeriesRes> = await API.get('get_series/', {params});

        const series = response.data.series.map((tenant: Series) => {
            return {
                ...tenant,
                name: tenantsIdToName[tenant.name],
            }
        })
        setData({...response.data, series});
        setLoading(false)

    };
    useEffect(() => {
        if (Object.keys(tenantsIdToName).length > 0)
            fetchData();
    }, [tenantsIdToName]);

    return (data ? <div className="App">
            <Divider sx={{my: 1}}/>
            <FormFilter sendForm={fetchData}/>
            <Divider sx={{my: 1}}/>

            {loading ?     <Loading/>: <><TotalAmount   {...data}/>
                <Chart {...data} /></>
            }
        </div> :
        <Loading/>)
        ;
}

export default App;
