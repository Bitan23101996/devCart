function addImageUrl(req, item) {
    return {
        ...item,
        img: item.img
            ? `${req.protocol}://${req.get("host")}${item.img}`
            : item.img
    };
}

function addImageUrls(req, items) {
    return items.map(item => addImageUrl(req, item));
}

module.exports = {
    addImageUrl,
    addImageUrls
};