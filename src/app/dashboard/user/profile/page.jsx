"use client";

import { useState } from "react";

export default function ProfilePage() {
  const [user, setUser] = useState({
    name: "Al Mahmud Zihad",
    email: "zihad@gmail.com",
    image:
      "https://i.ibb.co/4pDNDk1/avatar.png",
  });

  const [formData, setFormData] = useState(user);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async () => {
    try {
      // এখানে API call যাবে
      console.log("Updated Data:", formData);

      alert("Profile updated successfully!");
      setUser(formData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          My Profile
        </h1>

        <p className="text-gray-500 mt-2">
          Update your personal information
        </p>
      </div>

      {/* Profile Card */}
      <div className="bg-white dark:bg-slate-900 border rounded-2xl p-6 shadow-sm">

        {/* Image */}
        <div className="flex flex-col items-center mb-6">
          <img
            src={formData.image}
            alt="Profile"
            className="w-28 h-28 rounded-full object-cover border-4 border-orange-400"
          />
        </div>

        {/* Form */}
        <div className="space-y-4">

          {/* Name */}
          <div>
            <label className="text-sm text-gray-500">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full mt-1 p-3 border rounded-xl dark:bg-slate-800"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm text-gray-500">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              disabled
              className="w-full mt-1 p-3 border rounded-xl bg-gray-100 dark:bg-slate-800 cursor-not-allowed"
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="text-sm text-gray-500">
              Profile Image URL
            </label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="w-full mt-1 p-3 border rounded-xl dark:bg-slate-800"
            />
          </div>

          {/* Button */}
          <button
            onClick={handleUpdate}
            className="w-full mt-4 bg-orange-500 text-white py-3 rounded-xl font-medium hover:bg-orange-600 transition"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}