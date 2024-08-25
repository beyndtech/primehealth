import React from "react";
import { FormSectionProps } from "@/types/types"

const FormSection: React.FC<FormSectionProps> = ({ title, children }) => (
  <div className="py-6 border-t border-gray-200 dark:border-gray-700">
    <h3 className="text-md font-semibold text-gray-800 dark:text-gray-200 mb-6">{title}</h3>
    {children}
  </div>
);

export default FormSection;
