import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.scss";
import axios from "axios";
import { LOGIN_URL } from "../../utils/apiConstant";
import toast from "react-hot-toast";
import Loader from "../../component/Loader/Loader";
import { useLanguage } from "../../context/LanguageContext";
import { t } from "../../translations";
import hospitalImg from "../../assets/parivartan-hospital.png";
import english from "../../assets/english.jpeg";
import kannada from "../../assets/kannada.jpeg";
import hindi from "../../assets/hindi.jpeg";
import klesLogo from "../../assets/kles-logo.png";


function AdminLogin() {
  const { language, changeLanguage } = useLanguage();
  const [passwordShown, setPasswordShown] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'kn', name: 'ಕನ್ನಡ' },
    { code: 'hi', name: 'हिन्दी' }
  ];

  const currentLang = languages.find(lang => lang.code === language) || languages[0];

  const SignIn = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error(t('fieldRequired', language));
      return;
    }

    const obj = {
      email: email,
      password: password,
    };

    setLoading(true);

    await axios
      .post(LOGIN_URL, obj)
      .then((res) => {
        console.log(res);   
        if (res.data.data.role === 'admin') {
          localStorage.setItem("auth", res.data.data.token);
          navigate("/admin/home");
        } else {
          localStorage.setItem("facultyAuth", res.data.data.token);
          navigate("/faculty");
        }
      })
      .catch((err) => {
        const errorMessage = err.response?.data?.message || t('loginFailed', language);
        toast.error(errorMessage);
      });

    setLoading(false);
  };

  return (
    <div className="admin_login">
      {loading ? <Loader /> : null}
      
      {/* Floating Language Dropdown */}
      <div className="floating_language">
        <div className="dropdown">
          <button className="btn btn-lang dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            <i className='bx bx-world' style={{ marginRight: '6px' }}></i> {currentLang.name}
          </button>
          <ul className="dropdown-menu dropdown-menu-end">
            {languages.map((lang) => (
              <li key={lang.code}>
                <button
                  type="button"
                  className={`dropdown-item ${language === lang.code ? 'active' : ''}`}
                  onClick={() => changeLanguage(lang.code)}
                >
                  <span className="align-middle">{lang.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="login_container">
        
        {/* Left Side Info Pane */}
        <div className="left_pane" style={{ backgroundImage: `url(${hospitalImg})` }}>
          <div className="overlay"></div>
          <div className="pane_content">
            <img src={klesLogo} alt="KLES Logo" style={{ height: "60px", width: "auto", marginBottom: "15px", filter: "brightness(0) invert(1)" }} />
            <h3 className="brand_subtitle" style={{ fontSize: "1.25rem", lineHeight: "1.4", margin: "10px 0" }}>
              Rehabilitation &amp; De-addiction Unit<br />
              <span style={{ fontSize: "0.9rem", fontWeight: "400", opacity: 0.9 }}>KLE Centenary Charitable Hospital, Belagavi</span>
            </h3>
          </div>
        </div>

        {/* Right Side Form Pane */}
        <div className="right_pane">
          <div className="form_card">
            <h2 className="content_heading">{t('login', language)}</h2>
            <p className="form_subheading">Welcome back! Please enter your credentials to log in.</p>
            
            <form onSubmit={SignIn}>
              {/* Email Input */}
              <div className="input_section">
                <div className="input_icon">
                  <i className="bx bx-envelope"></i>
                </div>
                <div className="form-floating">
                  <input
                    type="email"
                    className="form-control"
                    id="LoginEmail"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    required
                  />
                  <label htmlFor="LoginEmail">{t('email', language)}</label>
                </div>
              </div>

              {/* Password Input */}
              <div className="input_section">
                <div className="input_icon">
                  <i className="bx bx-lock-alt"></i>
                </div>
                <div className="form-floating">
                  <input
                    type={passwordShown ? "text" : "password"}
                    className="form-control"
                    id="LoginPassword"
                    placeholder="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    required
                  />
                  <label htmlFor="LoginPassword">{t('password', language)}</label>
                </div>
                <div
                  className="input_icon eye_toggle"
                  onClick={() => setPasswordShown(!passwordShown)}
                >
                  <i className={`bx ${passwordShown ? "bx-show" : "bx-hide"}`}></i>
                </div>
              </div>

              <button type="submit" className="form_button">
                {t('signIn', language)}
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}

export default AdminLogin;
