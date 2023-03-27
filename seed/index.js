require("dotenv").config();
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
const User = require("../models/User");
const Route = require("../models/Route");
const Inventary = require("../models/Inventary");

// Place the array you want to seed

//keys with value "default" is not necessary include it
const usersArr = [
  {
    username: "Bojack Horseman",
    email: "bojack@gmail.com",
    hashedPassword: "fj<lkfj3lkjfl", //password hardcode hashed
  },
  {
    username: "Ale",
    email: "Ale@gmail.com",
    hashedPassword: "fj<lkfj3lkjfl", //password hardcode hashed
  },
  {
    username: "Marina",
    email: "Marina@gmail.com",
    hashedPassword: "fj<lkfj3lkjfl", //password hardcode hashed
  },
];

const routesArr = [
  {
    name: "Ruta Cazadores",
    image:
      "https://xn--outletmontaa-khb.com/wp-content/uploads/2021/09/Grupo-3.jpg",
    distance: 16,
    level: 1,
    description: "amazing route in Ordesa",
    estimatedDuration: 5.5,
    inventary: ["drinks", "food", "sportswear", "footwear"],
  },
  {
    name: "Saldes",
    image:
      "https://xn--outletmontaa-khb.com/wp-content/uploads/2021/09/Grupo-3.jpg",
    distance: 7,
    level: 3,
    description: "amazing route in Pedraforca",
    estimatedDuration: 3.4,
    inventary: ["drinks", "food", "sportswear"],
  },
];

mongoose
  .connect(process.env.MONGO_URL)
  .then((x) => console.log(`Connected to ${x.connection.name}`))
  .then(() => {
    return User.deleteMany({});
  })
  .then(() => {
    return Route.deleteMany({});
  })
  .then(() => {
    return Inventary.deleteMany({});
  })
  .then(() => {
    return Route.create(routesArr);
  })
  .then((created) => {
    console.log(`Created ${created.length} Route 🏞️`);
  })
  .then(() => {
    return User.create(usersArr);
  })
  .then((created) => {
    console.log(`Created ${created.length} Users 🏃`);
    const ids = created.map((elem) => elem._id.toString()); //pasamos a string porque viene de Mongo como objectID
    const inventaryData = [
      { userId: ids[0] },
      { userId: ids[1] },
      { userId: ids[2] },
    ];
    return Inventary.create(inventaryData);
  })
  .then((created) => {
    console.log(`Created ${created.length} inventary 🎒`);
  })
  .then(() => {
    console.log("Seed created!!! 🌱");
  })
  .catch((e) => console.log("error connecting Mongo", e))
  .finally(() => {
    console.log("Closing connection");
    mongoose.connection.close();
  });

// Run npm run seed
