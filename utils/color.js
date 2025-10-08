// utils/color.js

/**
 * Lightens a hex color by a percentage.
 * @param {string} hex - e.g. "#2563eb"
 * @param {number} percent - 0-100
 * @returns {string} - new hex color
 */
export function lightenHex(hex, percent) {
  // Remove the # if present
  hex = hex.replace(/^#/, '');

  // Convert 3-digit hex to 6-digit
  if (hex.length === 3) {
    hex = hex.split('').map(c => c + c).join('');
  }

  // Convert to integer values
  const num = parseInt(hex, 16);
  let r = (num >> 16) & 0xff;
  let g = (num >> 8) & 0xff;
  let b = num & 0xff;

  // Increase each channel by percent
  r = Math.min(255, Math.floor(r + (255 - r) * (percent / 100)));
  g = Math.min(255, Math.floor(g + (255 - g) * (percent / 100)));
  b = Math.min(255, Math.floor(b + (255 - b) * (percent / 100)));

  // Convert back to hex
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}
