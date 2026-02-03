"use client";

import React, {useState} from "react";

export default function Home(){
  const [query, setQuery]= useState("");
  const handleSearch= (e: React.FormEvent) => {
    e.preventDefault();
    alert("The Stylist is looking for: " + query);
  };

  return(
  <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-black text-white">
    <h1 className="text-5xl font-extrabold tracking-tighter mb-4 italic">
      POKEMON<span className="text-blue-500"></span>
    </h1>
    <p className="text-gray-400 mb-10 uppercase tracking-widest text-sm">
      Artificial Intelligence x Fantasy Fashion
    </p>
    <form onSubmit={handleSearch} className="w-full max-w-md flex gap-2">
      <input type="text" value={query} onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter Pokemon Name:  "
            className="flex-1 p-4 bg-transparent border-b-2 border-gray-700 focus:border-blue-500 outline-none text-xl transition-all"/>

      <button type="submit" className="px-8 py-4 bg-blue-600 hover:bg-blue-700 font-bold uppercase">
        Analyze
      </button>
    </form>
  </main>

  );
}

