import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import classes from "./layout.module.scss";

import { getBusiness } from '../../../store/selectors'
import { BusinessDetails } from "../../system";
interface StateProps {
    business: BusinessDetails
}
const Logo: React.FC<StateProps> = (props) => {
    const [img, setImg] = useState<string>("https://w7.pngwing.com/pngs/139/151/png-transparent-computer-icons-calendar-agenda-calendar-icon-miscellaneous-blue-text.png")

    useEffect(() => {
        const url: string = props.business && props.business.otherData && props.business.otherData.logo !== undefined ? props.business.otherData.logo : "";
        url !== '' && setImg(url)
    }
        , [props.business])
    return (<div
        className={classes.Logo}
    // style={{ height: props.height, marginBottom: "12px" }}
    >
        <img height="50px" src={img} alt="MyBurger" />
    </div>
    )
}
const mapStateToProps = (state: any) => ({
    business: getBusiness(state)
});



export default connect<StateProps>(mapStateToProps)(Logo);
