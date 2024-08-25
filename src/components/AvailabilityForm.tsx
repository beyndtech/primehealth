import React from "react";
import InputField from "@/components/UI/InputField";
import FormSection from "@/components/UI/FormSection";
import { AvailabilityType } from "@/types/types";
import { days } from "@/lib/utils";

interface AvailabilityFormProps {
  availability: AvailabilityType[];
  addAvailability: () => void;
  updateAvailability: (index: number, field: string, value: string) => void;
}

const AvailabilityForm: React.FC<AvailabilityFormProps> = ({
  availability,
  addAvailability,
  updateAvailability,
}) => {
  return (
    <FormSection title="Availability (Optional)">
      {availability.map((slot, index) => (
        <div key={index} className="space-y-4 mb-4">
          <label className="editUserLabel">
            Day
            <select
              value={slot.day}
              onChange={(e) => updateAvailability(index, "day", e.target.value)}
              className="editUserInput"
            >
              <option value="">Select Day</option>
              {days.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
          </label>
          <InputField
            label="Start Time"
            value={slot.startTime}
            onChange={(value:any) => updateAvailability(index, "startTime", value)}
            type="time"
          />
          <InputField
            label="End Time"
            value={slot.endTime}
            onChange={(value:any) => updateAvailability(index, "endTime", value)}
            type="time"
          />
        </div>
      ))}
      <button type="button" onClick={addAvailability} className="addBtn">
        + Add another slot
      </button>
    </FormSection>
  );
};

export default AvailabilityForm;
