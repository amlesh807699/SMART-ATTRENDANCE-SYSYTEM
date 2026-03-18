"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";

const ClassAttendancePage = () => {
  const { id } = useParams();
  const router = useRouter();

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  
  useEffect(() => {
    if (!id) return;

    setLoading(true);
    setError("");

    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/teacher/attendance/class/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setStudents(res.data || []);
        console.log("Attendance data:", res.data);
      })
      .catch((err) => {
        console.error("Fetch attendance failed:", err);
        setError("Unable to fetch attendance. Try again.");
      })
      .finally(() => setLoading(false));
  }, [id]);


  if (loading) return <div className="mt-20 text-center">Loading attendance...</div>;
  if (error) return <div className="mt-20 text-center text-red-600">{error}</div>;
  if (students.length === 0)
    return (
      <div className="mt-20 text-center">
        No students joined this class yet.
        <br />
        <button
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={() => router.back()}
        >
          ⬅ Back
        </button>
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">📊 Class Attendance</h1>

      <button
        className="mb-4 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        onClick={() => router.back()}
      >
        ⬅ Back
      </button>

      <table className="w-full border-collapse border border-gray-400">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-400 px-4 py-2">#</th>
            <th className="border border-gray-400 px-4 py-2">Roll No</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={student.id} className="text-center">
              <td className="border border-gray-400 px-4 py-2">{index + 1}</td>
              <td className="border border-gray-400 px-4 py-2">{student.rollno}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClassAttendancePage;
