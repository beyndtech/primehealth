import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { contextData } from "@/context/AuthContext";
import logo from "../assets/smallLogo2.svg";
import Alert from "@/components/UI/Alert";
import Btn from "@/components/UI/Btn";
import { VscEye } from "react-icons/vsc";
import Otp from "@/components/Otp";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const url = import.meta.env.VITE_REACT_APP_SERVER_URL;
  const { login } = contextData();
  const navigate = useNavigate();


  const handleShowPassword = (): void => {
    setShowPassword(!showPassword);
  };

  const resendOtp = async (): Promise<void> => {
    setSuccess(false);

    try {
      const res = await fetch(`${url}/auth/resend-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) setSuccess(true);
      else throw new Error(data.message);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();

    if (email.length < 7)
      return setError("Your email must be at least 7 characters");
    if (!email.includes("@")) return setError("Invalid Email");
    if (password.length < 5)
      return setError("Your password must be at least 5 characters");

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${url}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        await login(data);
        data.accountType === "doctor"
          ? navigate("/dashboard/doctor/")
          : navigate("/dashboard/patient");
      } else throw new Error(data.message);
    } catch (err: any) {
      setError(err.message);
      if (err.message === "Email not verified") await resendOtp();
    } finally {
      setLoading(false);
    }
  };

  if (error === "Email not verified" && success) {
    return <Otp email={email} />;
  }

  return (
    <div className="flex min-h-screen">
      {/* Left: Form */}
      <div className="w-full md:w-1/2 flex justify-center items-center bg-white">
        <form
          className="w-full max-w-md p-8"
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col items-center gap-5 mb-8">
            <Link to="/">
              <img className="h-12 w-auto" alt="logo" src={logo} />
            </Link>

            <h1 className="text-2xl font-semibold font-palanquin tracking-tight">
              Welcome back!👋
            </h1>
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value.toLowerCase())}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              type="email"
              placeholder="Email"
              autoComplete="off"
              required
            />
          </div>

          <div className="mb-6 relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              autoComplete="new-password"
              required
            />

            <VscEye
              onClick={handleShowPassword}
              className="absolute right-3 top-[56%] cursor-pointer"
            />
          </div>

          <Btn type="big" label="Login" color="blue" disabled={loading} form />

          <p className="text-center text-sm font-semibold mt-3 text-black/50">
            Dont have an account?{" "}
            <Link to="/" className="text-blue-600">
              Register
            </Link>{" "}
            <span className="text-base text-black font-light">||</span> Forgot
            password?{" "}
            <Link to="/password-reset" className="text-blue-600">
              Reset
            </Link>
          </p>

          {error && <Alert type="danger" message={error as string} />}
        </form>
      </div>

      {/* Right: Full-height Image */}
      <div
        className="hidden md:block w-1/2 bg-cover bg-center"
        style={{ backgroundImage: "url(https://bit.ly/onboarding-nurses" }}
      ></div>
    </div>
  );
};

export default Login;
