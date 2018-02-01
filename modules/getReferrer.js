var getReferrer = function (req, validPaths) {
    if (req.header("Referrer")) {
        var referrer = "/" + req.header("Referrer").split("/").pop();
        if (!validPaths.includes(referrer)) {
            referrer = "/dashboard";
        }
    } else {
        referrer = "/dashboard"
    }
  
    return referrer;
}

module.exports = getReferrer;