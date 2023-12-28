export type Total = {
    name: string
    amount: number
}

export type Series = {
    data: number[]
    name: string

}
export type Tenant = {
    id: number;
    name: string;
    rentable_area: number;
    property_name: string;
    project_name: string;
};

export interface ApiSeriesRes {
    start_date: string,
    end_date: string,
    series: Series[]
}

export type FormType = Record<string, string | number[]>
