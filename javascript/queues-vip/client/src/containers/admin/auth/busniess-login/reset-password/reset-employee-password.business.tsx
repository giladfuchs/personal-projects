import React, { useState } from "react";
import { connect } from "react-redux";

import classes from "../business-login.module.scss";

import { AuthenticationHeadrer, Inputs, Button, Loading } from "../../../../../models/ui";

import { getLoading, getError } from "../../../../../store/selectors";
import { resetPasswordEmployee } from "../../../../../store";

import * as language from "../../../../../assets/language/language";
import { phone } from "../../../../../models/ui/input/utility/input-types.input";
import { Form } from "../../../../../models";

interface StateProps {
  loading: boolean;
  error: string;
}

interface DispatchProps {
  resetPasswordEmployee: typeof resetPasswordEmployee;
}

type Props = DispatchProps & StateProps;
const ResetEmployeePassword: React.FC<Props> = (props) => {
  const [Form, setForm] = useState<Form>({
    phone
  });
  const [error, setError] = useState<string>("");


  const onClickNext = () => {
    if (error || props.error) return;


    const ansForm = Object.assign(
      {},
      ...Object.keys(Form).map((k) => ({ [k]: Form[k].value }))
    );

    props.resetPasswordEmployee(ansForm.phone);
  };



  return (
    <div className={classes.Register}>
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
                form={Form} setForm={setForm} error={error} setError={setError}
              />
            </div>

            <div onClick={onClickNext} className={classes.Button}>
              <Button color="purple-register" disabled={true}>{language.sendCodeForReset[1]}</Button>
            </div>
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  loading: getLoading(state),
  error: getError(state),
});

const mapDispatchToProps = (dispatch: any) => ({
  resetPasswordEmployee: (phone: string) => dispatch(resetPasswordEmployee(phone)),
});

export default connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(ResetEmployeePassword);
