import React, { useState, useEffect } from "react";
import { Redirect, RouteComponentProps } from "react-router-dom";
import { connect } from "react-redux";


import classes from './business-login.module.scss'
import { Button, AuthenticationHeadrer, Inputs, Loading } from "../../../../models/ui";

import * as language from "../../../../assets/index";

import { phone, Form } from "../../../../models";

import { getLoading, getError, getisLogin, getIsValidDomain } from "../../../../store/selectors";
import { loginDomainClient, checkDomainIsValid } from "../../../../store/auth/index";

interface MatchParams {
    domain: string;

}
interface Params extends RouteComponentProps<MatchParams> { }


interface StateProps {
    loading: boolean;
    error: string;
    isLogin: boolean;
    isValidDomain: boolean
}

interface DispatchProps {
    checkDomainIsValid: typeof checkDomainIsValid;
    loginDomainClient: typeof loginDomainClient;
}
type Props = DispatchProps & StateProps & Params;

const DomainLogin: React.FC<Props> = (props) => {

    useEffect(() => {
        props.checkDomainIsValid(props.match.params.domain)
    }, []);
    const [form, setForm] = useState<Form>({
        "tel-local": phone,
    });

    const [error, setError] = useState<string>("");

    const onClickNext = () => {
        const domain = props.match.params.domain;
        props.loginDomainClient(domain, "" + form["tel-local"].value);
    };
    const [redirect, setRedirect] = useState<JSX.Element>();

    useEffect(() => {

        const url = props.match.params.domain;
        props.isLogin && setRedirect(
            <Redirect to={url} />)

    }, [props.isLogin]);


    return (
        <div className={classes.Register}>
            {redirect}
            <div
                className={[classes.Form2, classes.Form].join(" ")}
            >
                <AuthenticationHeadrer
                    title={language.loginDomainTitle[1]}
                    subTitle={language.loginSubTitle[1]}
                    error={error ? error : props.error}
                />

                <React.Fragment>
                    <div className={classes.Body}>
                        <Inputs
                            form={form} setForm={setForm} error={error} setError={setError}
                        />


                    </div>
                    {props.isValidDomain && !props.loading ? <React.Fragment>
                        <div className={classes.Button}>
                            <Button color="purple-register" onClick={() => onClickNext()} disabled={error === ""}>התחבר</Button>
                        </div>
                    </React.Fragment> : props.isValidDomain && <Loading />}
                </React.Fragment>
            </div> :

        </div>
    );
};

const mapStateToProps = (state: any) => ({
    loading: getLoading(state),
    error: getError(state),
    isLogin: getisLogin(state),
    isValidDomain: getIsValidDomain(state)
});

const mapDispatchToProps = (dispatch: any) => ({
    checkDomainIsValid: (domain: string) => dispatch(checkDomainIsValid(domain)),
    loginDomainClient: (domain: string, phone: string) => dispatch(loginDomainClient(domain, phone)),
});

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(DomainLogin);
