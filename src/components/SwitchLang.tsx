import React from 'react'
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const SwitchLang = () => {
    const {  i18n } = useTranslation();

    const toggleLanguage = () => {
      const nextLang = i18n.language === 'en' ? 'fa' : 'en';
      i18n.changeLanguage(nextLang);
      localStorage.setItem('i18nextLng', nextLang); 
      document.documentElement.setAttribute('lang', nextLang);
  };


  return (
<Link
        onClick={toggleLanguage}
        className="pb-[6px] relative flex h-8.5 w-8.5 items-center justify-center rounded-full border-[0.5px] border-stroke bg-gray hover:text-primary dark:border-strokedark dark:bg-meta-4 dark:text-white"
        to="#"
      >
       

       {i18n.language==="fa"?"فا":i18n.language}
      </Link>
  )
}

export default SwitchLang