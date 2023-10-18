export function rgbToHsl(rgbColor) {
    let r = rgbColor.r / 255;
    let g = rgbColor.g / 255;
    let b = rgbColor.b / 255;

    const vmax = Math.max(r, g, b), vmin = Math.min(r, g, b);
    let h, s, l = (vmax + vmin) / 2;

    if (vmax === vmin) {
        return {h:0, s:0, l:l};
    }

    const d = vmax - vmin;
    s = l > 0.5 ? d / (2 - vmax - vmin) : d / (vmax + vmin);
    if (vmax === r) h = (g - b) / d + (g < b ? 6 : 0);
    if (vmax === g) h = (b - r) / d + 2;
    if (vmax === b) h = (r - g) / d + 4;
    h /= 6;

    console.log(h)

    return {h:h, s:s, l:l};
}

export  function hslToRgb(hslColor) {
    let r, g, b;


    if (hslColor.s === 0) {
        r = g = b = hslColor.l; // achromatic
    } else {
        const q = hslColor.l < 0.5 ? hslColor.l * (1 + hslColor.s) : hslColor.l + hslColor.s - hslColor.l * hslColor.s;
        const p = 2 * hslColor.l - q;
        r = hueToRgb(p, q, hslColor.h + 1 / 3);
        g = hueToRgb(p, q, hslColor.h);
        b = hueToRgb(p, q, hslColor.h - 1 / 3);
    }

    return {r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255)};
}

function hueToRgb(p, q, t) {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
}

