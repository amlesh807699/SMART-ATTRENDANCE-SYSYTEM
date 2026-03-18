"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { gsap } from "gsap";

export default function SingleClass() {
  const { id } = useParams();
  const router = useRouter();
  const [data, setData] = useState(null);
  const cardRef = useState(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/student/${id}`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.log(err));
  }, [id]);

  
  useEffect(() => {
    if (data) {
      gsap.from(".card", {
        opacity: 1,
        y: 50,
        duration: 0.8,
        ease: "power3.out",
      });
    }
  }, [data]);

  if (!data) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="card bg-gradient-to-br from-purple-100 via-pink-100 to-indigo-100 border rounded-2xl shadow-lg p-8 transition-all transform hover:scale-105 hover:shadow-2xl">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">{data.name}</h1>
        <p className="text-gray-700 mb-6">{data.description}</p>
        <button
          onClick={() => router.push(`/student/classes/${id}/verify`)}
          className="px-6 py-3 bg-indigo-600 text-white rounded-full shadow hover:bg-indigo-700 hover:scale-105 transition-all duration-300"
        >
          Join Class
        </button>
      </div>
    </div>
  );
}