type typeFromStringTuple<Tuple extends string[]> = {
  [K in Tuple[number]]: string;
};

export default typeFromStringTuple;
