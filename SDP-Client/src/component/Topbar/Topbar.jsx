import React from 'react'
import { useLanguage } from '../../context/LanguageContext'
import { useLocation } from 'react-router-dom'
import "./Topbar.scss"
import kannada from "../../assets/kannada.jpeg"
import hindi from "../../assets/hindi.jpeg"
import english from "../../assets/english.jpeg"

const Topbar = () => {
    const { language, changeLanguage } = useLanguage()
    const location = useLocation()

    // Hide Topbar on login page, public landing page, and admin pages
    if (location.pathname === '/login' || location.pathname === '/' || location.pathname.startsWith('/admin') || location.pathname.endsWith('/login')) {
        return null
    }

    const languages = [
        { code: 'en', name: 'English', flag: '🇺🇸', image: english },
        { code: 'kn', name: 'ಕನ್ನಡ', flag: '🇮🇳', image: kannada },
        { code: 'hi', name: 'हिन्दी', flag: '🇮🇳', image: hindi }
    ]

    const getCurrentLanguage = () => {
        return languages.find(lang => lang.code === language) || languages[0]
    }

    const currentLang = getCurrentLanguage()

    return (
        <div className='topbar'>
            <div className="dropdown">
                <button className="btn btn-register dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className='bx bx-world'></i> {currentLang.flag} {currentLang.name}
                </button>
                <ul className="dropdown-menu">
                    {languages.map((lang) => (
                        <li key={lang.code}>
                            <button
                                type="button"
                                className={`dropdown-item ${language === lang.code ? 'active' : ''}`}
                                onClick={() => changeLanguage(lang.code)}
                            >
                                <img src={lang.image} alt="" style={{ width: '20px', marginRight: '8px' }} />
                                <span className="align-middle">{lang.name}</span>
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Topbar