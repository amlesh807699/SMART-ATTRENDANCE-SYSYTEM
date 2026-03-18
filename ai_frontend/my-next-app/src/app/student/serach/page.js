"use client";

import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";

const ClassSearchPage = () => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const cardsRef = useRef([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const getClasses = async () => {
        try {
          setLoading(true);
          const res = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/student/all/class?name=${query}`,
            { withCredentials: true }
          );
          setResult(res.data);
        } catch (err) {
          console.error("Error fetching classes:", err);
        } finally {
          setLoading(false);
        }
      };

      if (query.trim()) {
        getClasses();
      } else {
        setResult([]);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  // ✅ Fix GSAP ref reset
  useEffect(() => {
    cardsRef.current = [];

    if (result.length > 0) {
      gsap.from(cardsRef.current, {
        opacity: 0,
        y: 30,
        stagger: 0.15,
        duration: 0.6,
        ease: "power3.out",
      });
    }
  }, [result]);

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto">
      
      {/* Heading */}
      <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6">
        Search Classes
      </h1>

      {/* Search Input */}
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search classes..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full max-w-md sm:max-w-lg px-4 py-3 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
        />
      </div>

      {/* Loading */}
      {loading && (
        <p className="text-center text-gray-500">Loading...</p>
      )}

      {/* Empty State */}
      {!loading && query && result.length === 0 && (
        <p className="text-center text-gray-500">
          No classes found
        </p>
      )}

      {/* Grid */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {result.map((cls, index) => (
          <div
            key={cls.id}
            ref={(el) => (cardsRef.current[index] = el)}
            className="bg-gradient-to-br from-indigo-100 via-pink-100 to-purple-100 p-4 sm:p-6 rounded-2xl shadow-md border hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
          >
            <h2 className="text-lg sm:text-xl font-bold mb-2 text-gray-800">
              {cls.name}
            </h2>
            <p className="text-sm sm:text-base text-gray-700">
              {cls.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClassSearchPage;