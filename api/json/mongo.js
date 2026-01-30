db.cars.find();
db.cars.find({ make: "Hyundai" });
db.cars.find({ fuel_type: "Diesel" });
db.cars.find({ transmission: "Manual" }).limit(5).pretty();
db.cars.find({ sunroof: true }).limit(5).pretty();
db.cars
  .find({ price: { $gt: 1000000 } })
  .limit(5)
  .pretty();
db.cars.find({ airbags: 6 }).limit(5).pretty();
db.cars.aggregate([{ $project: { maker: 1, model: 1, _id: 0 } }]);

db.cars.find({ "engine.cc": { $gt: 1400 } }).count();
db.cars.find({ "engine.torque": "250 Nm" }).count();
db.cars.find({ features: { $in: ["Bluetooth"] } });
db.cars
  .find({ features: { $all: ["Sunroof", "Leather Seats"] } })
  .limit(5)
  .pretty();

db.cars.find({ "features.3": { $exists: true } }).count();

db.cars.find({ features: { $all: ["Wireless Charging"] } });

db.cars.find({ "engine.type": "Naturally Aspirated" }).limit(5).pretty();

db.cars.find({ "owners.location": "Delhi" }).count();

db.cars
  .find({
    owners: { $elemMatch: { location: "Delhi" } },
  })
  .count();

db.cars.find({ owners: { $elemMatch: { name: "Raju" } } }).count();

db.cars.find({ owners: { $size: 2 } }).count();

db.cars
  .find({
    $expr: { $gt: [{ $size: "$owners" }, 1] },
  })
  .count();

db.cars.find({
  $expr: {
    $eq: [{ $arrayElemAt: ["$owners.name", 1] }, "Shyam"],
  },
});

db.cars.aggregate([{ $project: { _id: 0, owners_names: "$owners.name" } }]);

db.cars.find({
  $expr: {
    $gt: [{ $arrayElemAt: ["$owners.purchase_date", 0] }, "2022-01-01"],
  },
});

db.cars.find({
  $expr: {
    $gt: [{ $arrayElemAt: ["$owners.purchase_date", 1] }, "2023-01-01"],
  },
});

db.cars.aggregate([
  {
    $match: {
      maker: "Hyundai",
      model: "Creta",
    },
  },
  {
    $set: {
      features: ["Sunroof", "Bluetooth"],
    },
  },
]);

db.cars.aggregate([
  {
    $match: {
      maker: "Hyundai",
      model: "Creta",
    },
  },
  {
    $pull: { features: "Bluetooth" },
  }
]);


db.cars.updateMany(
  { maker: "Hyundai", model: "Creta" }, 
  { $pull: { features: "Ventilated Seats" } }
)

db.cars.aggregate([
  {
    $match: {
      maker: "Hyundai",
      model: "Creta",
    },
  }
]);