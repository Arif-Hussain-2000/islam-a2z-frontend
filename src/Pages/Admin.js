import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Admin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
          body: JSON.stringify({ email, password }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        console.log(data.message || "Login failed");
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
        },
      );

      const meData = await meResponse.json();

      console.log("Admin verification:", meData);

      if (meResponse.ok) {
        setTimeout(() => {
          navigate("/admin/dashboard");
        }, 3000);
      } else {
        sessionStorage.removeItem("adminToken");
        console.log(meData.message || "Admin verification failed");
      }
    } catch (error) {
      console.log("Login error:", error);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#385d50] md:flex-row">
      {/* Left Branding Section */}

      <div className="flex min-h-[220px] w-full items-center justify-center bg-[#385d50] px-6 py-12 text-center md:min-h-screen md:w-1/2">
        <div>
          <h1 className="text-3xl font-bold tracking-wide text-white md:text-4xl">
            Welcome Back! Admin
          </h1>
          <p className="mt-5 text-bold text-white font-bold">Sign in to manage and maintain the Islam A2Z platform.</p>
        </div>
      </div>

      {/* Right Login Section */}

      <div className="flex min-h-[calc(100vh-220px)] w-full flex-1 items-center justify-center rounded-t-[50px] bg-[#f5f5f5] px-6 py-12 md:min-h-screen md:w-1/2 md:flex-none md:rounded-[100px] md:rounded-t-none md:px-12">
        <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-md sm:p-8">
          <h2 className="mb-8 text-center text-2xl font-semibold text-[#385d50]">
            Login
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}

            <div>
              <label className="mb-2 block text-sm font-medium text-[#385d50]">
                Email
              </label>

              <div className="relative">
                <i className="bi bi-envelope absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email"
                  className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-3 outline-none transition focus:border-[#385d50] focus:ring-1 focus:ring-[#385d50]"
                  required
                />
              </div>
            </div>

            {/* Password */}

            <div>
              <label className="mb-2 block text-sm font-medium text-[#385d50]">
                Password
              </label>

              <div className="relative">
                <i className="bi bi-lock absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>

                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-3 outline-none transition focus:border-[#385d50] focus:ring-1 focus:ring-[#385d50]"
                  required
                />
              </div>
            </div>

            {/* Login Button */}

            <button
              type="submit"
              className="w-full rounded-lg bg-[#385d50] p-3 font-medium text-white transition duration-300 hover:bg-[#2d4b40]"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
