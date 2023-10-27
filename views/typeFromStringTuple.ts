type typeFromStringTuple<Tuple extends readonly string[]> = {
  [K in Tuple[number]]: string;
};

export default typeFromStringTuple;
