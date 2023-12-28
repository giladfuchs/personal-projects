import React, {createContext, useContext, useState, useMemo, ReactNode} from 'react';
import {Tenant} from "./types";
import {API} from "./api_axios";
import {AxiosResponse} from "axios";

interface ApiContextProps {
    children: ReactNode;
}

interface ApiContextValue {
    tenants: Tenant[];
    tenantsIdToName: Record<string, string>;
}

const ApiContext = createContext<ApiContextValue | undefined>(undefined);

export const ApiProvider: React.FC<ApiContextProps> = ({children}) => {
    const [tenants, setTenants] = useState<Tenant[]>([]);
    const [tenantsIdToName, setTenantsIdToName] = useState<Record<string, string>>({});

    useMemo(async () => {
        const response: AxiosResponse<{ tenants: Tenant[] }> = await API.get('get_dataset/',);
        setTenants(response.data.tenants)
        const IdToName = Object.assign({}, ...response.data.tenants.map((tenant: Tenant) => {
            return {[`tenant_${tenant.id}`]: tenant.name}
        }))
        setTenantsIdToName(IdToName)
    }, []);

    return (
        <ApiContext.Provider value={{tenants, tenantsIdToName}}>
            {children}
        </ApiContext.Provider>
    );
};

export const useApi = (): ApiContextValue => {
    const context = useContext(ApiContext);
    if (!context) {
        throw new Error('useApi must be used within an ApiProvider');
    }
    return context;
};
