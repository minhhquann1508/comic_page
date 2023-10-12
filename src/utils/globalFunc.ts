import numeral from 'numeral'
export const limitCharacters = (text:string,limit:number) => {
    if(text.length > limit) {
        return `${text.substring(0,limit)}...`
    } else {
        return text;
    }
}

export const changeNumberFormat = (number:number) => {
    if (number >= 1000) {
        return numeral(number / 1000).format('0.0a') + 'K';
    }
    if(number >= 1000000) {
        return numeral(number / 1000).format('0.0a') + 'M';
    }
    return numeral(number).format('0');
}

export const changeColorStatus = (status:string):string => {
    if(status.toLocaleLowerCase() === 'ongoing') {
        return 'bg-orange-400';
    }
    if(status.toLocaleLowerCase() === 'completed') {
        return 'bg-green-500';
    }
    else {
        return 'bg-red-500'
    }
}