const fs = require("fs");

function logReqRes(filename) {
    return (req, res, next) => {
        fs.appendFile(
            filename,
            `\n${Date.now()}: ${req.ip} ${req.method}: ${req.path}\n`,
            (err, data) => {
                if (err) {
                    console.error("Error occurred while logging request/response:", err);
                }
                next(); // Call next middleware in the chain
            }
        );
    };
}

module.exports = {
    logReqRes,
};
