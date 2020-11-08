function checksum (number, weights) {
  const max = number.length - 1;
  let sum = 0;

  for (let i = 0; i < max; i++) {
    const n = parseInt(number[i], 10);
    sum += n * weights[i];
  }

  const resultSum = sum % 11 !== 10 ? sum % 11 : 0;

  const lastDigit = parseInt(number.slice(-1), 10);

  return resultSum === lastDigit;
}

export default checksum
