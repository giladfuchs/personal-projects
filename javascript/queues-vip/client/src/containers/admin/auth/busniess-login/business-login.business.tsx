import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import classes from './business-login.module.scss'

import { getLoading, getError, getisLogin } from "../../../../store/selectors";
import { loginEmployee } from "../../../../store";

import { Button, AuthenticationHeadrer, Inputs, Loading } from "../../../../models/ui";
import * as language from "../../../../assets/language/language";

import { password, phone, Form } from "../../../../models";

interface FormState {
    phone: string;
    password: string;
}

interface StateProps {
    loading: boolean;
    error: string;
    isLogin: boolean;
}

interface DispatchProps {
    loginEmployee: typeof loginEmployee;
}

type Props = DispatchProps & StateProps;
const BusinessLogin: React.FC<Props> = (props) => {
    const [form, setForm] = useState<Form>({
        phone,
        password
    });

    const [error, setError] = useState<string>("");

    const onClickNext = () => {
        const ansForm = Object.assign(
            {},
            ...Object.keys(form).map((k) => ({ [k]: form[k].value }))
        );
        props.loginEmployee(ansForm);
    };
    const [redirect, setRedirect] = useState<JSX.Element>();
    useEffect(() => {
        props.isLogin &&
            setRedirect(<Redirect to="" />)
    }, [props.isLogin]);

    return (
        <div className={classes.Register}>
            {redirect}
            <div
                className={[classes.Form2, classes.Form].join(" ")}
            >
                <AuthenticationHeadrer
                    title={language.loginEmployeeTitle[1]}
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
                                <Link to="/admin/resetpassword">{language.restPasswordTitle[1]}</Link>
                            </div>
                        </React.Fragment>
                    ) : (
                            <Loading />
                        )}
                </React.Fragment>
            </div>
        </div>
    );
};

const mapStateToProps = (state: any) => ({
    loading: getLoading(state),
    error: getError(state),
    isLogin: getisLogin(state)
});

const mapDispatchToProps = (dispatch: any) => ({
    loginEmployee: (form: FormState) => dispatch(loginEmployee(form)),
});

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(BusinessLogin);
