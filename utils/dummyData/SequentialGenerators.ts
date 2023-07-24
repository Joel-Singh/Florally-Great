const generateSequentialNumber: () => number = (() => {
  let counter = 1;
  return () => counter++;
})();

const generateSequentialObjectId: () => string = (() => {
  function generateId() {
    const number = generateSequentialNumber();

    const id = number.toString().padStart(24, "0");
    return id;
  }
  return generateId;
})();

export { generateSequentialNumber, generateSequentialObjectId };
