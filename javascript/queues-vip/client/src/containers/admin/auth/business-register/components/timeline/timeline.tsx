import React from 'react';
import TimelineStyle from './timeline.module.scss';

interface Props {
    step: number
}

const Timeline: React.FC<Props> = (props) => {

    return (
        <div className={TimelineStyle.Timeline}>
            <ul className={TimelineStyle.Progressbar}>
                <li className={TimelineStyle.Active}>הוספת עסק חדש</li>
                <li className={props.step > 1 ? TimelineStyle.Active : ''}>הרשמת מנהל</li>
                <li className={props.step > 3 ? TimelineStyle.Active : ''}>סיום</li>
            </ul>
        </div>
    )
}


export default Timeline;