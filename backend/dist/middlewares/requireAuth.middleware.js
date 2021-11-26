"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAdmin = exports.requireAuth = void 0;
const requireAuth = (req, res, next) => {
    //   if (!req.session || !req.session.user) {
    //     res.status(401).end("Not authenticated, Please Login");
    //     return;
    //   }
    next();
};
exports.requireAuth = requireAuth;
const requireAdmin = (req, res, next) => {
    //   const user = req.session.user;
    //   if (!user.isAdmin) {
    //     logger.warn(user.fullname + " Attempt to perform admin action");
    //     res.status(403).end("Unauthorized Enough..");
    //     return;
    //   }
    next();
};
exports.requireAdmin = requireAdmin;
