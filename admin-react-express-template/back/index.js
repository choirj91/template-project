const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const hpp = require('hpp');
const session = require("express-session");
const MySQLStore = require('express-mysql-session')(session);
const dotenv = require('dotenv'); // info config
const cookieParser = require('cookie-parser');
const morgan = require('morgan'); // server log
const helmet = require('helmet');
const passport = require('passport');
const passportConfig = require('./passport');
const port = process.env.PORT || 3095;
const { generalErrorHandler } = require('./utills/errors');


// DATABASE Mysql Sequelize
const db = require('./models');
db.sequelize.sync();

// import routes
const admins = require('./routes/admins');
const dashboard = require('./routes/dashboard');
const filters = require('./routes/filters');
const files = require('./routes/files');
const cafes = require('./routes/cafes');
const notices = require('./routes/notices');
const banners = require('./routes/banners');
const magazines = require('./routes/magazines');

// 셋팅
const prod = process.env.NODE_ENV === 'production';
dotenv.config();
passportConfig();

// Middleware
app.use(express.json({
  limit: "1mb"
}));
app.use(express.urlencoded({
  limit: "1mb",
  extended: true
}));
app.use(cookieParser(process.env.COOKIE_SECRET));

if (prod) {
  app.set('trust proxy', 1);
  app.use(hpp());
  // app.use(helmet());
  app.use(
    helmet({
      contentSecurityPolicy: false,
    })
  );
  app.use(morgan('combined'));
  app.use(cors({
    origin: /test\.com$/,
    credentials: true,
  }));
} else {
  app.use(morgan('dev'));
  app.use(cors({
    origin: true,
    credentials: true,
  }));
}


/* session */
const sessionOption = {
  resave: true, // 세션을 저장하고 불러올 때 세션을 다시 저장 할 지 여부
  saveUninitialized: false, // 세션에 저장 할 때 초기화 여부
  secret: process.env.COOKIE_SECRET,
  rolling: true, // 로그인 상태에서 다른 페이지로 이동 할 때마다 세션값에 변화(maxAge 시간 변경 등)를 줄 것인지 여부
  cookie: {
    httpOnly: true,
    maxAge : 24 * 60 * 60 * 1000,
  },
};
if (prod) {
  sessionOption.cookie.secure = true;
  sessionOption.cookie.proxy = true;
  sessionOption.cookie.domain = '.test.com',
    sessionOption.store = new MySQLStore({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_ID,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_SID,
    })
}
app.use(session(sessionOption));
app.use(passport.initialize());
app.use(passport.session());

// app.get('/', (req, res) => {
//   res.status(200).send('안녕하세요.');
// });

// Route
app.use('/api/admins', admins);
app.use('/api/dashboard', dashboard);
app.use('/api/filters', filters);
app.use('/api/files', files);
app.use('/api/cafes', cafes);
app.use('/api/notices', notices);
app.use('/api/banners', banners);
app.use('/api/magazines', magazines);

app.use(generalErrorHandler);

// admin page
const staticPath = path.join(__dirname, '../front/dist');
const imageStatic = path.join(__dirname, '../front/static');
app.use(express.static(staticPath));
app.use(express.static(imageStatic));

app.get("/static/:filePath/:name", (req, res) => {
  const { filePath, name } = req.params;
  const fullPath = "../front/static/" + filePath + '/' + name;
  res.sendFile(path.join(__dirname, fullPath));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../front/dist/index.html"));
});

app.listen(port, function () {
  console.log(`application is listening on port ${port}...`)
});