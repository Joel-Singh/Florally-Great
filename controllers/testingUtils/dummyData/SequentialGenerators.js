const generateSequentialNumber = (() => {
  let counter = 1;
  return () => counter++;
})();

exports.generateSequentialObjectId = (() => {
  function generateId() {
    const number = generateSequentialNumber();

    const id = number.toString().padStart(24, "0");
    return id;
  }
  return generateId;
})();

exports.generateSequentialNumber = generateSequentialNumber;
