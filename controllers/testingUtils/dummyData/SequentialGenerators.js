exports.generateSequentialObjectId = (() => {
  let counter = 0;

  function generateId() {
    counter++;
    const counterStr = counter.toString().padStart(24, "0");
    return counterStr;
  }
  return generateId;
})();
