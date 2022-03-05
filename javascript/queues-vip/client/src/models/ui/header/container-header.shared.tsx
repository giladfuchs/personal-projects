import React from 'react';
import HeaderStyle from './container-header.module.scss';

interface OwnProps {
    title: string,
    subTitle: string


}

export const SettingsHeader: React.FC<OwnProps> = (props) => {

    return (
        <React.Fragment>

            <div className={HeaderStyle.Header}>
                <p className={HeaderStyle.Title}>{props.title}</p>
                <span className={HeaderStyle.SubTitle}>{props.subTitle}</span>
            </div>
        </React.Fragment>

    )
}

