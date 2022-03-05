import React from 'react';
import textBoxStyle from './text-box.module.scss';

interface OwnProps {
    height: string,
    width: string
}

type Props = OwnProps;
const TextBox: React.FC<Props> = (props) => {
    return (
        <div className={textBoxStyle.Box} style={{ height: props.height, width: props.width }}>
            {props.children}
        </div>
    )
}

export default TextBox;