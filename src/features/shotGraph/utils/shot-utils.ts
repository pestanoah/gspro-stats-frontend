export const TickFormatter = (value: number) => {
  return value < 0 ? `${value * -1}L` : `${value}R`
}
