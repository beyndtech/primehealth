import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { contextData } from "../context/AuthContext";
import logo from "../assets/smallLogo2.svg";
import Alert from "./UI/Alert";
import Btn from "./UI/Btn";

interface OtpProps {
  email: string;
}

const Otp: React.FC<OtpProps> = ({ email }) => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState<string>("");
  const [error, setError] = useState<string | null>("");
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { login } = contextData();
  const url = import.meta.env.VITE_REACT_APP_SERVER_URL;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setOtp(e.target.value);
  };

  const handleResendOtp = async (): Promise<void> => {
    setSuccess(null);
    setError(null);

    try {
      const res = await fetch(`${url}/auth/resend-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) setSuccess("OTP sent successfully!");
      else throw new Error(data.message);
    } catch (err: any) {
      setError(err.message);
    }

    setTimeout(() => {
      setSuccess(null);
    }, 3000);
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${url}/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: otp,
          email,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        await login(data);
        data.accountType === "doctor"
          ? navigate("/dashboard/doctor/")
          : navigate("/dashboard/patient");
      }
      else throw new Error(data.message);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg"
      >
        <div className="flex items-center gap-8 mb-8">
          <Link to="/">
            <img className="h-12 w-auto" alt="logo" src={logo} />
          </Link>

          <h1 className="text-3xl font-semibold font-palanquin tracking-tight">
            Enter Otp
          </h1>
        </div>
        <input
          value={otp}
          onChange={handleChange}
          className="mb-4 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          type="text"
          placeholder="Enter the 6 digit code"
          required
        />

        <Btn
          type="big"
          label="Send Code"
          color="blue"
          disabled={loading}
          form
        />

        {error && <Alert type="danger" message={error as string} />}
        {success && <Alert type="success" message={success as string} />}

        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={handleResendOtp}
            className="text-sm font-semibold text-indigo-600 hover:text-indigo-900 focus:outline-none"
          >
            Resend <span>OTP</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Otp;
