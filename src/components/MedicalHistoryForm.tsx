import React from "react";
import InputField from "./UI/InputField";
import { MedicalHistoryFormProps } from "@/types/types";

const MedicalHistoryForm: React.FC<MedicalHistoryFormProps> = ({
  medicalHistory,
  setMedicalHistory,
}) => {
  const addCondition = () => {
    setMedicalHistory([...medicalHistory, { condition: "", dateDiagnosed: "", treatment: "" }]);
  };

  const updateCondition = (index: number, field: string, value: string) => {
    const newMedicalHistory = [...medicalHistory];
    newMedicalHistory[index] = { ...newMedicalHistory[index], [field]: value };
    setMedicalHistory(newMedicalHistory);
  };

  return (
    <div className="py-6 border-t border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">Medical History (Optional)</h3>
      {medicalHistory.map((history, index) => (
        <div key={index} className="mt-3 space-y-3">
          <InputField
            label="Condition"
            value={history.condition}
            onChange={(value:any) => updateCondition(index, "condition", value)}
          />
          <InputField
            label="Date Diagnosed"
            value={history.dateDiagnosed}
            onChange={(value:any) => updateCondition(index, "dateDiagnosed", value)}
            type="date"
          />
          <InputField
            label="Treatment"
            value={history.treatment}
            onChange={(value:any) => updateCondition(index, "treatment", value)}
          />
        </div>
      ))}

      <button type="button" onClick={addCondition} className="addBtn">
        + Add another condition
      </button>
    </div>
  );
};

export default MedicalHistoryForm;
