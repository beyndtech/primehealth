import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import logo from "../assets/smallLogo2.svg";
import Btn from "@/components/UI/Btn";
import Alert from "@/components/UI/Alert";

const PasswordReset: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [email, setEmail] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const { page } = useParams<{ page: string }>();
  const url = import.meta.env.VITE_REACT_APP_SERVER_URL;

  const handleReset = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (email === "" || !email.includes("@") || email.length < 5) {
      return setError("Email is invalid");
    }

    try {
      setLoading(true);
      const res = await fetch(`${url}/users/reset-password/${email}`);
      const data = await res.json();

      if (res.ok) setSuccess(data.message);
      else throw new Error(data.message);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleNewPassword = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();

    if (email === "" || !email.includes("@") || email.length < 7) {
      return setError("Email is invalid");
    }
    if (newPassword === "" || newPassword.length < 5) {
      return setError("Password is invalid");
    }

    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`${url}/users/new-password`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password: newPassword }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess("Password Changed Successfully, Login to continue");
      } else {
        throw new Error(data.message);
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left: Form */}
      <div className="w-full md:w-1/2 flex justify-center items-center bg-white">
        {page === "newPassword" ? (
          <form className="w-full max-w-md p-8" onSubmit={handleNewPassword}>
            <div className="flex flex-col items-center gap-5 mb-8">
              <Link to="/">
                <img className="h-12 w-auto" alt="logo" src={logo} />
              </Link>

              <h1 className="text-2xl font-bold font-palanquin tracking-tight">
                Enter New Email & Password
              </h1>
            </div>
            <input
              className="mb-4 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value.toLowerCase())}
              required
            />
            <input
              className="mb-6 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={newPassword}
              placeholder="Password"
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <Btn
              type="big"
              label="Send Mail"
              color="blue"
              disabled={loading}
              form
            />

            {error && <Alert type="danger" message={error as string} />}
            {success && <Alert type="success" message={success as string} />}

            <p className="text-sm font-semibold mt-3 text-black/50">
              Back to{" "}
              <Link to="/login" className="text-blue-600">
                login
              </Link>
            </p>
          </form>
        ) : (
          <form className="w-full max-w-md p-8" onSubmit={handleReset}>
            <div className="flex flex-col items-center gap-5 mb-8">
              <Link to="/">
                <img className="h-12 w-auto" alt="logo" src={logo} />
              </Link>

              <h1 className="text-2xl font-semibold font-palanquin tracking-tight">
                Reset Password
              </h1>
            </div>

            <input
              className="mb-6 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value.toLowerCase())}
              required
            />
            <Btn
              type="big"
              label="Send Mail"
              color="blue"
              disabled={loading}
              form
            />

            {error && <Alert type="danger" message={error as string} />}
            {success && <Alert type="success" message={success as string} />}

            <div className="mt-4 flex justify-center">
              <p className="text-sm font-semibold mt-3 text-black/50">
                Back to{" "}
                <Link to="/login" className="text-blue-600">
                  login
                </Link>
              </p>
            </div>
          </form>
        )}
      </div>

      {/* Right: Full-height Image */}
      <div
        className="hidden md:block w-1/2 bg-cover bg-center"
        style={{ backgroundImage: "url(https://bit.ly/onboarding-nurses" }}
      ></div>
    </div>
  );
};

export default PasswordReset;
