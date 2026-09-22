import { getUser } from "../service/auth.js";

export function checkForAuthentication(req, res, next){
    const tokenCookie = req.cookies?.token
    req.user = null

    if(!tokenCookie){
        return next()
    }

    const token = tokenCookie
    const user = getUser(token)

    req.user = user

    return next()
}

export function restrictTo(roles = []) {
    return function (req, res, next) {
        if (!req.user) return res.redirect('/login');
        if (!roles.includes(req.user.role)) return res.end("UnAuthorized");
        return next();
    }
}

// export async function restrictToLoggedinUserOnly(req, res, next) {
//     const userUid = req.headers["Authorization"];

//     if(!userUid) return res.redirect("/login");
//     const token = userUid.split(" ")[1];

//     const user = getUser(token);

//     if(!user) return res.redirect("/login");
//     req.user = user;
//     next()
// }
// export async function checkAuth(req, res, next) {
//     const userUid = req.headers["authorization"];
//     const token = userUid.split(" ")[1];
    
//     const user = getUser(token);

//     req.user = user;
//     next()
// }