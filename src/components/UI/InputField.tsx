import { InputFieldProps } from "@/types/types";
import React from "react";

const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  onChange,
  type = "text",
  placeholder = "",
  required = false,
}) => (
  <label className="editUserLabel">
    {label}
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      type={type}
      className="editUserInput"
      placeholder={placeholder}
      required={required}
    />
  </label>
);

export default InputField;
