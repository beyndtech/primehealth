import React from "react";
import InputField from "@/components/UI/InputField";
import { AllergiesFormProps } from "@/types/types";


const AllergiesForm: React.FC<AllergiesFormProps> = ({
  allergies,
  setAllergies,
}) => {
  const addAllergy = () => {
    setAllergies([...allergies, { name: "", severity: "" }]);
  };

  const updateAllergy = (index: number, field: string, value: string) => {
    const newAllergies = [...allergies];
    newAllergies[index] = { ...newAllergies[index], [field]: value };
    setAllergies(newAllergies);
  };

  return (
    <div className="py-6 border-t border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">Allergies (Optional)</h3>
      {allergies.map((allergy, index) => (
        <div key={index} className="mt-3 space-y-3">
          <InputField
            label="Allergy Name"
            value={allergy.name}
            onChange={(value) => updateAllergy(index, "name", value)}
          />
          <label className="editUserLabel">Severity</label>
          <select
            value={allergy.severity}
            onChange={(e) => updateAllergy(index, "severity", e.target.value)}
            className="updateFormInput"
          >
            <option value="">Select Severity</option>
            <option value="Mild">Mild</option>
            <option value="Moderate">Moderate</option>
            <option value="Severe">Severe</option>
          </select>
        </div>
      ))}
      <button type="button" onClick={addAllergy} className="addBtn">
        + Add another allergy
      </button>    </div>
  );
};

export default AllergiesForm;
