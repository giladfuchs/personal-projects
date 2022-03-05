import React from "react";
import ButtonStyle from "./button.module.scss";

interface OwnProps {
  onClick?: (e?: any) => void;
  color: "purple" | "orange" | "purple-register";
  border?: boolean;
  disabled?: boolean;
  style?: {}
}

export const Button: React.FC<OwnProps> = (props) => {
  const color =
    props.color === "purple"
      ? "#7467ef"
      : props.color === "orange"
        ? "#ff9e43"
        : "#7b1fa2";

  return (
    <button
      disabled={!props.disabled}
      style={
        props.border
          ? { border: "1px solid " + color, color: color, background: "none" }
          : { background: color }
      }
      className={ButtonStyle.Button}
      onClick={props.onClick}
    >
      <div className={ButtonStyle.Children}>
        {props.children}
      </div>
    </button>
  );
};

