let generate = (error, message, status, data) => {
    let response = {
        error,
        message,
        status,
        data
    }
    return response;
}

module.exports = {
    generate
}