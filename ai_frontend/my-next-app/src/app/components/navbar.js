"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [userRole, setUserRole] = useState(null);

  const fetchRole = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
        withCredentials: true,
      });
      setUserRole(res.data.role);
    } catch {
      setUserRole(null);
    }
  };

  
  useEffect(() => {
    fetchRole();


    const handleRoleChange = () => fetchRole();
    window.addEventListener("roleChange", handleRoleChange);
    return () => window.removeEventListener("roleChange", handleRoleChange);
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/logout`,
        {},
        { withCredentials: true }
      );
    } catch (err) {
      console.error("Logout failed", err);
    }
    window.dispatchEvent(new Event("roleChange"));
    router.push("/auth/login");
  };

  const linkClass = (path) =>
    `px-3 py-2 rounded-md text-sm font-medium ${
      pathname === path || pathname.startsWith(path)
        ? "bg-blue-600 text-white"
        : "text-gray-700 hover:bg-gray-200"
    }`;

  return (
    <nav className="bg-white shadow-md px-6 py-3 flex justify-between items-center">
      <div className="text-xl font-bold text-blue-600">
        <Link href="/">Smart Attendance System</Link>
      </div>

      <ul className="flex items-center space-x-4">
        <li>
          <Link href="/" className={linkClass("/")}>
            Home
          </Link>
        </li>

        {userRole === "STUDENT" && (
          <>
            <li>
              <Link href="/student/dashboard" className={linkClass("/student/dashboard")}>
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="/student/classes" className={linkClass("/student/classes")}>
                Classes
              </Link>
            </li>
            <li>
              <Link href="/student/serach" className={linkClass("/student/serach")}>
                Search
              </Link>
            </li>
          </>
        )}

        
        {userRole === "TEACHER" && (
            <>
            <li>
            <Link href="/teacher/dashboard" className={linkClass("/teacher/dashboard")}>
              Admin
            </Link>    
          </li>
           <Link href="/teacher/class" className={linkClass("/teacher/dashboard")}>
               class
            </Link>
          </>
          
          
        )}

    
        {!userRole ? (
          <>
            <li>
              <Link href="/auth/login" className={linkClass("/auth/login")}>
                Login
              </Link>
            </li>
            <li>
              <Link href="/auth/register" className={linkClass("/auth/register")}>
                Register
              </Link>
            </li>
          </>
        ) : (
          <li>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
            >
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}