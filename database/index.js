const { Phone, Capacity, Carrier, Color } = require('./models.js');
const dbModelOptions = { timestamps: false };

module.exports.getAll = function() {
  return Phone.findAll({
    where: {id: 1},
    attributes: ['name', 'productCode'],
    include: [{
      model: Capacity,
      attributes: ['size'],
      through: { attributes: [] }
    }]
  });
};

module.exports.addOne = function({ name, productCode }) {
  return Promise.all([Phone.create({ name, productCode })])
    .then((results) => {
      return results;
    });
};