const phone = (value: string) => {
  let numericValue = value.replace(/\D/g, '');
  let formattedValue = '';

  if (!numericValue) {
    return '';
  }

  if (['7', '8', '9'].includes(numericValue[0])) {
    if (numericValue[0] === '9') {
      numericValue = '7' + numericValue;
    }
    const firstSymbols = numericValue[0] === '8' ? '8' : '+7';
    formattedValue = firstSymbols + ' ';

    if (numericValue.length > 1) {
      formattedValue += '(' + numericValue.substring(1, 4);
    }
    if (numericValue.length >= 5) {
      formattedValue += ') ' + numericValue.substring(4, 7);
    }
    if (numericValue.length >= 8) {
      formattedValue += '-' + numericValue.substring(7, 9);
    }
    if (numericValue.length >= 10) {
      formattedValue += '-' + numericValue.substring(9, 11);
    }
  } else {
    formattedValue = '+' + numericValue.substring(0, 16);
  }

  return formattedValue;
};

const mask = {phone};

export default mask;
