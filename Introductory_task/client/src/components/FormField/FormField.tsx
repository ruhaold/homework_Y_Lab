import { FC, ReactNode } from "react";
import "./FormField.css";

interface IFormFieldProps {
  label: string;
  children: ReactNode;
  errorMessage?: string;
}

export const FormField: FC<IFormFieldProps> = ({
  children,
  label,
  errorMessage,
}) => {
  return (
    <label className={"form-field"}>
      <span className={"form-field__label"}>{label}</span>
      {children}
      {errorMessage && (
        <span className={"form-field__error-text"}>{errorMessage}</span>
      )}
    </label>
  );
};
