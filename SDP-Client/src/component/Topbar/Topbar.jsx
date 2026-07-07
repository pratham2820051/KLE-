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

    // Hide Topbar on login page, public landing page, admin pages, and faculty/counsellor dashboard
    if (location.pathname === '/login' || location.pathname === '/' || location.pathname.startsWith('/admin') || location.pathname.endsWith('/login') || location.pathname === '/faculty') {
        return null
    }

    const languages = [
        { code: 'en', name: 'English' },
        { code: 'kn', name: 'ಕನ್ನಡ' },
        { code: 'hi', name: 'हिन्दी' }
    ]

    const getCurrentLanguage = () => {
        return languages.find(lang => lang.code === language) || languages[0]
    }

    const currentLang = getCurrentLanguage()

    return (
        <div className='topbar'>
            <div className="dropdown">
                <button className="btn btn-register dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className='bx bx-world' style={{ marginRight: '6px' }}></i> {currentLang.name}
                </button>
                <ul className="dropdown-menu">
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
    )
}

export default Topbar