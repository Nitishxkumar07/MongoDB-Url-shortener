import { User } from "../model/user.js";
// import { v4 as uuidv4 } from "uuid";
import { setUser } from "../service/auth.js";
export async function handleUserSignup(req, res) {
    const { name, email, password } = req.body;
    await User.create({
        name,
        email,
        password
    })
    return res.redirect("/")
}

export async function handleUserLogin(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (!user) return res.render("login", {
        err: "Invalid Username or Password"
    })
    // const sessionId = uuidv4();
    const token = setUser({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
    });
    res.cookie("token", token)
    return res.redirect("/")
}