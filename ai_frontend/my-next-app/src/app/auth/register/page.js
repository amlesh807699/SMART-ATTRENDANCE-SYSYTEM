"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function RegisterPage() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  const [form, setForm] = useState({
    rollno: "",
    password: "",
    role: "STUDENT",
  });

  const [msg, setMsg] = useState("");
  const [photoBlob, setPhotoBlob] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🎬 Entry animation
  useEffect(() => {
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 40, scale: 0.96 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power3.out" }
    );
  }, []);

  // 📷 Open camera
  useEffect(() => {
    async function openCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) videoRef.current.srcObject = stream;
      } catch (err) {
        setError("Camera permission denied. Please allow camera access.");
      }
    }
    openCamera();

    return () => {
      // cleanup camera
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // 📸 Capture photo with flash effect
  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video.videoWidth) {
      setError("Camera not ready yet.");
      return;
    }

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0);

    canvas.toBlob((blob) => {
      setPhotoBlob(blob);
      setMsg("Photo captured successfully!");

      gsap.fromTo(
        "#flash",
        { opacity: 0.8 },
        { opacity: 0, duration: 0.5, ease: "power2.out" }
      );
    }, "image/jpeg", 0.95);
  };

  // 📨 Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMsg("");

    if (!photoBlob) {
      setError("Please capture your face before submitting.");
      return;
    }

    const formData = new FormData();
    formData.append(
      "user",
      new Blob([JSON.stringify(form)], { type: "application/json" })
    );
    formData.append("photo", photoBlob, "face.jpg");

    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
        {
          method: "POST",
          body: formData,
          credentials: "include",
        }
      );

      const data = await res.json();

      if (res.ok) {
        setMsg("Registered Successfully 🎉");
      } else {
        setError(data.message || "Registration failed");
      }
    } catch {
      setError("Server error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 px-4">
      
      <div
        ref={containerRef}
        className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl p-6 text-white"
      >
        <h2 className="text-2xl font-bold text-center mb-2">
          AI Face Registration
        </h2>
        <p className="text-center text-sm text-white/70 mb-4">
          Capture your face & create account
        </p>

        {/* Error */}
        {error && (
          <div className="mb-3 p-2 rounded-lg bg-red-500/20 border border-red-400 text-red-200 text-sm">
            {error}
          </div>
        )}

        {/* Success */}
        {msg && (
          <div className="mb-3 p-2 rounded-lg bg-green-500/20 border border-green-400 text-green-200 text-sm">
            {msg}
          </div>
        )}

        {/* Camera */}
        <div className="relative">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full rounded-xl border border-white/20 shadow-md"
          />

          {/* flash effect */}
          <div
            id="flash"
            className="absolute inset-0 bg-white opacity-0 pointer-events-none rounded-xl"
          />
        </div>

        <button
          onClick={capturePhoto}
          className="w-full mt-3 py-2.5 rounded-lg bg-green-500 hover:bg-green-600 transition font-semibold"
        >
          Capture Photo
        </button>

        <canvas ref={canvasRef} className="hidden" />

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <input
            name="rollno"
            placeholder="Roll Number"
            value={form.rollno}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
          />

          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-white/50"
          >
            <option value="STUDENT" className="text-black">Student</option>
            <option value="TEACHER" className="text-black">Teacher</option>
          </select>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-lg bg-white text-indigo-600 font-semibold hover:bg-white/90 transition active:scale-[0.98] disabled:opacity-50"
          >
            {loading ? "Registering..." : "Register Face"}
          </button>
        </form>
      </div>
    </div>
  );
}