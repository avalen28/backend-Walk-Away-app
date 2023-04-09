require("dotenv").config();
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
const User = require("../models/User");
const Route = require("../models/Route");
const Inventary = require("../models/Inventary");
const SavedRoute = require("../models/SavedRoute");
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
      "https://www.milviatges.com/wp-content/uploads/sites/267/2017/07/Senda-de-los-Cazadores-de-Ordesa.jpg",
    routeImage:
      "https://static-maps.alltrails.com/production/at-map/161062181/v1-trail-spain-huesca-senda-de-los-cazadores-at-map-161062181-1679389679-414w200h-en-US-i-2-style_3.png",
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
      "https://mediaim.expedia.com/destination/2/71d27dac679a004669ecd35f5e657118.jpg",
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
      "https://t3.ftcdn.net/jpg/05/43/63/92/360_F_543639248_VylNFt8EtBXkpQ08SmnCFjyGirOaBING.jpg",
    routeImage:
      "https://c4.wallpaperflare.com/wallpaper/666/150/494/middle-earth-map-the-lord-of-the-rings-wallpaper-preview.jpg",
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
