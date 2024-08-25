import React from "react";
import InputField from "@/components/UI/InputField";
import { MedicationsFormProps } from "@/types/types";

const MedicationsForm: React.FC<MedicationsFormProps> = ({
  currentMedications,
  setCurrentMedications,
}) => {
  const addMedication = () => {
    setCurrentMedications([
      ...currentMedications,
      { name: "", dosage: "", frequency: "" },
    ]);
  };

  const updateMedication = (index: number, field: string, value: string) => {
    const newMedications = [...currentMedications];
    newMedications[index] = { ...newMedications[index], [field]: value };
    setCurrentMedications(newMedications);
  };

  return (
    <div className="py-6 border-t border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">
        Current Medications (Optional)
      </h3>
      {currentMedications.map((medication, index) => (
        <div key={index} className="mt-3 space-y-3">
          <InputField
            label="Medication Name"
            value={medication.name}
            onChange={(value) => updateMedication(index, "name", value)}
          />
          <InputField
            label="Dosage"
            value={medication.dosage}
            onChange={(value) => updateMedication(index, "dosage", value)}
          />
          <InputField
            label="Frequency"
            value={medication.frequency}
            onChange={(value) => updateMedication(index, "frequency", value)}
          />
        </div>
      ))}
      <button type="button" onClick={addMedication} className="addBtn">
        + Add another medication
      </button>{" "}
    </div>
  );
};

export default MedicationsForm;
