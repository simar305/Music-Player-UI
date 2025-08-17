export async function extractAverageColor(src) {
    return new Promise((resolve) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = src;
        img.onload = () => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            const w = (canvas.width = 50);
            const h = (canvas.height = 50);
            ctx.drawImage(img, 0, 0, w, h);
            const data = ctx.getImageData(0, 0, w, h).data;
            let r = 0, g = 0, b = 0, count = 0;
            for (let i = 0; i < data.length; i += 4) {
                r += data[i]; g += data[i + 1]; b += data[i + 2]; count++;
            }
            r = Math.round(r / count);
            g = Math.round(g / count);
            b = Math.round(b / count);
            resolve([r, g, b]);
        };
        img.onerror = () => resolve([34, 22, 14]);
    });
}

export function rgbToCss(r, g, b) {
    return `rgb(${r}, ${g}, ${b})`;
}
