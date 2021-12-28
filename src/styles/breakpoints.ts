interface ISize {
  xs: string | number;
  sm: string | number;
  md: string | number;
  lg: string | number;
}

const size: ISize = {
  xs: 567,
  sm: 768,
  md: 997,
  lg: 1200,
};

const device: ISize = Object.entries(size).reduce(
  (prev, [key, value]) => ({ ...prev, [key]: `(min-width: ${value}px)` }),
  size,
);

export default device;
