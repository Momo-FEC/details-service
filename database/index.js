const dbModels = require('./models.js');
const dbModelOptions = { timestamps: false };

module.exports.getAll = function() {
  return dbModels.Phone.findAll({
    where: {id: 1},
    attributes: ['name', 'productCode'],
    include: [{
      model: dbModels.Capacity,
      attributes: ['size'],
      through: { attributes: [] }
    }]
  });
};