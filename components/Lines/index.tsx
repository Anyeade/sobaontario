"use client";
import React, { useEffect, useState } from "react";

const Lines = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="fixed left-0 top-0 -z-20 flex h-full w-full items-center justify-around">
      <span 
        className="flex h-full w-[1px] bg-stroke dark:bg-strokedark"
        style={{ animation: 'line 3s linear infinite' }}
      ></span>
      <span 
        className="flex h-full w-[1px] bg-stroke dark:bg-strokedark"
        style={{ animation: 'line 6s linear infinite' }}
      ></span>
      <span 
        className="flex h-full w-[1px] bg-stroke dark:bg-strokedark"
        style={{ animation: 'line 9s linear infinite' }}
      ></span>
    </div>
  );
};

export default Lines;
