import ChartOne from "@/components/ChartOne";
import ChartThree from "@/components/ChartThree";
import DisplayDoctors from "@/components/DisplayDoctors";
import PageLoader from "@/components/PageLoader";
import { contextData } from "@/context/AuthContext";

export default function PatientDashboard() {
  const { user } = contextData();

  if (!user) return <PageLoader />;

  return (
    <>
      <DisplayDoctors />

      <div className="w-full flex gap-5 my-4 max-[1100px]:flex-col mb-4">
        <div className="flex-auto">
          <ChartOne />
        </div>
        <div className="flex-none">
          <ChartThree />
        </div>
      </div>
    </>
  );
}
