import React from "react";
import modalStyle from "./modal.module.scss";

interface OwnProps {
  close?: () => void;
  onClickButton?: () => void;
  title?: string;
  footer?: JSX.Element;
  children: React.ReactNode
  color?: 'purple' | 'orange' | 'purple-register';
}

export const Modal: React.FC<OwnProps> = props => {

  const color = props.color === 'purple' ? '#7467ef' : props.color === 'orange' ? '#ff9e43' : '#7b1fa2'


  return (
    <div className={modalStyle.ModalBackground} onClick={props.close} >
      <div className={modalStyle.Modal} onClick={(e: any) => { e.stopPropagation(); }}>
        <div className={modalStyle.Header} style={props.color ? { backgroundColor: color } : {}}>
          <h1>{props.title}</h1>
          <span onClick={props.close}>&times;</span>
        </div>
        <div className={modalStyle.Content}>

          {props.children}
        </div>
        <div className={modalStyle.Footer}>
          {props.footer}
        </div>
      </div>
    </div>
  );
};
