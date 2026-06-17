import React, { useState } from "react";
import "./Home.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { LOGIN_URL, BASE_URL } from "../../utils/apiConstant";
import klelogo from "../../assets/logo.png";
import heroImg from "../../assets/photo.jpg";
import koreImg from "../../assets/kore.jpg";
import antonioImg from "../../assets/antonio-manuel-carvalho.webp";

const leaders = [
  { name: "Dr. Prabhakar Kore", role: "Founder & Chairman", img: koreImg },
  { name: "Navin N", role: "Chief Operating Officer", img: "" },
  { name: "Dr. Antonio Manuel Carvalho", role: "MBBS, MD Psychiatry", img: antonioImg },
];

function Home() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotLoading, setForgotLoading] = useState(false);

  // Check if user is already logged in
  const isAdmin = !!localStorage.getItem("auth");
  const isFaculty = !!localStorage.getItem("facultyAuth");
  const isLoggedIn = isAdmin || isFaculty;

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) { toast.error("Please enter email and password."); return; }
    setLoading(true);
    try {
      const res = await axios.post(LOGIN_URL, { email, password });
      if (res.data.data.role === "admin") {
        localStorage.setItem("auth", res.data.data.token);
        localStorage.setItem("role", "admin");
        navigate("/admin/home");
      } else {
        localStorage.setItem("facultyAuth", res.data.data.token);
        localStorage.setItem("role", res.data.data.role); // "faculty" or "nurse"
        navigate("/faculty");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed. Check your credentials.");
    }
    setLoading(false);
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!forgotEmail) { toast.error("Please enter your email."); return; }
    setForgotLoading(true);
    try {
      await axios.post(`${BASE_URL}/api/user/sendresetlink`, { email: forgotEmail });
      toast.success("Password reset link sent to your email.");
      setShowForgot(false);
      setForgotEmail("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send reset link.");
    }
    setForgotLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("facultyAuth");
    localStorage.removeItem("role");
    window.location.reload();
  };

  return (
    <div className="kle-home">
      {/* Header */}
      <header className="kle-header">
        <div className="kle-header__inner">
          <img src={klelogo} alt="KLE Logo" className="kle-header__logo" />
          <span className="kle-header__title">KLE Centenary Charitable Hospital, Yellur Road</span>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="kle-hero">
          <img src={heroImg} alt="KLE Hospital" className="kle-hero__bg" />
          <div className="kle-hero__overlay" />
          <div className="kle-hero__content">
            <div className="kle-hero__text">
              <h1>Parivarthana Rehabilitation &amp; De-addiction Unit</h1>
            </div>

            {/* Logged-in card OR Login form */}
            {isLoggedIn ? (
              <div className="kle-login-card">
                <div className="kle-login-card__header">
                  <i className="bx bx-lock-alt kle-login-card__icon"></i>
                  <div>
                    <h2>Welcome back</h2>
                    <p className="kle-login-card__sub">You are already signed in.</p>
                  </div>
                </div>
                <button className="kle-signin-btn" onClick={() => navigate(isAdmin ? "/admin/home" : "/faculty")}>
                  <i className="bx bx-grid-alt" style={{ marginRight: "8px" }} />
                  Return to Dashboard
                </button>
                <button className="kle-logout-link" onClick={handleLogout}>Sign out</button>
              </div>
            ) : (
              <div className="kle-login-card">
                <div className="kle-login-card__header">
                  <i className="bx bx-lock-alt kle-login-card__icon"></i>
                  <div>
                    <h2>Welcome back</h2>
                    <p className="kle-login-card__sub">Sign in to Parivarthana portal</p>
                  </div>
                </div>
                <form onSubmit={handleLogin}>
                  <div className="kle-field">
                    <label>Email or user ID</label>
                    <div className="kle-field__input-wrap">
                      <i className="bx bx-envelope kle-field__icon"></i>
                      <input
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="kle-field">
                    <label>Password</label>
                    <div className="kle-field__input-wrap">
                      <i className="bx bx-lock kle-field__icon"></i>
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <button type="button" className="kle-eye-btn" onClick={() => setShowPassword(!showPassword)}>
                        <i className={`bx ${showPassword ? "bx-show" : "bx-hide"}`} />
                      </button>
                    </div>
                  </div>
                  <div className="kle-field-row">
                    <label className="kle-remember">
                      <input type="checkbox" />
                      <span>Remember me</span>
                    </label>
                    <button type="button" className="kle-forgot-btn" onClick={() => setShowForgot(true)}>
                      Forgot password?
                    </button>
                  </div>
                  <button type="submit" className="kle-signin-btn" disabled={loading}>
                    {loading ? "Signing in..." : "Sign in"}
                  </button>
                  <p className="kle-secure-note">
                    <i className="bx bx-shield-quarter"></i> Your data is encrypted and secure
                  </p>
                </form>
              </div>
            )}
          </div>
        </section>

        {/* Leadership */}
        <section className="kle-leadership">
          <h2>Our Leadership</h2>
          <div className="kle-leadership__grid">
            {leaders.map((l) => (
              <div key={l.name} className="kle-leader-card">
                <div className="kle-leader-card__img-wrap">
                  {l.img ? (
                    <img src={l.img} alt={l.name} />
                  ) : (
                    <div className="kle-leader-card__placeholder">
                      <i className="bi bi-person-fill" />
                    </div>
                  )}
                </div>
                <h3>{l.name}</h3>
                <p>{l.role}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="kle-footer">
        Copyright &copy; 2025 All Rights Reserved by KLE Society
      </footer>

      {/* Forgot Password Modal */}
      {showForgot && (
        <div className="kle-modal-backdrop" onClick={() => setShowForgot(false)}>
          <div className="kle-modal" onClick={(e) => e.stopPropagation()}>
            <div className="kle-modal__header">
              <h3>Forgot Password</h3>
              <button className="kle-modal__close" onClick={() => setShowForgot(false)}>
                <i className="bx bx-x" />
              </button>
            </div>
            <p className="kle-modal__desc">Enter your registered email address and we'll send you a password reset link.</p>
            <form onSubmit={handleForgotPassword}>
              <div className="kle-modal__field">
                <label>Email Address</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="kle-modal__btn" disabled={forgotLoading}>
                {forgotLoading ? "Sending..." : "Send Reset Link"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
