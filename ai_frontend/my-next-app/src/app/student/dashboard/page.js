"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

const StudentDashboard = () => {
  const [rollNo, setRollNo] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/me`,
          { withCredentials: true }
        );
        setRollNo(res.data.rollno);
      } catch (err) {
        setError("Could not fetch user info. Please login.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="w-full min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 py-6">
      
      {/* 🔹 Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Welcome, Student #{rollNo}
        </h1>
        <p className="text-gray-500 mt-1">
          Manage your classes and track your attendance
        </p>
      </div>

      {/* 🔹 Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
        
        <div className="p-5 bg-white rounded-xl shadow border">
          <h2 className="text-gray-500 text-sm">Total Classes</h2>
          <p className="text-2xl font-bold text-gray-800">--</p>
        </div>

        <div className="p-5 bg-white rounded-xl shadow border">
          <h2 className="text-gray-500 text-sm">Attendance</h2>
          <p className="text-2xl font-bold text-green-600">--</p>
        </div>

        <div className="p-5 bg-white rounded-xl shadow border">
          <h2 className="text-gray-500 text-sm">Pending Tasks</h2>
          <p className="text-2xl font-bold text-red-500">--</p>
        </div>
      </div>

      {/* 🔹 Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        
        <a
          href="/student/classes"
          className="p-6 bg-white rounded-xl shadow border hover:shadow-lg transition"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            View Classes
          </h3>
          <p className="text-gray-500 text-sm">
            See all your enrolled classes
          </p>
        </a>

        <a
          href="/student/search"
          className="p-6 bg-white rounded-xl shadow border hover:shadow-lg transition"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Search Classes
          </h3>
          <p className="text-gray-500 text-sm">
            Find and join new classes
          </p>
        </a>

        <a
          href="/student/profile"
          className="p-6 bg-white rounded-xl shadow border hover:shadow-lg transition"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Profile
          </h3>
          <p className="text-gray-500 text-sm">
            Manage your account details
          </p>
        </a>

      </div>
    </div>
  );
};

export default StudentDashboard;