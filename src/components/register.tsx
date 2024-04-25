"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function Register() {
  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  const handleNameChange = (e: any) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!name || !email || !password) {
      alert("Please fill in all forms!");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/api/author", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });
      if (response.ok) {
        alert("Register successful!");
        setName(""), setEmail(""), setPassword("");
      }
    } catch (error) {
      console.error(error);
      alert("Register failed");
    }
  };

  return (
    <div className="flex justify-center items-center flex-col h-screen">
      <h1 className="font-bold text-3xl">Register</h1>
      <div className="card w-96 bg-base-100 shadow-xl p-10">
        <form onSubmit={handleSubmit}>
          <label className="input input-bordered flex items-center gap-2 mb-3">
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
              placeholder="Name"
              onChange={handleNameChange}
            />
          </label>
          <label className="input input-bordered flex items-center gap-2 mb-3">
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
              placeholder="Email"
              onChange={handleEmailChange}
            />
          </label>
          <label className="input input-bordered flex items-center gap-2 mb-3">
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
              onChange={handlePasswordChange}
            />
          </label>

          <button className="btn btn-primary mb-3" type="submit">
            Register
          </button>
        </form>
        <p>
          Already have an account?{" "}
          <Link href="/login" className="text-primary">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
