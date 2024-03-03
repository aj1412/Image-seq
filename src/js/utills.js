/**
 * Load image via XHR as blob
 */
export const preloadImage = (src) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.open("GET", src, true);
        xhr.responseType = "blob";
        xhr.onload = () => {
            const img = new Image();
            img.src = URL.createObjectURL(xhr.response);
            img.onload = () => resolve(img);
        };
        xhr.onerror = () => reject();
        xhr.send();
    });
};

/**
 * Batch load images via XHR as blob
 */
export const preloadImages = (urls) => {
    return Promise.all(urls.map((src) => preloadImage(src)));
};

/**
 * Draw and scale image in canvas without compression
 */
export const calcDrawImage = (ctx, image, left = 0.5, top = 0.5) => {
    const dpr = window.devicePixelRatio || 1;
    const cWidth = ctx.canvas.width * dpr;
    const cHeight = ctx.canvas.height * dpr;
    const width = image.width;
    const height = image.height;
    const ratio = width / height;
    const cRatio = cWidth / cHeight;
    let resultHeight, resultWidth;
    
    // Set canvas size taking device pixel ratio into account
    ctx.canvas.width = cWidth;
    ctx.canvas.height = cHeight;

    if (ratio > cRatio) {
        resultHeight = cHeight;
        resultWidth = cHeight * ratio;
    } else {
        resultWidth = cWidth;
        resultHeight = cWidth / ratio;
    }

    // Clear canvas before drawing the image
    ctx.clearRect(0, 0, cWidth, cHeight);

    // Draw the image on the canvas without compression
    ctx.drawImage(image, (cWidth - resultWidth) * left, (cHeight - resultHeight) * top, resultWidth, resultHeight)
};
