import React from "react";
import InputField from "@/components/UI/InputField";
import FormSection from "@/components/UI/FormSection";
import { EducationFormProps } from "@/types/types";

const EducationForm: React.FC<EducationFormProps> = ({
  education,
  addEducation,
  updateEducation,
}) => {
  return (
    <FormSection title="Education (Optional)">
      {education.map((edu, index) => (
        <div key={index} className="space-y-4 mb-4">
          <InputField
            label="Degree"
            value={edu.degree}
            onChange={(value: any) => updateEducation(index, "degree", value)}
          />
          <InputField
            label="Institution"
            value={edu.institution}
            onChange={(value: any) =>
              updateEducation(index, "institution", value)
            }
          />
          <InputField
            label="Year of Completion"
            value={edu.yearOfCompletion}
            onChange={(value: any) =>
              updateEducation(index, "yearOfCompletion", value)
            }
            type="number"
            min={1900}
            max={new Date().getFullYear()}
          />
        </div>
      ))}
      <button type="button" onClick={addEducation} className="addBtn">
        + Add another degree
      </button>
    </FormSection>
  );
};

export default EducationForm;
