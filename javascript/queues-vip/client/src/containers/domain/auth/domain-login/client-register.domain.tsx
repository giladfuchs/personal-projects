import React, { useState, useEffect } from "react";
import { Redirect, RouteComponentProps } from "react-router-dom";
import { connect } from "react-redux";

import classes from './business-login.module.scss'
import { Button, Inputs, AuthenticationHeadrer, Loading } from "../../../../models/ui";

import { phone, plainText, Client, Form } from "../../../../models";
import * as language from "../../../../assets/index";

import { checkDomainIsValid, registerDomainClient } from "../../../../store";
import { getLoading, getError, getIsTokenSet, getisLogin, getIsValidDomain } from "../../../../store/selectors";



interface Params extends RouteComponentProps<{ domain: string }> { }

interface StateProps {
    loading: boolean;
    error: string;
    isSetToken: boolean;
    isValidDomain: boolean
    isLogin: boolean
}

interface DispatchProps {
    checkDomainIsValid: typeof checkDomainIsValid;
    registerDomainClient: typeof registerDomainClient;
}
type Props = DispatchProps & StateProps & Params;

const DomainRegister: React.FC<Props> = (props) => {


    const [form, setForm] = useState<Form>({
        firstName: {
            ...plainText, elementConfig: {
                id: "first",
                placeholder: language.firstName[1],
            },
            label: language.firstName[1],
        },
        lastName: {
            ...plainText, elementConfig: {
                id: "last",
                placeholder: language.lastName[1],
            },
            label: language.lastName[1],
        },
        phone,
    });

    const [error, setError] = useState<string>("");

    const onClickNext = () => {
        const domain = props.match.params.domain;


        const client = Object.assign({},
            ...Object.keys(form).map((k: string) => ({ [k]: form[k].value }))
        );

        props.registerDomainClient(client, domain);
    };
    const [redirect, setRedirect] = useState<JSX.Element>();
    useEffect(() => {
        // console.log( props.history.push());
        const url = props.match.params.domain;
        console.log(url);

        props.isSetToken && setRedirect(
            <Redirect to={'/' + url} />)
    }, [props.isSetToken]);

    return (
        <div className={classes.Register}>
            {redirect}
            {props.isValidDomain ? <div
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
                    {!props.loading ? (
                        <React.Fragment>
                            <div className={classes.Button}>
                                <Button color="purple-register" onClick={() => onClickNext()} disabled={error === ""}>התחבר</Button>
                            </div>
                        </React.Fragment>
                    ) : (
                            <Loading />
                        )}
                </React.Fragment>
            </div> :
                <p>mistake</p>}
        </div>
    );
};

const mapStateToProps = (state: any) => ({
    loading: getLoading(state),
    error: getError(state),
    isSetToken: getIsTokenSet(state),
    isValidDomain: getIsValidDomain(state),
    isLogin: getisLogin(state)
});

const mapDispatchToProps = (dispatch: any) => ({
    checkDomainIsValid: (domain: string) => dispatch(checkDomainIsValid(domain)),
    registerDomainClient: (client: Client, domain: string) => dispatch(registerDomainClient(client, domain)),
});

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(DomainRegister);
