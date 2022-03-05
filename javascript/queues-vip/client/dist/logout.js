import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
const Logout = (props) => {
    useEffect(() => {
        window.location.reload(false);
    }, [props]);
    return React.createElement(Redirect, { to: "/" });
};
const mapDispatchToProps = (dispatch) => ({});
export default connect(null, mapDispatchToProps)(Logout);
