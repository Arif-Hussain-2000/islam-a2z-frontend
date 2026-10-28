
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Toast } from "../Components/Toast";
  
export const Admin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [toast, setToast] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/auth/login`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email: email,
            password: password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setToast({
          message: data.message || "Login failed",
          type: "error",
        });
        return;
      }

      const Token = data.token;

      sessionStorage.setItem("adminToken", Token);

      const meResponse = await fetch(
        `${process.env.REACT_APP_API_URL}/api/auth/me`,
        {
          method: "GET",

          headers: {
            Authorization: `Bearer ${Token}`,
          },
        }
      );

      const meData = await meResponse.json();

      console.log("Admin verification:", meData);

      if (meResponse.ok) {
        setToast({
          message: "Login successful",
          type: "success",
        });

        setTimeout(() => {
          navigate("/admin/dashboard");
        }, 3000);
      } else {
        sessionStorage.removeItem("adminToken");

        setToast({
          message: meData.message || "Admin verification failed",
          type: "error",
        });
      }
    } catch (error) {
      console.log("Login error:", error);

      setToast({
        message: "Something went wrong",
        type: "error",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">

        <h1 className="text-2xl font-bold text-center mb-6">
          Admin Login
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="block mb-1">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              className="w-full border p-3 rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block mb-1">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full border p-3 rounded-lg"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-700 text-white p-3 rounded-lg"
          >
            Login
          </button>

        </form>
      </div>
    </div>
  );
};