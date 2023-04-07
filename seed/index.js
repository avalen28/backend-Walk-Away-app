require("dotenv").config();
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
const User = require("../models/User");
const Route = require("../models/Route");
const Inventary = require("../models/Inventary");
const SavedRoute = require("../models/SavedRoute")
// Place the array you want to seed

//keys with value "default" is not necessary include it
const usersArr = [
  {
    username: "Bojack Horseman",
    email: "bojack@gmail.com",
    hashedPassword:
      "$2a$10$1QvmsDTCfg8hC96HwDhREuJYlu1RbEUjgCZH7CQ2baxUyKX4v.85a", //Bojack1234!
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
  {
    username: "Alberto",
    email: "alberto@gmail.com",
    hashedPassword:
      "$2a$10$Qa6R5HNNHrULQ2crT2jYzeWwrtStJ7AwOKwRor./La2JrJiWKklpa", //Admin1234!
    isAdmin: true,
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
    inventary: {
      drinks: "1L.",
      food: "Lunch",
      sportswear: "Trekking clothes (spring weather)",
      footwear: "Light boots or trekking slippers",
    },
  },
  {
    name: "Saldes",
    image:
      "https://xn--outletmontaa-khb.com/wp-content/uploads/2021/09/Grupo-3.jpg",
    distance: 7,
    level: 3,
    description: "amazing route in Pedraforca",
    estimatedDuration: 3.4,
    inventary: {
      drinks: "1.5L.",
      food: "Snacks",
      sportswear: "High Mountain clothes",
      footwear: "Moutain boots",
    },
  },
  {
    name: "Ruta a Mordor",
    image:
      "https://xn--outletmontaa-khb.com/wp-content/uploads/2021/09/Grupo-3.jpg",
    distance: 8,
    level: 5,
    description: "amazing route to Mordor",
    estimatedDuration: 8.8,
    inventary: {
      drinks: "2L.",
      food: "Two days meal",
      sportswear: "High Mountain clothes",
      footwear: "Moutain boots",
    },
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
    return SavedRoute.deleteMany({});
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
      { userId: ids[3] },
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
