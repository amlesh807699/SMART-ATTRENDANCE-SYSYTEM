import React from "react";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-6">
      
      {/* Header */}
      <h1 className="text-4xl font-bold text-blue-600 mb-4">
        Smart Attendance System
      </h1>
      <p className="text-gray-600 text-center max-w-xl mb-10">
        A secure and intelligent attendance system where teachers can create
        classes and track attendance. Students can join classes only after
        successful face verification.
      </p>

      {/* Actions */}
      <div className="grid md:grid-cols-2 gap-6 w-full max-w-3xl">
        
        {/* Teacher Card */}
        <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition">
          <h2 className="text-2xl font-semibold mb-3 text-gray-800">
            Teacher Panel
          </h2>
          <p className="text-gray-500 mb-4">
            Create and manage classes, and monitor student attendance in
            real-time.
          </p>
          <button className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700">
            Create Class
          </button>
        </div>

        {/* Student Card */}
        <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition">
          <h2 className="text-2xl font-semibold mb-3 text-gray-800">
            Student Panel
          </h2>
          <p className="text-gray-500 mb-4">
            Join your class securely with face verification and mark your
            attendance instantly.
          </p>
          <button className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700">
            Join Class
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div className="mt-16 max-w-4xl text-center">
        <h3 className="text-2xl font-bold mb-6 text-gray-800">
          Key Features
        </h3>
        <ul className="grid md:grid-cols-3 gap-6 text-gray-600">
          <li className="bg-white p-4 rounded-xl shadow">
            Face Recognition Authentication
          </li>
          <li className="bg-white p-4 rounded-xl shadow">
            Real-time Attendance Tracking
          </li>
          <li className="bg-white p-4 rounded-xl shadow">
            Secure & Tamper-Proof System
          </li>
        </ul>
      </div>

    </div>
  );
};

export default HomePage;