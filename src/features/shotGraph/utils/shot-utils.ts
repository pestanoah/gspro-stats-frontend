export const TickFormatter = (value: number) => {
  return value < 0 ? `${value * -1}L` : `${value}R`;
};

export const DirectionFormatter = (value: number, units = '') => {
  return value < 0 ? `${value * -1}${units}L` : `${value}${units}R`;
};
