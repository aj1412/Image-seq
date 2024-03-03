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
    var dpr = window.devicePixelRatio || 1;
    const cWidth = ctx.canvas.width * dpr ;
    const cHeight = ctx.canvas.height * dpr;
    const width = image.width;
    const height = image.height;
    const ratio = width / height;
    const cRatio = cWidth / cHeight;
    let resultHeight, resultWidth;
    ctx.scale(dpr, dpr);
    if (ratio > cRatio) {
        resultHeight = cHeight;
        resultWidth = cHeight * ratio;
    } else {
        resultWidth = cWidth;
        resultHeight = cWidth / ratio;
    }

    ctx.drawImage(image, (cWidth - resultWidth) * left, (cHeight - resultHeight) * top, resultWidth, resultHeight)
};
