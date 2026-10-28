"use client";

import { useEffect } from "react";
import toast from "react-hot-toast";

const LoginRequiredNotice = () => {
  useEffect(() => {
    const url = new URL(window.location.href);

    if (url.searchParams.get("reason") !== "login-required") {
      return;
    }

    toast.error("এই পেজ দেখতে আগে সাইন ইন করুন।", {
      id: "login-required",
    });

    url.searchParams.delete("reason");

    window.history.replaceState(
      window.history.state,
      "",
      `${url.pathname}${url.search}${url.hash}`
    );
  }, []);

  return null;
};

export default LoginRequiredNotice;