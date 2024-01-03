type typeFromKeys<Tuple extends readonly string[]> = {
  [K in Tuple[number]]: string;
};

export default typeFromKeys;
