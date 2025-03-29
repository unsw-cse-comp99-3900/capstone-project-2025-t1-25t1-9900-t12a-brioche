import React from "react";
import { Link } from "react-router-dom";

const MainPage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-500 text-white p-4 flex justify-between">
        <h1 className="text-2xl font-bold">SDG Knowledge System</h1>
        <Link to="/login" className="bg-red-500 px-4 py-2 rounded">Log out</Link>
      </header>

      <div className="p-6 text-center">
        <h2 className="text-3xl font-bold mb-4">Keyword Search</h2>
        <input className="p-2 border rounded w-1/2" placeholder="Enter keyword..." />
        <button className="bg-gray-500 text-white px-4 py-2 rounded ml-2">Search</button>
      </div>

      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold mb-4">SDG Goals</h2>
        <div className="grid grid-cols-4 gap-4">
          {[...Array(17)].map((_, i) => (
            <div key={i} className="bg-blue-200 p-4 rounded">
              Goal {i + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
