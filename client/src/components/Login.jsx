import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/styles/auth.css";
import "../assets/styles/loader.css";
import axios from "axios";
import PropTypes from "prop-types";

export default function Login({ setUser }) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const login = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const errorDivs = document.querySelectorAll("label div");
      for (const e of errorDivs) {
        e.classList.add("hidden");
      }
      const res = await axios.post(
        `${import.meta.env.VITE_API_ROUTE}/api/users/login`,
        { email, password }
      );
      setUser(res.data);
      localStorage.setItem("userToken", JSON.stringify(res.data));

      setLoading(false);
      navigate("/chat");
    } catch (error) {
      const errorDiv = document.querySelector(
        `label[for=${error.response.data.type}] div`
      );
      errorDiv.classList.remove("hidden");
    }
  };

  return (
    <div className="overlay">
      <div className="auth flex-col gap-16 align-center absolute-center">
        <h2>Welcome back!</h2>
        <form onSubmit={login} className="flex-col gap-16">
          <div className="input flex-col gap-4">
            <label htmlFor="email" className="required flex gap-4">
              Email <div className="hidden error"> - already in use</div>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
            />
          </div>
          <div className="input flex-col gap-4">
            <label htmlFor="password" className="required flex gap-4">
              Password <div className="hidden error"> - does not match</div>
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="btn-submit flex justify-center align-center"
          >
            {!loading ? "Log In" : <div className="spinner"></div>}
          </button>
        </form>
        <div className="auth-redirect">
          Already have an account?{" "}
          <Link to="/signup" className="auth-redirect">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}

Login.propTypes = {
  setUser: PropTypes.func,
};
