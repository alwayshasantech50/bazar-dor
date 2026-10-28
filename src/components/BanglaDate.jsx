"use client";

import { useEffect, useState } from "react";

const BanglaDate = () => {
  const [date, setDate] = useState("");

  useEffect(() => {
    const today = new Date().toLocaleDateString("bn-BD", {
      timeZone: "Asia/Dhaka",
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    setDate(today);
  }, []);

  return (
    <p className="mt-1 min-h-4 text-xs text-gray-500">
      {date || "তারিখ লোড হচ্ছে..."}
    </p>
  );
};

export default BanglaDate;