const { Sequelize } = require('sequelize');
const { username, password } = require('./config.js');
const sequelize = new Sequelize('phoneDetails', username, password, { dialect: 'mysql'});

const dbModelOptions = { timestamps: false };

var Phone = sequelize.define('phone', {
  name: {
    type: 'TEXT',
    allowNull: false
  },
  productCode: {
    type: 'TEXT',
    allowNull: false
  }
}, dbModelOptions);
Phone.sync();
module.exports.Phone = Phone;

var Capacity = sequelize.define('capacity', {
  size: {
    type: 'VARCHAR(10)',
    allowNull: false,
    unique: true
  }
}, dbModelOptions);
Capacity.sync();
module.exports.Capacity = Capacity;

var Carrier = sequelize.define('carrier', {
  name: {
    type: 'VARCHAR(20)',
    allowNull: false,
    unique: true
  },
  image: {
    type: 'TEXT'
  }
}, dbModelOptions);
Carrier.sync();
module.exports.Carrier = Carrier;

var Color = sequelize.define('color', {
  name: {
    type: 'VARCHAR(30)',
    allowNull: false,
    unique: true
  }
}, dbModelOptions);
Color.sync();
module.exports.Color = Color;

var PhonesCapacities = sequelize.define('phones_capacities', {}, dbModelOptions);
Phone.belongsToMany(Capacity, { through: PhonesCapacities });
Capacity.belongsToMany(Phone, { through: PhonesCapacities });
PhonesCapacities.sync();
module.exports.PhonesCapacities = PhonesCapacities;

var PhonesCarriers = sequelize.define('phones_carriers', {}, dbModelOptions);
Phone.belongsToMany(Carrier, { through: PhonesCarriers });
Carrier.belongsToMany(Phone, { through: PhonesCarriers });
PhonesCarriers.sync();
module.exports.PhonesCarriers = PhonesCarriers;

var PhonesColors = sequelize.define('phones_colors', {}, dbModelOptions);
Phone.belongsToMany(Color, { through: PhonesColors });
Color.belongsToMany(Phone, { through: PhonesColors });
PhonesColors.sync();
module.exports.PhonesColors = PhonesColors;