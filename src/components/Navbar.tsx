import Link from "next/link";
import React from "react";

export default function Navbar() {
  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">Blog App</a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link href="/">Login</Link>
            </li>
            <li>
              <Link href="/login">Logout</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
