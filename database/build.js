var { sequelize } = require('./models.js');

sequelize.sync({ force: true })
  .then(() => {
    sequelize.close();
  });