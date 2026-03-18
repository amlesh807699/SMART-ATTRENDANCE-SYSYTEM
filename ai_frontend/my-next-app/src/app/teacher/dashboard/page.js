"use client";

import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { gsap } from "gsap";
import { useRouter } from "next/navigation";

const TeacherDashboard = () => {
  const [teacher, setTeacher] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const cardRef = useRef(null);
  const router = useRouter();

  
  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        const res = await axios.get("http://localhost:8080/auth/me", {
          withCredentials: true,
        });

        
        if (res.data.role !== "TEACHER") {
          router.push("/auth/login");
          return;
        }

        setTeacher({
          name: res.data.name || "John Doe",
          email: res.data.email || "johndoe@example.com",
          department: res.data.department || "Computer Science",
          profilePic: res.data.profilePic || "https://i.pravatar.cc/150?img=32",
        });
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Could not fetch teacher info. Please login.");
        setLoading(false);
      }
    };

    fetchTeacher();
  }, [router]);

  
  useEffect(() => {
    if (!loading && !error && cardRef.current) {
      gsap.from(cardRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
      });
    }
  }, [loading, error]);

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:8080/auth/logout", {}, { withCredentials: true });
      router.push("/auth/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  if (loading)
    return <p className="text-center mt-10 text-gray-500">Loading...</p>;
  if (error)
    return (
      <p className="text-center mt-10 text-red-500 font-semibold">{error}</p>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white-50 to-white-50 flex items-center justify-center p-6">
    
      <div
        ref={cardRef}
        className="w-full max-w-lg p-8 bg-white rounded-3xl shadow-2xl border border-gray-100 transform transition hover:scale-105"
      >
      
        <div className="flex flex-col items-center mb-6">
          <img
            src={teacher.profilePic}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-indigo-300 mb-4 transform hover:scale-105 transition-transform duration-500"
          />
          <h2 className="text-2xl font-semibold text-gray-800">{teacher.name}</h2>
          <p className="text-gray-500">{teacher.email}</p>
          <p className="text-gray-500">{teacher.department}</p>
        </div>

        
        <h1 className="text-3xl font-extrabold mb-4 text-gray-800 text-center">
          Welcome, Teacher!
        </h1>

        
        <p className="mb-6 text-gray-600 text-center">
          This is your teacher dashboard. Manage your classes, check student attendance,
          and access all resources in one place.
        </p>

  
        <div className="flex justify-center gap-5">
          <a
            href="/teacher/classes"
            className="px-6 py-3 bg-blue-600 text-white rounded-full font-semibold shadow hover:bg-blue-700 hover:scale-105 transition-all duration-300"
          >
            View Classes
          </a>
          <a
            href="/teacher/add-class"
            className="px-6 py-3 bg-green-600 text-white rounded-full font-semibold shadow hover:bg-green-700 hover:scale-105 transition-all duration-300"
          >
            Add Class
          </a>
        </div>

  
        <button
          onClick={handleLogout}
          className="mt-6 w-full px-6 py-3 bg-red-500 text-white rounded-full font-semibold shadow hover:bg-red-600 hover:scale-105 transition-all duration-300"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default TeacherDashboard;