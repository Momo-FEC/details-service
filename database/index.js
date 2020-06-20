const { Phone, Capacity, Carrier, Color, PhonesCapacities, PhonesCarriers, PhonesColors } = require('./models.js');
const dbModelOptions = { timestamps: false };

module.exports.getOne = function(id) {
  return Phone.findAll({
    where: { id },
    attributes: ['name', 'productCode'],
    include: [{
      model: Capacity,
      attributes: ['size'],
      through: { attributes: [] }
    }, {
      model: Carrier,
      attributes: ['name'],
      through: { attributes: [] }
    }, {
      model: Color,
      attributes: ['name'],
      through: { attributes: [] }
    }]
  });
};

module.exports.addOne = function({ name, productCode, carriers, capacities, colors }) {
  var phoneId;
  var capacityIds = [];
  var carrierIds = [];
  var colorIds = [];
  // create phone in database, save the id of where phone was inserted
  return Phone.create({ name, productCode })
    .then((phone) => {
      phoneId = phone.id;
      // convert capacities array of strings into array of promises that push
      // the id into our array
      return Promise.all(capacities.map((capacity) => {
        return Capacity.findOne({ where: { size: capacity }})
          .then((dbCapacity) => {
            if (dbCapacity) {
              return capacityIds.push(dbCapacity.id);
            } else {
              return Capacity.create({ size: capacity })
                .then((capacityInsert) => {
                  return capacityIds.push(capacityInsert.id);
                });
            }
          });
      }));
    })
    .then(() => {
      // use promises to get ids of carriers for the phone
      return Promise.all(carriers.map((carrier) => {
        return Carrier.findOne({ where: { name: carrier }})
          .then((dbCarrier) => {
            if (dbCarrier) {
              return carrierIds.push(dbCarrier.id);
            } else {
              return Carrier.create({ name: carrier })
                .then((carrierInsert) => {
                  return carrierIds.push(carrierInsert.id);
                });
            }
          });
      }));
    })
    .then(() => {
      // use promises to get ids of colors for the phone
      return Promise.all(colors.map((color) => {
        return Color.findOne({ where: { name: color }})
          .then((dbColor) => {
            if (dbColor) {
              return colorIds.push(dbColor.id);
            } else {
              return Color.create({ name: color })
                .then((colorInsert) => {
                  return colorIds.push(colorInsert.id);
                });
            }
          });
      }));
    })
    .then(() => {
      // populate join tables
      return Promise.all(capacityIds.map((capacityId) => {
        return PhonesCapacities.create({ capacityId, phoneId });
      }));
    })
    .then(() => {
      return Promise.all(carrierIds.map((carrierId) => {
        return PhonesCarriers.create({ carrierId, phoneId });
      }));
    })
    .then(() => {
      return Promise.all(colorIds.map((colorId) => {
        return PhonesColors.create({ colorId, phoneId });
      }));
    });
};