import convert from "color-convert";

/**
 * Parses a CSS color string into RGB.
 */
export function parseColorToRgb(color: string): [number, number, number] {
  // Try hex
  if (color.startsWith("#")) {
    return convert.hex.rgb(color.replace("#", ""));
  }

  // Try rgb()
  const rgbMatch = color.match(/rgba?\(([^)]+)\)/);
  if (rgbMatch) {
    const [r, g, b] = rgbMatch[1].split(",").map((v) => parseInt(v.trim()));
    return [r, g, b];
  }

  // Try named colors
  const named = convert.keyword.rgb(color.toLowerCase());
  if (named) return named;

  throw new Error(`Unsupported color format: ${color}`);
}

/**
 * Converts RGB values or a CSS color string to a hex color string.
 * @param r Red (0-255) or color string
 * @param g Green (0-255)
 * @param b Blue (0-255)
 * @returns Hex color string (e.g. "#ff00aa")
 */
export function rgbToHex(r: number, g: number, b: number): string;
export function rgbToHex(color: string): string;
export function rgbToHex(rOrColor: number | string, g?: number, b?: number): string {
  let rgb: [number, number, number];
  if (typeof rOrColor === "string") {
    rgb = parseColorToRgb(rOrColor);
  } else {
    rgb = [rOrColor, g as number, b as number];
  }
  return (
    "#" +
    rgb
      .map((x) => {
        const hex = x.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      })
      .join("")
  );
}

/**
 * Lightens a color by a percentage (0-100).
 */
export function lightenColor(color: string, percent: number): string {
  const rgb = parseColorToRgb(color);
  const hsl = convert.rgb.hsl(rgb);

  hsl[2] = Math.min(100, hsl[2] + percent);
  const [r, g, b] = convert.hsl.rgb(hsl);

  return `rgb(${r}, ${g}, ${b})`;
}

/**
 * Darkens a color by a percentage (0-100).
 */
export function darkenColor(color: string, percent: number): string {
  const rgb = parseColorToRgb(color);
  const hsl = convert.rgb.hsl(rgb);

  hsl[2] = Math.max(0, hsl[2] - percent);
  const [r, g, b] = convert.hsl.rgb(hsl);

  return `rgb(${r}, ${g}, ${b})`;
}

/**
 * Sets the alpha (opacity) of a color. Opacity is 0.0 - 1.0
 */
export function setOpacity(color: string, alpha: number): string {
  const rgb = parseColorToRgb(color);
  return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${Math.max(0, Math.min(1, alpha))})`;
}

export function getThemeValue(property: string): string {
  return getComputedStyle(document.documentElement).getPropertyValue(property).trim();
}