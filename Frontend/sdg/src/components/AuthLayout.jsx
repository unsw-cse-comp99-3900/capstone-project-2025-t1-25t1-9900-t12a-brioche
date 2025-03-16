import React from "react";

const AuthLayout = ({ children }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-md p-6 rounded-md">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
