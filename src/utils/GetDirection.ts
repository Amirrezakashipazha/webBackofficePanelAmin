function getDirection(lang:string) {
    const rtlLanguages = ['ar', 'fa', 'he']; // Add more RTL languages if needed
    return rtlLanguages.includes(lang) ? 'rtl' : 'ltr';
  }
  export default getDirection