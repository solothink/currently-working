"use client";

import dynamic from "next/dynamic";

export const ToastContainerLazy = dynamic(
  () => import("react-toastify").then((mod) => mod.ToastContainer),
  {
    ssr: false,
  },
);
