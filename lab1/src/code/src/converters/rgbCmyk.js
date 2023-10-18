export function rgbToCmyk(rgbColor) {
    let r = rgbColor.r / 255;
    let g = rgbColor.g / 255;
    let b = rgbColor.b / 255;

    let k = 1 - Math.max(r, g, b);

    if (k === 1) {
        return { c: 0, m: 0, y: 0, k: 100 };
    }

    let c = (1 - r - k) / (1 - k);
    let m = (1 - g - k) / (1 - k);
    let y = (1 - b - k) / (1 - k);

    c = Math.round(c * 100);
    m = Math.round(m * 100);
    y = Math.round(y * 100);
    k = Math.round(k * 100);

    return { c: c, m: m, y: y, k: k };
}

export function cmykToRgb(cmykColor) {
    let c = cmykColor.c / 100;
    let m = cmykColor.m / 100;
    let y = cmykColor.y / 100;
    let k = cmykColor.k / 100;

    let r = 255 * (1 - c) * (1 - k);
    let g = 255 * (1 - m) * (1 - k);
    let b = 255 * (1 - y) * (1 - k);

    r = Math.round(r);
    g = Math.round(g);
    b = Math.round(b);

    return {r: r, g: g, b: b};
}
