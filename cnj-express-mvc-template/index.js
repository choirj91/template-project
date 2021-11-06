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
const temp = require('./routes/temp');

// 셋팅
const prod = process.env.NODE_ENV === 'production';
const clientPath = "/test/";
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
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
  },
};
if (prod) {
  sessionOption.cookie.secure = true;
  sessionOption.cookie.proxy = true;
  sessionOption.cookie.domain = '.temp.com',
    sessionOption.cookie.maxAge = 24 * 60 * 60 * 1000,
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

app.get('/', (req, res) => {
  res.status(200).send('안녕하세요.');
});

// Route
app.use('/api/temp', temp);

app.use(generalErrorHandler);

// client page
const staticPath = path.join(__dirname, `../${clientPath}/dist`);
const imageStatic = path.join(__dirname, `../${clientPath}/static`);
console.log('imageStatic', imageStatic);
app.use(express.static(staticPath));
app.use(express.static(imageStatic));

app.get("/static/:filePath/:name", (req, res) => {
  const { filePath, name } = req.params;
  const fullPath = `../${clientPath}/static/` + filePath + '/' + name;
  res.sendFile(path.join(__dirname, fullPath));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, `../${clientPath}/dist/index.html`));
});

app.listen(port, function () {
  console.log(`application is listening on port ${port}...`)
});