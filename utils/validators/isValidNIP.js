function isValidNip(message) {
  return (nip) => {
    if (!nip) return true;

    if(typeof nip !== 'string')
      return message;

    // eslint-disable-next-line no-useless-escape
    nip = nip.replace(/[\ \-]/gi, '');

    let weight = [6, 5, 7, 2, 3, 4, 5, 6, 7];
    let sum = 0;
    let controlNumber = parseInt(nip.substring(9, 10));
    let weightCount = weight.length;
    for (let i = 0; i < weightCount; i++) {
      sum += (parseInt(nip.substr(i, 1)) * weight[i]);
    }

    const result = sum % 11 === controlNumber;
    if (!result) return message;
  }
}

export default isValidNip
