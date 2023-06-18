const express = require('express')
const app = express()
const port = 5000
//다운로드 받은 bodyParser 불러오기
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser")
// 만들어 놓은 모델 가져오기
const {User} = require("./models/User");

const config = require("./config/key");
const {auth} = require('./middleware/auth');

// bodyParser에 옵션 주기
app.use(bodyParser.urlencoded({extended: true}));
//<application/x-www-form-urlencoded> 이 형식의 데이터를 가져와서 분석할 수 있게 해 줌
app.use(bodyParser.json()); //<application/json> 형식의 데이터를 가져올 수 있게 함
app.use(cookieParser());


const mongoose = require('mongoose')
mongoose.connect(config.mongoURI).then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err))

app.get('/', (req, res) => {
  res.send('Hello World!~~안녕하세요!')
})

//회원가입을 위한 route 작성
app.post('/api/users/register', (req, res) => {
	//post request를 했다. ==> postman에서 post로 설정
  //회원 가입 할 때 필요한 정보들을 client에서 가져오면
  //그것들을 데이터 베이스에 넣어준다.

  const user = new User(req.body) // req,body로 유저 정보를 가져오는 것

  // save 하기 전에 비밀 번호를 암호화 해 주어야 한다.

  
  user.save((err, userInfo) => { // 정보들이 유저 모델에 저장됨
    if (err) return res.json({ success: false, err})
		// 만약 오류 나면 클라이언트에게 에러메세지 전달
    return res.status(200).json({ // status(200)은 성공했다는 의미
      success: true
    })
  })
})

app.post('/api/users/login', (req, res) => {
  // 요청된 이메일을 데이터베이스에서 있는지 찾는다.
  User.findOne({email: req.body.email}, (err, user) => { //몽고DB에서 제공하는 method
    if(!user) {
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다."
      })
    }

      // 요청된 이메일이 데이터 베이스에 있다면 비밀번호가 맞는 비밀번호 인지 확인.
      user.comparePassword(req.body.password, (err, isMatch) => {
        if(!isMatch)
          return req.json({loginSuccess: false, message: "비밀번호가 틀렸습니다."});

        // 비밀번호까지 같다면 Token 생성
        user.generationToken((err, user) => {
          if (err)
            return res.status(400).sendStatus(err);

          // 토큰을 저장한다. 어디에? 쿠키, 로컬스토리지 등등 여러개 있는데,
					// 여기서는 쿠키에다 하겠다.
          res.cookie("x_auth", user.token)
          .status(200)
          .json({loginSuccess: true, userId: user._id});
        })

      })

  })

})

// auth라는 미들웨어 추가. 미들웨어란 end point에서 req받고 call back function 하기 전에
// 중간에서 뭐 해주는 거
app.get('/api/users/auth', auth, (req, res) => {

  // 여기까지 미들웨어를 통과해 왔다는 것은 Authentication이 True라는 말.
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image
  })
})

app.get('/api/users/logout', auth, (req, res) => {
  User.findOneAndUpdate({_id: req.user._id}, 
    {token: ""}
    , (err, user) => {
    if (err) return res.json({success: false, err});
    return res.status(200).send({
      success: true
    })
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
})

