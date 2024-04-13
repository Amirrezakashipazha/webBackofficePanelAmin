function convertNumberFormat(num:number, language:string) {
    if(num===undefined) return
    const numStr = num.toString();
    const englishNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

    if (language === 'fa') {
        return numStr.replace(/\d/g, function(x) {
            return persianNumbers[englishNumbers.indexOf(x)];
        });
    }
    return numStr;
}



export default convertNumberFormat