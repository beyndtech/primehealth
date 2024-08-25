import React, { useState, ChangeEvent, FormEvent } from "react";
import { Link } from "react-router-dom";
import { VscEye } from "react-icons/vsc";
import Otp from "@/components/Otp";
import { contextData } from "@/context/AuthContext";
import logo from "../assets/smallLogo2.svg";
import Alert from "@/components/UI/Alert";
import Btn from "@/components/UI/Btn";

const Register: React.FC = () => {
  const [accountType, setAccountType] = useState<string>("none");
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<string | null>(null);
  const url = import.meta.env.VITE_REACT_APP_SERVER_URL;
  const { user } = contextData();

  const validateForm = (): string => {
    if (accountType === "none") return "Please select an account type";
    if (email.length < 5 && !email.includes("@"))
      return "Please enter a valid email address";
    if (username.length < 3)
      return "Your username must be at least 3 characters";
    if (password.length < 5)
      return "Your password must be at least 5 characters";
    return "success";
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ): void => {
    setError(null);
    const { id, value } = e.target;

    if (id === "accountType") {
      setAccountType(value);
    } else if (id === "email") {
      setEmail(value.toLowerCase());
    } else if (id === "username") {
      setUsername(value);
    } else if (id === "password") {
      setPassword(value);
    }
  };

  const handleShowPassword = (): void => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const isValid =
      validateForm() === "success" ? true : setError(validateForm());

    if (isValid)
      try {
        setLoading(true);
        const res = await fetch(`${url}/auth/signup`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            username,
            password,
            accountType,
          }),
        });

        const data = await res.json();

        if (res.ok) {
          setSuccess(data.message);
        } else throw new Error(data.message);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
  };

  if (success) {
    return <Otp email={email} />;
  }

  return (
    !user && (
      <div className="flex min-h-screen">
        {/* Left: Form */}
        <div className="w-full md:w-1/2 flex justify-center items-center bg-white">
          <form
            className="w-full max-w-md p-8"
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <div className="flex items-center gap-8 mb-8">
              <Link to="/">
                <img className="h-12 w-auto" alt="logo" src={logo} />
              </Link>

              <h1 className="text-3xl font-semibold font-palanquin tracking-tight">
                Register
              </h1>
            </div>

            <div className="mb-4">
              <label
                htmlFor="accountType"
                className="block text-sm font-medium text-gray-700"
              >
                Account Type
              </label>
              <select
                id="accountType"
                value={accountType}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="none">Select Account Type</option>
                <option value="patient">Patient</option>
                <option value="doctor">Doctor</option>
              </select>
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
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                type="email"
                placeholder="Email"
                autoComplete="off"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <input
                id="username"
                value={username}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                type="text"
                placeholder="Username"
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
                onChange={handleChange}
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

            <div className="flex gap-2 mb-6">
              <input
                checked
                disabled
                style={{ width: "25px" }}
                type="checkbox"
              />
              <p className="text-sm font-semibold">
                Carepulse{" "}
                <a href="#" className="text-blue-600">
                  Terms & Condition | Privacy Policy
                </a>
              </p>
            </div>

            <Btn
              type="big"
              label="Create account"
              color="blue"
              disabled={loading}
              form
            />

            {error && <Alert type="danger" message={error as string} />}
            {success && <Alert type="success" message={success as string} />}

            <p className="text-sm font-semibold mt-3 text-black/50">
              Already created an account?{" "}
              <Link to="/login" className="text-blue-600">
                Login
              </Link>
            </p>
          </form>
        </div>

        {/* Right: Full-height Image */}
        <div
          className="hidden md:block w-1/2 bg-cover bg-center"
          style={{ backgroundImage: "url(https://bit.ly/onboarding-nurses" }}
        ></div>
      </div>
    )
  );
};

export default Register;
