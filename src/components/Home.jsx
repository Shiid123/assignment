import React, { createContext, useContext, useState } from 'react';
import { Link } from "react-router-dom";

// Create a context for managing language
const LanguageContext = createContext();

// Create a provider component to provide language data
export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState("English");

    return (
        <LanguageContext.Provider value={{ language, setLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};

// Create a custom hook to use language context
export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
};

const Home = () => {
    const { language, setLanguage } = useLanguage();

    const handleLanguageChange = (language) => {
        setLanguage(language);
    };

    return (
        <div style={{backgroundImage: "linear-gradient(#00d5ff,#0095ff,rgba(93,0,255,.555))"}} className="d-flex flex-column justify-content-center align-items-center text-center vh-100">
            <header>
                <div>
                    <h1>My Website</h1>
                 </div>
                 <nav>
                  <ul className="d-flex list-unstyled m-0">
                        <li className="mx-3"><Link to="/">Home</Link></li>
                         <li className="mx-3"><Link to="/status">Status</Link></li>
                         <li className="mx-3"><Link to="/career">Career</Link></li>
                         <li className="mx-3"><Link to="/blog">Blog</Link></li>
                         <li className="mx-3 text-center">
                <select 
                    className="form-select" 
                    value={language} 
                    onChange={(e) => handleLanguageChange(e.target.value)}
                >
                    <option value="English">English</option>
                    <option value="Hindi">Hindi</option>
                    <option value="Odia">Odia</option>
                </select>
            </li>
                    </ul>
                </nav>
            </header>
            {/* Main Content */}

            <div className="flex-grow-1">
                <h1>{language === 'English' ? 'Login Success Page' : language === 'Hindi' ? 'लॉगिन सफल पृष्ठ' : 'ଲଗଇନ ସଫଳ ପୃଷ୍ଠା'}</h1>
                <Link to='/login' className="btn btn-light my-5">{language === 'English' ? 'Logout' : language === 'Hindi' ? 'लॉगआउट' : 'ଲଗଆଉଟ'}</Link>
            </div>
        </div>
    );
};

const App = () => {
    return (
        <LanguageProvider>
            <Home />
        </LanguageProvider>
    );
};

export default App;
