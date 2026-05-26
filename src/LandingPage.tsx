import { useState } from 'react'
import './LandingPage.css'

interface LandingPageProps {
  onGetStarted?: () => void
}

function LandingPage({ onGetStarted }: LandingPageProps) {
  const [language, setLanguage] = useState<'en' | 'ar'>('en')

  const handleGetStarted = () => {
    if (onGetStarted) {
      onGetStarted()
    }
  }

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en')
  }

  const content = {
    en: {
      title: 'Case & Dispute Management System',
      description: 'Lorem ipsum dolor sit amet consectetur adipisis\nelit sedgeet sem metused nulla magna',
      buttonText: 'Get Started'
    },
    ar: {
      title: 'نظام إدارة القضايا والنزاعات',
      description: 'لوريم إيبسوم دولور سيت أميت كونسيكتيتور أديبيسي\nإيليت سيدجيت سيم ميتوسيد نولا ماجنا',
      buttonText: 'البدء'
    }
  }

  const text = content[language]

  return (
    <div className="landing-page">
      <div className="landing-container">
        <div className="landing-card">
          {/* Logo Section */}
          <div className="logo-section">
            <img src="/dewa-logo.png" alt="DEWA Logo" className="logo-image" />
          </div>

          {/* Content Section */}
          <div className="content-section">
            <h1 className="title">{text.title}</h1>
            <p className="description">{text.description}</p>

            {/* Buttons */}
            <div className="buttons-section">
              <button className="btn-primary" onClick={handleGetStarted}>
                <span className="btn-icon">➤</span>
                {text.buttonText}
              </button>

              <button className="btn-language" onClick={toggleLanguage}>
                <img src="/language-btn.png" alt="Language" className="language-image" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LandingPage
