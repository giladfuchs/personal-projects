import React from 'react';
import SwitchButtonStyle from './switch-button.module.scss';

interface OwnProps {
    state: boolean,
    onChange: (value: any, id: number) => void,
    id: number,
}

export const SwitchButton: React.FC<OwnProps> = (props) => {

    return (
        <label className={SwitchButtonStyle.Switch}>
            <input type="checkbox" onClick={() => props.onChange(!props.state, props.id)} defaultChecked={props.state} />
            <span className={SwitchButtonStyle.Slider}></span>
        </label>
    )
}

