import React, { useState } from "react";
import { RouteComponentProps, Redirect } from "react-router";
import { connect } from "react-redux";

import { getLoading, getError, getisLogin } from "../../../../../store/selectors";
import { setNewPasswordEmployee } from "../../../../../store/auth";

import classes from "../business-login.module.scss";

import { Button, AuthenticationHeadrer, Inputs, Loading } from "../../../../../models/ui";
import * as language from "../../../../../assets";


import { password, Form } from "../../../../../models";

interface MatchParams {
  token: string;
}
interface Params extends RouteComponentProps<MatchParams> { }

interface StateProps {
  loading: boolean;
  error: string;
  isLogin: boolean;
}

interface DispatchProps {
  setNewPasswordEmployee: typeof setNewPasswordEmployee;
}

type Props = DispatchProps & StateProps & Params;
const ResetEmployeePassword: React.FC<Props> = (props) => {
  const [form, setForm] = useState<Form>({
    password,
    confirmPassword: password
  });



  const [error, setError] = useState<string>("");
  const onClickNext = () => {
    const token = props.match.params.token;
    const ansForm = Object.assign(
      {},
      ...Object.keys(form).map((k) => ({ [k]: form[k].value }))
    );

    props.setNewPasswordEmployee(ansForm, token);
  };

  const redirect: JSX.Element | null = props.isLogin ? <Redirect to='' /> : null;

  return (
    <React.Fragment>
      <div className={classes.Register}>
        {redirect}
        <div
          className={[classes.Form2, classes.Form].join(" ")}
        >
          <AuthenticationHeadrer
            title={language.restPasswordTitle[1]}
            subTitle={language.restPasswordSubTitle[1]}
            error={error ? error : props.error}
          />

          {props.loading && <Loading />}

          {!props.loading && (
            <React.Fragment>
              {props.error}

              <div className={classes.Body}>
                <Inputs
                  form={form} setForm={setForm} error={error} setError={setError}
                />
              </div>

              <div onClick={onClickNext} className={classes.Button}>
                <Button color="purple-register">
                  {language.sendCodeForReset[1]}
                </Button>
              </div>
            </React.Fragment>
          )}
        </div>
      </div>
    </React.Fragment>

  );
};

const mapStateToProps = (state: any) => ({
  loading: getLoading(state),
  error: getError(state),
  isLogin: getisLogin(state),
});

const mapDispatchToProps = (dispatch: any) => ({
  setNewPasswordEmployee: (password: string, token: string) =>
    dispatch(setNewPasswordEmployee(password, token)),
});

export default connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(ResetEmployeePassword);
