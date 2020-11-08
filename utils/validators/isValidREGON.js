import checksum from "~/utils/checksum";

function isValidRegon(message) {
  return (regon) => {
    const reg = /^[0-9]{9,14}$/;
    if (reg.test(regon) === false) {
      return message;
    }

    const weights9 = [8, 9, 2, 3, 4, 5, 6, 7];

    if (regon.length === 9) {
      if (!checksum(regon, weights9)) return message
    }

    const weights14 = [2, 4, 8, 5, 0, 9, 7, 3, 6, 1, 2, 4, 8];
    const result = checksum(regon.slice(0, 9), weights9) && checksum(regon, weights14);

    if (!result) return message
  }
}

export default isValidRegon
