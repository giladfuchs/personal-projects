import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { logoutEmployee } from "../../../../store/general/index";


interface DispatchProps {
  logoutEmployee: typeof logoutEmployee;
}

const Logout: React.FC<DispatchProps> = (props) => {
  useEffect(() => {
    props.logoutEmployee();
    window.location.reload(false);

  }, [props]);

  return <Redirect to="/" />;
};


const mapDispatchToProps = (dispatch: any) => ({
  logoutEmployee: () => dispatch(logoutEmployee()),
});

export default connect<null, DispatchProps>(null, mapDispatchToProps)(Logout);
