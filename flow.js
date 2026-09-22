// 1. USER SIGNUP (/signup)
//    Form submit (POST /user) -> User create hota hai MongoDB me -> Redirects to /login

// 2. USER LOGIN (/login)
//    Form submit (POST /user/login) -> DB me check hota hai 
//    -> JWT token generate hota hai (`setUser`) 
//    -> Browser me "token" cookie save hoti hai -> Redirects to /

// 3. VIEW DASHBOARD (GET /)
//    Browser request bhejta hai cookie ke sath -> `checkForAuthentication` token verify karke `req.user` set karta hai 
//    -> `restrictTo(["NORMAL"])` check karta hai ki user logged in hai 
//    -> Controller sirf us user ke banaye huye links MongoDB se nikalta hai (`createdBy: req.user._id`) 
//    -> `home.ejs` table render karta hai.

// 4. CREATE SHORT LINK (POST /url)
//    User long URL deta hai -> `nanoid(8)` random shortId banata hai 
//    -> MongoDB me entry create hoti hai -> Dashboard par short link show hota hai.

// 5. CLICK SHORT LINK (GET /:shortId)
//    Koi bhi user link par click karta hai: `localhost:4000/aB3dE8z1`
//    -> `index.js` me `/:shortId` route match hota hai
//    -> MongoDB me `$push: { visitHistory: { timestamp: Date.now() } }` run hota hai
//    -> Server `res.redirect(entry.redirectUrl)` karke original website par bhej deta hai!