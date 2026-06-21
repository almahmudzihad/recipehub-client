"use client";

import { useState } from "react";
import { useSession } from "@/lib/auth-client";
import { toast } from "react-toastify";

export default function ProfilePage() {
  const { data: session } = useSession();
  const user = session?.user;

  const [name, setName] = useState(user?.name || "");
  const [image, setImage] = useState(user?.image || "");
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/users/${user.email}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            image,
          }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        toast.success("Profile updated successfully");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">

      <div className="bg-white dark:bg-slate-900 border rounded-3xl p-8 shadow-sm">

        {/* Profile Header */}
        <div className="flex flex-col items-center">

          <img
            src={
              image ||
              "https://i.ibb.co/4pDNDk1/avatar.png"
            }
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-orange-500"
          />

          <h1 className="text-3xl font-bold mt-4">
            {user?.name}
          </h1>

          <p className="text-gray-500">
            {user?.email}
          </p>

          {user?.isPremium && (
            <span className="mt-3 px-4 py-2 rounded-full bg-yellow-100 text-yellow-700 font-medium">
              ⭐ Premium Member
            </span>
          )}

        </div>

        {/* Form */}
        <form
          onSubmit={handleUpdate}
          className="mt-10 space-y-5"
        >

          <div>
            <label className="block mb-2 font-medium">
              Full Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              className="w-full px-4 py-3 border rounded-xl"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Profile Image URL
            </label>

            <input
              type="text"
              value={image}
              onChange={(e) =>
                setImage(e.target.value)
              }
              className="w-full px-4 py-3 border rounded-xl"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Email
            </label>

            <input
              type="email"
              value={user?.email || ""}
              disabled
              className="w-full px-4 py-3 border rounded-xl bg-gray-100"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-orange-500 text-white font-semibold"
          >
            {loading
              ? "Updating..."
              : "Save Changes"}
          </button>

        </form>

      </div>
    </div>
  );
}