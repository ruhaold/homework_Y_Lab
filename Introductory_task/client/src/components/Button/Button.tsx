import { FC, HTMLAttributes } from "react";
import { Loader } from "../Loader";
import "./Button.css";

interface IButtonProps extends HTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  isDisabled?: boolean;
  kind?: "primary" | "secondary";
  type?: "submit" | "reset" | "button";
}

export const Button: FC<IButtonProps> = ({
  isLoading,
  isDisabled = isLoading,
  children,
  className,
  kind = "primary",
  type,
  ...props
}) => {
  return (
    <button
      disabled={isDisabled}
      type={type}
      className={"button"}
      data-kind={kind}
      {...props}
    >
      {isLoading ? <Loader /> : children}
    </button>
  );
};
