const {User} = require('../models/User');


let auth = (req, res, next) => {
// 인증처리를 하는 곳

// 클라이언트 쿠키에서 토큰을 가져온다.
let token = req.cookies.x_auth;

// 토큰을 복호화한 후 유저를 찾늗다.
User.findByToken(token, (err, user) => {
    if(err) throw err;
    if (!user) return res.json({ isAuth: false, error: true})

    req.token = token;
    req.user = user;
    next(); //함수가 미들웨어이기 때문에 미들웨어를 지나갈 수 있도록 next를 넣어준다.

// 유저가 있으면 인증 Okay

// 유저가 없으면 인증 No!

    })
}

module.exports = {auth};

