// const sessionIdToUserMap = new Map();
import jwt from "jsonwebtoken"
const secret = "kumar@123456"

export function setUser ( user) {
    return jwt.sign(user, secret)
}
// export function setUser (id, user) {
//     sessionIdToUserMap.set(id, user);
// }

export function getUser(token) {
    if (!token) return null;
    try{
        return jwt.verify(token, secret)
    } catch(error){
        return null;
    }
}
// export function getUser(id) {
//     return sessionIdToUserMap.get(id);
// }

