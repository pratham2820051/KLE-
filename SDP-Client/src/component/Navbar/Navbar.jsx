import React, { useState, useEffect } from 'react'
import './Navbar.scss'
import { useNavigate } from "react-router-dom";
import klelogo from "../../assets/logo.png";
import { useLanguage } from "../../context/LanguageContext";
import english from "../../assets/english.jpeg";
import kannada from "../../assets/kannada.jpeg";
import hindi from "../../assets/hindi.jpeg";

function Navbar(props) {
  const navigate = useNavigate();
  const { language, changeLanguage } = useLanguage();

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸', image: english },
    { code: 'kn', name: 'ಕನ್ನಡ', flag: '🇮🇳', image: kannada },
    { code: 'hi', name: 'हिन्दी', flag: '🇮🇳', image: hindi }
  ];

  const currentLang = languages.find(lang => lang.code === language) || languages[0];

  // Live clock
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const dateStr = now.toLocaleDateString("en-IN", { weekday: "short", day: "2-digit", month: "short", year: "numeric" });
  const timeStr = now.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit" });

  const handleSwitchLanguage = (langCode) => {
    // 1. Update internal t() state
    changeLanguage(langCode);

    // 2. Trigger Google Translate widget to translate the entire page
    const tryTranslate = (attempts = 0) => {
      const select = document.querySelector('.goog-te-combo');
      if (select) {
        select.value = langCode;
        select.dispatchEvent(new Event('change'));
      } else if (attempts < 15) {
        setTimeout(() => tryTranslate(attempts + 1), 300);
      }
    };
    tryTranslate();
  };

  const handleLogout = () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("facultyAuth");
    localStorage.removeItem("role");
    navigate("/");
    if (!props.isDashboard) window.location.reload();
  };

  const hasSession = !!localStorage.getItem("auth") || !!localStorage.getItem("facultyAuth");
  const isAdmin = !!localStorage.getItem("auth");

  return (
    <div className={`navbar-div ${props.isDashboard ? 'dashboard-navbar' : ''} ${props.isDashboard && !props.menuOpen ? 'sidebar-closed' : ''}`}>
      {/* Hidden Google Translate element — needed for widget to initialize */}
      <div id="google_translate_element" style={{ display: 'none' }}></div>

      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none", padding: 0 }}>
            <img src={klelogo} alt="KLE Logo" style={{ height: "36px", width: "auto", display: "block" }} />
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {props.isDashboard ? (
              <div className="d-flex align-items-center ms-auto gap-3">
                {/* Live Date & Time */}
                <div style={{ textAlign: "right", lineHeight: 1.3 }}>
                  <div style={{ fontSize: "0.8rem", fontWeight: 600, color: "#003b7a" }}>{dateStr}</div>
                  <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#003b7a", fontVariantNumeric: "tabular-nums" }}>{timeStr}</div>
                </div>

                <button className="btn btn-login-home" type="button" onClick={() => navigate("/")}>
                  <i className='bx bx-home-alt'></i> Home Page
                </button>
                <button className="btn btn-logout-dash" type="button" onClick={handleLogout}>
                  <i className='bx bx-log-out'></i> Logout
                </button>

                {/* Language Switcher */}
                <div className="dropdown">
                  <button className="btn btn-register dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false"
                    style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                    <i className='bx bx-world'></i> {currentLang.flag} {currentLang.name}
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end">
                    {languages.map((lang) => (
                      <li key={lang.code}>
                        <button
                          type="button"
                          className={`dropdown-item ${language === lang.code ? 'active' : ''}`}
                          onClick={() => handleSwitchLanguage(lang.code)}
                          style={{ border: "none", background: "transparent", width: "100%", textAlign: "left" }}
                        >
                          <img src={lang.image} alt="" style={{ width: '20px', marginRight: '8px' }} />
                          <span className="align-middle">{lang.name}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <>
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <a className="nav-link naving active" href="#about" onClick={(e) => e.preventDefault()}>About</a>
                  </li>
                </ul>
                {hasSession ? (
                  <div className="d-flex align-items-center">
                    <button className="btn btn-login-home-landing" type="button"
                      onClick={() => navigate(isAdmin ? "/admin/home" : "/faculty")}>
                      <i className='bx bx-grid-alt'></i> Dashboard
                    </button>
                    <button className="btn btn-logout-landing" type="button" onClick={handleLogout}>
                      <i className='bx bx-log-out'></i> Logout
                    </button>
                  </div>
                ) : (
                  <button className="btn btn-register" type="submit" onClick={() => navigate("/")}>Login</button>
                )}
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
