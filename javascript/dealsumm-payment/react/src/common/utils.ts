import {FormType} from "./types";

export const usd_formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD', // You can change the currency as needed
    minimumFractionDigits: 2,
});

export const onChangeForm = (identifier: string, value: string | number[], form: FormType, setForm: React.Dispatch<React.SetStateAction<FormType>>) => {
    setForm({...form, [identifier]: value})
}