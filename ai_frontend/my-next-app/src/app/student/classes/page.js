"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";

export default function ClassesPage() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const cardsRef = useRef([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/student/all/class`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setClasses(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (classes.length > 0) {
      gsap.fromTo(
        cardsRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.7,
          ease: "power3.out",
        }
      );
    }
  }, [classes]);

  const go = (id) => {
    router.push(`../student/classes/${id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 px-4 py-10">
      
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-10 text-center text-gray-800">
          Explore Classes
        </h1>

        {/* 🔄 Loading */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-40 rounded-2xl bg-white animate-pulse shadow"
              />
            ))}
          </div>
        )}

        {/* ❌ Empty */}
        {!loading && classes.length === 0 && (
          <div className="text-center text-gray-500 text-lg">
            No classes available.
          </div>
        )}

        {/* ✅ Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {!loading &&
            classes.map((cls, index) => (
              <div
                key={cls.id}
                ref={(el) => (cardsRef.current[index] = el)}
                className="bg-white border border-gray-100 rounded-2xl p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    {cls.name}
                  </h2>
                  <p className="text-gray-600 text-sm line-clamp-3">
                    {cls.description}
                  </p>
                </div>

                <button
                  onClick={() => go(cls.id)}
                  className="mt-5 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition active:scale-[0.97]"
                >
                  View Details
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}