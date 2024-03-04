/**
 * Load image via XHR as blob
 */
export const preloadImage = (src) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        const xhr = new XMLHttpRequest();

        xhr.open("GET", src, true);
        xhr.responseType = "blob";
        xhr.onload = () => {
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
 * Draw and scale image in canvas
 */
export const calcDrawImage = (ctx, image, left = 0.5, top = 0.5) => {
    const devicePixelRatio = window.devicePixelRatio || 1; // Get device pixel ratio
    const backingStoreRatio = ctx.webkitBackingStorePixelRatio ||
        ctx.mozBackingStorePixelRatio ||
        ctx.msBackingStorePixelRatio ||
        ctx.oBackingStorePixelRatio ||
        ctx.backingStorePixelRatio || 1;

    const ratio = devicePixelRatio / backingStoreRatio; // Determine the ratio to apply

    // Set the canvas size considering the ratio
    const canvasWidth = ctx.canvas.width;
    const canvasHeight = ctx.canvas.height;
    ctx.canvas.width = canvasWidth * ratio;
    ctx.canvas.height = canvasHeight * ratio;

    // Scale the drawing context
    ctx.scale(ratio, ratio);

    const cWidth = ctx.canvas.width;
    const cHeight = ctx.canvas.height;
    const width = image.width;
    const height = image.height;
    const imageRatio = width / height;
    const cRatio = cWidth / cHeight;
    let resultHeight, resultWidth;

    if (imageRatio > cRatio) {
        resultHeight = cHeight;
        resultWidth = cHeight * imageRatio;
    } else {
        resultWidth = cWidth;
        resultHeight = cWidth / imageRatio;
    }

    ctx.drawImage(image, (cWidth - resultWidth) * left, (cHeight - resultHeight) * top, resultWidth, resultHeight);
};

