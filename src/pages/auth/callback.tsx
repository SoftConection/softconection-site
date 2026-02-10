import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const GoogleCallback: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Placeholder for processing OAuth callback if using server flow
    navigate("/dashboard");
  }, [navigate]);

  return <div>Processing login...</div>;
};

export default GoogleCallback;
