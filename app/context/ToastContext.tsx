"use client";
import { Toaster } from "react-hot-toast";

export default function ToasterContext() {
  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      gutter={8}
      containerClassName=""
      containerStyle={{}}
      toastOptions={{
        // Define default options
        className: "",
        duration: 4000,
        style: {
          background: "#363636",
          color: "#fff",
        },
        // Default options for specific types
        success: {
          duration: 3000,
          style: {
            background: "green",
          },
        },
      }}
    />
  );
}
