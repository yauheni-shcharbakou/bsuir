import { OpacibleColor, OpacibleColorParams } from '../abstractions/common';

const ACCENT_COLORS: OpacibleColor[] = [
  { r: 66, g: 165, b: 246 },
  { r: 204, g: 11, b: 78 },
  { r: 229, g: 165, b: 68 },
  { r: 125, g: 195, b: 47 },
  { r: 150, g: 117, b: 206 },
  { r: 37, g: 198, b: 218 },
  { r: 240, g: 98, b: 146 },
  { r: 128, g: 203, b: 196 },
  { r: 235, g: 0, b: 40 },
  { r: 68, g: 97, b: 214 },
  { r: 32, g: 133, b: 89 },
  { r: 252, g: 250, b: 0 },
];

export const ACCENT_COLORS_PARAMS: OpacibleColorParams[] = ACCENT_COLORS.map(
  ({ r, g, b }) => ({
    value: `rgb(${r},${g},${b})`,
    opacedValue: `rgba(${r},${g},${b},.5)`,
  })
);

export const DEFAULT_ACCENT_PARAMS: OpacibleColorParams = ACCENT_COLORS_PARAMS[0];
export const DEFAULT_ACCENT_COLOR: string = DEFAULT_ACCENT_PARAMS.value;
export const DEFAULT_OPACED_ACCENT_COLOR: string = DEFAULT_ACCENT_PARAMS.opacedValue;
export const DEFAULT_IS_DARK = true;
