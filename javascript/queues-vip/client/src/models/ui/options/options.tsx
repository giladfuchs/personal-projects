import React from 'react';
import OptionsStyle from './options.module.scss';
import moment from 'moment'
interface OwnProps {
    title?: string,
    disabled: boolean,
    value?: string,
    onChange: (e: any, arg?: any) => void,
    id?: string,
    style?: {},
    styleSelect?: {},
    defaultValue?: any
}

export const Options: React.FC<OwnProps> = (props) => {
    return (
        <div className={OptionsStyle.Options} style={props.style}>
            {props.title &&
                <p className={OptionsStyle.Title}>{props.title}</p>
            }
            <select disabled={props.disabled} className={OptionsStyle.Select} style={props.styleSelect}
                value={props.value} id={props.id}
                onChange={(e) => props.onChange(e, props.id)}
            >

                {[...Array(24 * 6).keys()].map(i => {
                    const hour = moment(0, "HH:mm").minutes(i * 10).format("HH:mm").toString();
                    return <option key={hour} value={hour}>
                        {hour}
                    </option>
                })}

            </select>
        </div >
    )
}


