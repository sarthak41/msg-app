import { useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/styles/auth.css";
import axios from "axios";

export default function Signup() {
  const navigate = useNavigate();
  const [msg, setMsg] = useState();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const createAcc = async (e) => {
    e.preventDefault();

    try {
      const errorDivs = document.querySelectorAll("label div");
      for (const e of errorDivs) {
        e.classList.add("hidden");
      }
      await axios.post(`${import.meta.env.VITE_API_ROUTE}/users/signup`, {email, username, password});
      navigate("/login");
    } catch (error) {
      const errorDiv = document.querySelector(`label[for=${error.response.data.type}] div`);
      console.log(errorDiv);
      errorDiv.classList.remove("hidden");
    }
  };

  return (
    <div className="overlay">
      <div className="auth flex-col gap-16 align-center absolute-center">
        <h2>Create an account</h2>
        <div>{msg}</div>
        <form onSubmit={createAcc} className="flex-col gap-16">
          <div className="input flex-col gap-4">
            <label htmlFor="email" className="required flex gap-4">Email <div className="hidden error"> - already in use</div></label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setMsg("");
              }}
              required
            />
          </div>
          <div className="input flex-col gap-4">
            <label htmlFor="username" className="required flex gap-4">Username <div className="hidden error"> - username taken</div></label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setMsg("");
              }}
              required
            />
          </div>
          <div className="input flex-col gap-4">
            <label htmlFor="password" className="required flex gap-4">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              minLength={8}
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              required
            />
          </div>
      
          <button type="submit" className="btn-submit">Register</button>
        </form>
        <div className="auth-redirect">Already have an account? <Link to="/login" className="auth-redirect">Log In</Link></div>
      </div>
    </div>
  );
}
