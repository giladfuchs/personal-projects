import React, {useEffect, useMemo, useState} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {Autocomplete, FormControl, Grid, InputLabel, MenuItem, Select} from "@mui/material";
import Typography from "@mui/material/Typography";
import {useApi} from "../common/ApiContext";
import {FormType, Tenant} from "../common/types";
import {onChangeForm} from "../common/utils";
import {aggregateValuesByKey, tenants_to_string_ids_with_separator} from "../common/helper";


function FormFilter({sendForm}: any) {
    const {tenants} = useApi();
    const [tenantsToShow, setTenantsToShow] = useState<Tenant[]>(tenants);
    const [formTouch, setFormTouch] = useState<boolean>(false);

    const [form, setForm] = useState<FormType>({
        project_name: '',
        property_name: '',
        startDate: '',
        endDate: '',
        tenantsIds: tenants_to_string_ids_with_separator(tenantsToShow)
    });

    const form_change = (identifier: string, value: string | number[]) => {
        setFormTouch(true)

        onChangeForm(identifier, value, form, setForm)
    }
    useEffect(() => {
        const filter_tenants = tenants.filter((tenant: Tenant) => {
            return (form.project_name === '' || form.project_name === tenant.project_name) && (form.property_name === '' || form.property_name === tenant.property_name)
        })
        setTenantsToShow(filter_tenants)

    }, [form.project_name, form.property_name]);
    useEffect(() => {
        setForm({
            ...form,
            tenantsIds: tenants_to_string_ids_with_separator(tenantsToShow)
        })
    }, [tenantsToShow]);
    const aggregateData: Record<string | number, string[]> = aggregateValuesByKey(tenantsToShow, ['project_name', 'property_name',]);

    return (
        <Grid container direction='row' m={2}>
            <Grid container justifyContent="center" direction="row"
                  m={2}>
                <Typography mt={1} variant="h4" component="div" color="lightsteelblue">
                    Filter Data
                </Typography>
                {Object.keys(aggregateData).map((key: string, index: number) => {
                    return < FormControl sx={{minWidth: 222, mr: 4}} key={index}>
                        <InputLabel id="demo-simple-select-label">{key}</InputLabel>
                        <Select
                            label={key}
                            value={form[key]}
                            onChange={e => form_change(key, e.target.value)}
                        >
                            <MenuItem value="">
                                <em>all</em>
                            </MenuItem>
                            {
                                aggregateData[key].map((name: string) => {
                                    return <MenuItem value={name} key={name}>{name}</MenuItem>
                                })}
                        </Select>
                    </FormControl>
                })}
            </Grid>
            <Grid container justifyContent="center" direction="row"
                  m={2}>
                <TextField
                    sx={{margin: 1}}
                    label="Start Date"
                    type="date"
                    value={form.startDate}
                    onChange={e => form_change('startDate', e.target.value)}

                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    sx={{margin: 1}}
                    label="End Date"
                    type="date"
                    value={form.endDate}
                    onChange={e => form_change('endDate', e.target.value)}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <Autocomplete
                    multiple
                    id="multiple"
                    onChange={(e: any, values: Tenant[]) => {
                        form_change('tenantsIds', tenants_to_string_ids_with_separator(values));
                    }}
                    value={tenantsToShow.filter((tenant: Tenant) => (form.tenantsIds as string).split(',').includes(tenant.id.toString())) || null}
                    options={tenantsToShow}
                    getOptionLabel={(option) => option.name}
                    defaultValue={tenantsToShow}
                    renderInput={(params) => (
                        <TextField {...params} label="teants" placeholder="Teants"/>
                    )}
                    sx={{width: '500px'}}
                />
                <Button variant="contained" color="primary" disabled={!formTouch} onClick={() => {
                    setFormTouch(false)
                    sendForm(form)
                }}>
                    Filter
                </Button>


            </Grid>
        </Grid>
    );
};

export default FormFilter;
