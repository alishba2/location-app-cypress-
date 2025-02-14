"use client";

export default function Navbar() {
  return (
    <nav className="w-full flex items-center justify-between px-6 py-4 bg-white shadow-md">
      <h1 className="text-2xl font-bold">ENATEGA</h1>
      <div className="flex items-center gap-4">
        <button className="text-gray-700">Berlin, Germany ⌄</button>
        <button className="px-4 py-2 border rounded-md">Login</button>
        <button className="px-4 py-2 bg-green-600 text-white rounded-md">Sign up</button>
      </div>
    </nav>
  );
}
