const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10 //Salt를 사용해서 암호를 진행하기 위해 Salt의 길이를 미리 지정한다.
const jwt = require("jsonwebtoken");


// schema 생성 ==> 데이터의 자료형을 미리 지정하기 위해 사용.
const userSchema = mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token:{
        type: String
    },
    tolenExp: {
        type: Number
    }
})

userSchema.pre('save', function( next ){//mongoose에서 가져온 method로 user모델에 user정보를
																				//저장하기 전에, 미리 무언가를 한다는 의미
    var user = this; // 위에 있는 스키마를 가리킨다.

    if(user.isModified('password')) { //사용자가 비밀번호를 바꿀 때에만 비밀번호 암호화를 진행,
																			//다른 정보를 바꿀 때에는 아래 코드를 실행하지 않음.
            //비밀번호를 암호화 시킨다. 1. Salt 만들기
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if(err) return next(err)

            bcrypt.hash(user.password, salt, function(err, hash) {
                //store hash in yout password DB.
                if(err) return next(err) // 오류 나면 index.js에 user.save로 이동
                user.password = hash
                next() // 완성하였으므로 index.js 로 돌아감
            })
        })
    } else {
        next()
    }
})

userSchema.methods.comparePassword = function(plainPassword, cb) {
    
    // plainPassword 1234567  암호화된 비밀번호 $2b$10$i0hptKkfP3olEd5QsiO
    bcrypt.compare(plainPassword, this.password, function(err, isMatch) { //비밀번호 비교
																																					//하는 method
        if(err) return cb(err);
        cb(null, isMatch)
    })
}

userSchema.methods.generationToken = function(cb) {

    var user = this;

    // jsonwebtoken을 이용해서 token을 생성하기
    var token = jwt.sign(user._id.toHexString(), 'secretToken')

    // user._id + 'secretToken' = token
    // ->
    // 'secretToken' -> user._id

    user.token = token
    user.save(function(err, user) {
        if(err) return cb(err)
        cb(null, user)
    })
}

userSchema.statics.findByToken = function(token, cb) {
    var user = this;

    // 토큰을 복호화 한다.
    jwt.verify(token, 'secretToken', function(err, decoded) {
        // 유저 아이디를 이용해서 유저를 찾은 다음에
        // 클라이언트에서 가져온 token과 DB에 보관된 토큰이 일치하는지 확인

        user.findOne({"_id": decoded, "token": token}, function(err, user){
            if(err) return cb(err);
            cb(null, user)
        })
    })
}

const User = mongoose.model('User', userSchema) // model 생성
module.exports = {User} // model을 다른 곳에서도 사용할 수 있도록 export