"use client";

import { ClipLoader } from "react-spinners";

export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-20">
      <ClipLoader color="#f97316" size={50} />
    </div>
  );
}