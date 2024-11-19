const { Unauthorized } = require("http-errors");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

const { JWT_SECRET } = process.env;

const auth = async (req, res, next) => {
    const { authorization = "" } = req.headers;
    console.log("Authorization header: ", authorization);

    const [bearer, token] = authorization.split(" ");

    try {
        if (bearer !== "Bearer") {
            throw new Unauthorized("Not authorized");
        };
        const { id } = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(id);
        if (!user || !user.token) {
            throw new Unauthorized("Not authorized");
        };
        req.user = user;
        next();
    } catch (error) {
        if (error.message === "Invalid signature") {
            error.status = 401;
        };
        next(error);
    };
};

module.exports = auth;
