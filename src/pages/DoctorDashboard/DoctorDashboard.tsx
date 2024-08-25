import ChartOne from "@/components/ChartOne";
import ChartThree from "@/components/ChartThree";
import ChartTwo from "@/components/ChartTwo";
import Patients from "@/components/Patients";

export default function DoctorDashboard() {
  return (
    <>
      <div className="w-full flex my-4 mb-4">
        <Patients />
      </div>

      <div className="w-full flex gap-5 my-4 max-[1100px]:flex-col mb-4">
        <div className="flex-auto">
          <ChartOne />
        </div>
        <div className="flex-none">
          <ChartThree />
        </div>
      </div>

      <div className="w-full flex my-4 mb-4">
        <div className="flex-auto">
          <ChartTwo />
        </div>
      </div>
    </>
  );
}
