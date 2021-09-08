const pagination = (page, size) => {
    const limit = size ? +size : 10;
    const offset = page ? limit * (page - 1):0;
    return { limit, offset };
}

module.exports = { pagination };