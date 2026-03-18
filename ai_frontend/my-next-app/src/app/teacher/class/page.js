"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const TeacherClassesPage = () => {
  const router = useRouter();

  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [meetingUrl, setMeetingUrl] = useState("");
  const [status, setStatus] = useState("ONGOING");
  const [creating, setCreating] = useState(false);

  
  const fetchClasses = async () => {
    setError("");
    setLoading(true);
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/teacher/all/class`,
        { withCredentials: true }
      );
      setClasses(res.data);
    } catch (err) {
      console.error("Fetch classes failed:", err);
      setError(" Unable to fetch classes. Try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);


  const handleCreateClass = async () => {
    if (!name.trim()) {
      alert("Class name is required");
      return;
    }

    setCreating(true);
    setError("");

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/teacher/create/class`,
        { name, meetingUrl, status },
        { withCredentials: true }
      );

      setName("");
      setMeetingUrl("");
      setStatus("ONGOING");

      await fetchClasses(); 
    } catch (err) {
      console.error("Create class failed:", err);
      setError(" Failed to create class");
    } finally {
      setCreating(false);
    }
  };

  
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this class?")) return;

    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/teacher/${id}`,
        { withCredentials: true }
      );
      setClasses(classes.filter((c) => c.id !== id));
    } catch (err) {
      console.error("Delete class failed:", err);
      setError("Failed to delete class");
    }
  };

  if (loading) return <div className="text-center mt-20">Loading classes...</div>;

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-bold mb-4">📘 My Classes</h2>

      {error && (
        <div className="bg-red-100 text-red-700 p-2 rounded mb-4">
          {error}
        </div>
      )}

  
      <div className="border p-4 rounded shadow-sm">
        <h3 className="font-semibold mb-2">Create Class</h3>

        <input
          placeholder="Class name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 w-full mb-2 rounded"
        />

        <input
          placeholder="Meeting URL"
          value={meetingUrl}
          onChange={(e) => setMeetingUrl(e.target.value)}
          className="border p-2 w-full mb-2 rounded"
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border p-2 w-full mb-2 rounded"
        >
          <option value="ONGOING">ONGOING</option>
          <option value="FINISHED">FINISHED</option>
        </select>

        <button
          onClick={handleCreateClass}
          disabled={creating}
          className={`w-full py-2 rounded text-white ${
            creating ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          } transition`}
        >
          {creating ? "Creating..." : "Create Class"}
        </button>
      </div>

  
      {classes.length === 0 && <p>No classes available.</p>}

      {classes.map((cls) => (
        <div
          key={cls.id}
          className="border p-4 rounded shadow-sm flex justify-between items-center"
        >
          <div>
            <h4 className="font-semibold">{cls.name}</h4>
            <p>Status: {cls.status}</p>
          </div>

          <div className="space-x-2">
            <button
              onClick={() => handleDelete(cls.id)}
              className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
            >
              Delete
            </button>
            <button
              onClick={() => router.push(`/teacher/class/${cls.id}`)}
              className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
            >
              Attendance
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TeacherClassesPage;
