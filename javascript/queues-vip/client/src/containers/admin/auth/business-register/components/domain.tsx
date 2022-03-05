import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import classes from "./employee-registration.module.scss";
import * as language from '../../../../../assets/language/language'
import { Button, AuthenticationHeadrer, Inputs } from '../../../../../models/ui';
import { getLoading, getError, getDomains } from '../../../../../store/selectors';
import { getAllDomains } from '../../../../../store';
import { domain } from '../../../../../models/ui/input/utility/input-types.input';
import { incrementent } from '../../../../../store/general/action/index.actions';
import { Form } from '../../../../../models/system/input.field';




interface StateProps {
    loading: boolean;
    error: string;
    domains: [string]
}

interface DispatchProps {
    getAllDomains: typeof getAllDomains;
    incrementent: typeof incrementent
}



type Props = DispatchProps & StateProps;
const Domain: React.FC<Props> = (props) => {

    const [form, setForm] = useState<Form>({
        domain: {
            ...domain,
            validation: {
                required: true,
                minLen: 2,
                isEnglish: true
            }
        }
    });
    console.log(form);

    const [error, setError] = useState<string>();

    useEffect(() => {
        props.getAllDomains()
    }, []);

    useEffect(() => {
        if (error === "" && !props.domains.every((d) => d !== form.domain.value))
            setError(language.domainError[1])
    }, [form]);


    const onClickNext = () => {
        if (error !== '') return;
        let ansForm = Object.assign(
            {},
            ...Object.keys(form).map((k) => ({ [k]: form[k].value }))
        );

        localStorage.setItem("domain", ansForm.domain)

        props.incrementent();



    };


    return (
        <React.Fragment>
            <AuthenticationHeadrer title={language.addServiceHeaderTitle[1]} subTitle={language.domainHeaderSubTitle[1]}
                error={error ? error : props.error} />

            <div className={classes.BodyDomain}>
                <Inputs
                    form={form} setForm={setForm} error={error} setError={setError}
                />
            </div>

            <div className={classes.ButtonDomain} onClick={onClickNext}>
                <Button color="purple-register" disabled={error === ''}>{language.next[1]}</Button>
            </div>


        </React.Fragment>
    )
}

const mapStateToProps = (state: any) => ({
    loading: getLoading(state),
    error: getError(state),
    domains: getDomains(state)
});

const mapDispatchToProps = (dispatch: any) => ({
    getAllDomains: () => dispatch(getAllDomains()),
    incrementent: () => dispatch(incrementent())
});

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(Domain);
