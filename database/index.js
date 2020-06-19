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
              capacityIds.push(dbCapacity.id);
            } else {
              return Capacity.create({ size: capacity })
                .then((capacityInsert) => {
                  capacityIds.push(capacityInsert.id);
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
              carrierIds.push(dbCarrier.id);
            } else {
              return Carrier.create({ name: carrier })
                .then((carrierInsert) => {
                  carrierIds.push(carrierInsert.id);
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
              colorIds.push(dbColor.id);
            } else {
              return Color.create({ name: color })
                .then((colorInsert) => {
                  colorIds.push(colorInsert.id);
                });
            }
          });
      }));
    })
    .then(() => {
      // populate join tables
      console.log(phoneId, capacityIds, carrierIds, colorIds);
      capacityIds.forEach((capacityId) => {
        PhonesCapacities.create({ capacityId, phoneId });
      });
      carrierIds.forEach((carrierId) => {
        PhonesCarriers.create({ carrierId, phoneId });
      });
      colorIds.forEach((colorId) => {
        PhonesColors.create({ colorId, phoneId });
      });
    });
};