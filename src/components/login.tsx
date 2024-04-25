"use client";
import Link from "next/link";
import React, { useState } from "react";

export default function Login() {
  const [data, setData] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [loginVisible, setLoginVisible] = useState<boolean>(false);

  const handleChangeData = (e: any) => {
    setData(e.target.value);
  };

  const handleChangePassword = (e: any) => {
    setPassword(e.target.value);
  };

  const submitForm = async (e: any) => {
    e.preventDefault();
    if (!data || !password) {
      alert("Please fill in all forms!");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/api/author/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data, password }),
      });
      if (response.ok) {
        alert("Login successful!");
        setData(""), setPassword("");
      }
    } catch (error) {
      console.error(error);
      alert("Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center flex-col h-screen gap-2">
      <h1 className="font-bold text-3xl">Login</h1>
      <div className="card w-96 bg-base-100 shadow-xl  p-10">
        <form onSubmit={submitForm}>
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
            <input
              type="text"
              className="grow"
              placeholder="Username or Email"
              onChange={handleChangeData}
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="password"
              className="grow"
              placeholder="Password"
              onChange={handleChangePassword}
            />
          </label>
          <Link href="/" className="btn btn-primary">
            <button className="btn btn-primary mt-3 grow" type="submit">
              Login
            </button>
          </Link>
        </form>
        <div className="divider">OR</div>
        <p>{`Don't have an account?`}</p>
        <Link href="/register" className="btn btn-primary">
          Register
        </Link>
      </div>
    </div>
  );
}
