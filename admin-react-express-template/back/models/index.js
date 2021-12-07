const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.Admin = require('./admin')(sequelize, Sequelize);


db.User = require('./user')(sequelize, Sequelize);
db.UserDelete = require('./userDelete')(sequelize, Sequelize);
db.UserNotification = require('./userNotification')(sequelize, Sequelize);
db.Notice = require('./notice')(sequelize, Sequelize);
db.Banner = require('./banner')(sequelize, Sequelize);
db.Cafe = require('./cafe')(sequelize, Sequelize);
db.CafeImages = require('./cafeImages')(sequelize, Sequelize);
db.CafeMainType = require('./cafeMainType')(sequelize, Sequelize);
db.CafeThema = require('./cafeThema')(sequelize, Sequelize);
db.CafeService = require('./cafeService')(sequelize, Sequelize);
db.CafeMenuGroup = require('./cafeMenuGroup')(sequelize, Sequelize);
db.CafeMenu = require('./cafeMenu')(sequelize, Sequelize);
db.CafeMenuImages = require('./cafeMenuImages')(sequelize, Sequelize);
db.CafeArea = require('./cafeArea')(sequelize, Sequelize);
db.CafeAreaGroup = require('./cafeAreaGroup')(sequelize, Sequelize);
db.CafeLiked = require('./cafeLiked')(sequelize, Sequelize);
db.SearchFilter = require('./searchFilter')(sequelize, Sequelize);
db.SearchFilterGroup = require('./searchFilterGroup')(sequelize, Sequelize);
db.Magazine = require('./magazine')(sequelize, Sequelize);
db.MagazineContents = require('./magazineContents')(sequelize, Sequelize);
db.MagazineContentsTag = require('./magazineContentsTag')(sequelize, Sequelize);
db.MagazineContentsImages = require('./magazineContentsImages')(sequelize, Sequelize);
db.MagazineScraped = require('./magazineScraped')(sequelize, Sequelize);
db.CafeMenuCategory = require('./cafeMenuCategory')(sequelize, Sequelize);
db.CafeModification = require('./cafeModification')(sequelize, Sequelize);
db.CafeModificationImage = require('./cafeModificationImage')(sequelize, Sequelize);
db.CafeJoin = require('./cafeJoin')(sequelize, Sequelize);
db.CafeJoinImage = require('./cafeJoinImage')(sequelize, Sequelize);

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
