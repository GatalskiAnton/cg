export function drawBresenham(x1, y1, x2, y2, step, setLogs) {
    x1 = x1 * step + 3 * step
    y1 = y1 * step + 3 * step
    x2 = x2 * step + 3 * step
    y2 = y2 * step + 3 * step
    const points = [];
    const dx = Math.abs(x2 - x1);
    const dy = -Math.abs(y2 - y1);
    const sx = x1 < x2 ? step : -step;
    const sy = y1 < y2 ? step : -step;
    let error = dx + dy;
    let iter = 1;
    let bLog = []
    bLog.push("start Bresenham")
    while (true) {
        iter++;
        bLog.push(`add point (x1:${(x1 - 3 * step)/step}; y1:${(y1 - 3 * step) / step}), error = ${(error - 3 * step) / step}`)
        points.push([x1, y1]);
        if (x1 === x2 && y1 === y2) {
            bLog.push("end Bresenham")
            break;
        }
        if (2 * error >= dy && x1 !== x2) {
            error += dy;
            x1 += sx;
            bLog.push(`case: 2 * error >= dy, shift x to ${sx / step}, error decreases on ${Math.abs(dy)}`)
        }
        if (2 * error <= dx && y1 !== y2) {
            error += dx;
            y1 += sy;
            bLog.push(`case: 2 * error <= dx, shift y to ${sy / step}, error increases on ${Math.abs(dx)}`)
        }
    }
    setLogs(bLog)
    return points
}

export function drawStepByStep(x1,y1,x2,y2,step, setLogs) {
    x1 = x1 * step + 3 * step
    y1 = y1 * step + 3 * step
    x2 = x2 * step + 3 * step
    y2 = y2 * step + 3 * step
    const points = [];
    if (x1 > x2) {
        [x1, x2] = [x2, x1];
        [y1, y2] = [y2, y1];
    }
    const dx = x2 - x1;
    const dy = y2 - y1;
    let sbsLog = []
    sbsLog.push("start Step by step")
    if (dx === 0 && dy === 0) {
        points.push([x1, y1]);
        sbsLog.push(`dx = 0, dy = 0, add point (x1:${(x1 - 3 * step)/step}; y1:${(y1 - 3 * step) / step}),`)
    } else {
        if (Math.abs(dx) > Math.abs(dy)) {
            sbsLog.push(`case: |dx| > |dy|, x from ${(x1 - 3 * step)/step} to ${(x2 - 3 * step)/step}`)
            for (let x = x1; x <= x2; x += step) {
                const temp = Math.round((y1 + (dy * (x - x1)) / dx) / step) * step;
                points.push([x, temp]);
                sbsLog.push(`x = ${(x - 3 *step)/step} y = ${(temp - 3 * step)/step} => (x:${(x - 3 * step)/step}; y:${(temp - 3 * step)/step})`)
            }
        } else {
            if (y1 > y2) {
                [x1, x2] = [x2, x1];
                [y1, y2] = [y2, y1];
            }
            sbsLog.push(`case: |dx| <= |dy|, y from ${y1} to ${y2}`)
            for (let y = y1; y <= y2; y += step) {
                const temp = Math.round(((dx / dy) * (y - y1) + x1) / step) * step;
                points.push([temp, y]);
                sbsLog.push(`y = ${(y - 3 * step)/ step} x = ${(temp - 3* step)/step} => (x:${(temp - 3 * step)/step}; y:${(y - 3 * step)/step})`)
            }
        }
    }
    sbsLog.push("end Step by step")
    setLogs(sbsLog)
    return points
}