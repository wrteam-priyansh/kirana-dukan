exports.success = (data) => {
    return {
        "error": false,
        "data": data || {}
    };
}

exports.error = (message) => {
    return {
        "error": true,
        "message": message
    };
}

exports.accessDenied = () => {
    return {
        "error": true,
        "message": "Access denied"
    };
}

