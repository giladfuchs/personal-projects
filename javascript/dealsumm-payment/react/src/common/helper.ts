import {Series, Tenant} from "./types";

export const calculate_total = (series: Series[]) => series.map((tenant: any) => {
    return {
        name: tenant.name,
        amount: tenant.data.reduce((accumulator: number, currentValue: number) => accumulator + currentValue, 0)

    }
})

export const calculate_percentages_for_series = (series: Series[]) => {
    if(series.length ===0)
        return []
    const sums = Array.from(Array(series[0].data.length).keys()).map((index) =>
        series.reduce((acc: number, points: any) => acc + points.data[index], 0)
    )
    const percentages: Series[] = series.map((store: Series) => ({
        name: store.name,
        data: store.data.map((point: number, index: number) => (point / sums[index]) * 100)
    }));
    return percentages
}

export const get_months_between_dates = (start: string, end: string) => {
    const startMonth = new Date(start);
    const endMonth = new Date(end);

    const months = [];
    let currentMonth = startMonth;

    while (currentMonth <= endMonth) {
        const year = currentMonth.getFullYear();
        const month = (currentMonth.getMonth() + 1).toString().padStart(2, '0');
        months.push(`${year}-${month}`);
        currentMonth.setMonth(currentMonth.getMonth() + 1);
    }

    return months;
}


export function aggregateValuesByKey(arr: Tenant[], keys: (keyof Tenant)[]): Record<string | number, string[]> {
    return arr.reduce((acc, tenant) => {
        keys.forEach(key => {
            const keyValue = tenant[key];

            // @ts-ignore
            acc[key] = acc[key]
                ? Array.from(new Set([...acc[key], keyValue]))
                : [keyValue];
        });

        return acc;
    }, {} as Record<string | number, string[]>);
}

export const tenants_to_string_ids_with_separator = (tenants: Tenant[], separator = ',') => tenants.map((tenant: Tenant) => tenant.id).join(separator)