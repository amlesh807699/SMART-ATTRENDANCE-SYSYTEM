"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import gsap from "gsap";

export default function LoginPage() {
  const router = useRouter();
  const cardRef = useRef(null);

  const [rollno, setRollno] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 40, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power3.out" }
    );
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        { rollno, password },
        { withCredentials: true }
      );

      if (res.status === 200) {
        const userRes = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/me`,
          { withCredentials: true }
        );

        const role = userRes.data.role;

        if (role === "TEACHER") router.push("/teacher/dashboard");
        else if (role === "STUDENT") router.push("/student/dashboard");
        else router.push("/dashboard");
      }
    } catch (err) {
      setLoading(false);
      if (err.response) {
        const data = err.response.data;
        setError(typeof data === "string" ? data : data?.message || "Login failed");
      } else if (err.request) {
        setError("No response from server. Try again.");
      } else {
        setError("Something went wrong.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 px-4">
      
      <div
        ref={cardRef}
        className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl p-8 text-white"
      >
        <h1 className="text-3xl font-bold mb-2 text-center">Welcome Back</h1>
        <p className="text-sm text-center text-white/70 mb-6">
          Login to continue
        </p>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-500/20 border border-red-400 text-red-200 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm mb-1 text-white/80">
              Roll Number
            </label>
            <input
              type="text"
              value={rollno}
              onChange={(e) => setRollno(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 transition"
              placeholder="Enter your roll number"
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-white/80">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 transition"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-lg bg-white text-indigo-600 font-semibold hover:bg-white/90 transition active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-white/70">
          Forgot your password?{" "}
          <a
            href="/reset"
            className="text-white font-medium hover:underline"
          >
            Reset here
          </a>
        </div>
      </div>
    </div>
  );
}