import React from 'react'
import { useNavigate } from 'react-router-dom'; 

import {Button} from "../components/ui/button"

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-red-600">Oops!</h1>
          <p className="mt-3 text-xl font-semibold text-gray-800">
            We can't seem to find the page you're looking for.
          </p>
          <p className="mt-2 text-gray-600 mb-4">Error code: 404</p>
          <Button
            size="sm"
            onClick={() => {
              navigate("/");
            }}
          >
            Return back to Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;