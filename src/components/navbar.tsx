import Link from "next/link";
import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { IoIosMenu } from "react-icons/io";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <IoIosMenu size={30} />
          </div>
          <ul
            tabIndex={0}
            className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
          >
            <li>
              <Link href="/search">Tutor Search</Link>
            </li>
            <li>
              <a>About Us</a>
            </li>
            <li>
              <a
                href="https://form.jotform.com/240903353188053"
                target="_blank"
              >
                Find Tutor
              </a>
            </li>
            <div className="p-1"></div>
            {session ? (
              <button
                className="btn btn-primary btn-sm"
                onClick={() => signOut()}
              >
                Sign Out
              </button>
            ) : (
              <button
                className="btn btn-primary btn-sm"
                onClick={() => signIn()}
              >
                Sign In
              </button>
            )}
          </ul>
        </div>
        <Link className="btn btn-ghost text-xl" href="/">
          <img src="/Delphis-Full.png" alt="Delphis Icon" className="h-10" />
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href="/search">Tutor Search</Link>
          </li>
          <li>
            <a>About Us</a>
          </li>
        </ul>
      </div>
      <div className="navbar-end hidden gap-5 lg:flex">
        {session ? (
          <>
            {session.user.role === "admin" ? (
              <Link href="/tutor/add" className="link-hover link font-semibold">
                Add Tutor
              </Link>
            ) : (
              <Link
                href="/tutor/register"
                className="link-hover link font-semibold"
              >
                Register as Tutor
              </Link>
            )}
            <button className="btn btn-primary" onClick={() => signOut()}>
              Sign Out
            </button>
          </>
        ) : (
          <>
            <Link
              className="link-hover link font-semibold"
              href="https://form.jotform.com/240903353188053"
              target="_blank"
            >
              Find Tutor
            </Link>
            <button
              className="btn btn-primary"
              onClick={() => signIn("google")}
            >
              Sign In
            </button>
          </>
        )}
      </div>
    </div>
  );
}
