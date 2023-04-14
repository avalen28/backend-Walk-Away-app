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
    username: "Bojack",
    img: "https://i.blogs.es/61a017/cartel-bojack/840_560.jpeg",
    email: "bojack@gmail.com",
    level: 2,
    experiencePoints: 300,
    hashedPassword:
      "$2a$10$1QvmsDTCfg8hC96HwDhREuJYlu1RbEUjgCZH7CQ2baxUyKX4v.85a", //Bojack1234!
  },
  {
    username: "Ale",
    img: "https://ca.slack-edge.com/T047BNNEQQH-U046SFMVD62-d965e1d1b1a0-512",
    email: "Ale@gmail.com",
    hashedPassword:
      "$2a$10$TyzF6SVqTDd6WP0ZDpgHJeK4JQ2MF8b3kTYdr2GYFQ8lcfjBEtjrG", //Prueba1234!
    level: 5,
    experiencePoints: 1900,
  },
  {
    username: "Marina",
    img: "https://ca.slack-edge.com/T047BNNEQQH-U047BSM13EV-ed16d6d6a52a-512",
    email: "Marina@gmail.com",
    level: 4,
    experiencePoints: 900,
    hashedPassword:
      "$2a$10$TyzF6SVqTDd6WP0ZDpgHJeK4JQ2MF8b3kTYdr2GYFQ8lcfjBEtjrG", //Prueba1234!
  },
  {
    username: "Alberto",
    img: "https://ca.slack-edge.com/T047BNNEQQH-U047QRP4UCQ-5ec0f0fe2789-512",
    email: "alberto@gmail.com",
    level: 2,
    experiencePoints: 400,
    hashedPassword:
      "$2a$10$Qa6R5HNNHrULQ2crT2jYzeWwrtStJ7AwOKwRor./La2JrJiWKklpa", //Admin1234!
    isAdmin: true,
  },
  {
    username: "Guillem",
    img: "https://ca.slack-edge.com/T047BNNEQQH-U046WC9A2KX-3519590f26cd-512",
    email: "guillem@gmail.com",
    level: 4,
    experiencePoints: 900,
    hashedPassword:
      "$2a$10$TyzF6SVqTDd6WP0ZDpgHJeK4JQ2MF8b3kTYdr2GYFQ8lcfjBEtjrG", //Prueba1234!
    isAdmin: false,
  },
];

const routesArr = [
  {
    name: "Ruta de los Cazadores",
    location: "Huesca",
    image:
      "https://www.milviatges.com/wp-content/uploads/sites/267/2017/07/Senda-de-los-Cazadores-de-Ordesa.jpg",
    routeImage:
      "https://static-maps.alltrails.com/production/at-map/161062181/v1-trail-spain-huesca-senda-de-los-cazadores-at-map-161062181-1679389679-414w200h-en-US-i-2-style_3.png",
    distance: 16,
    level: 2,
    description: "Amazing route in Ordesa. Long but easy to do.",
    estimatedDuration: 5.5,
    inventary: {
      drinks: "1.5L.",
      food: "Lunch",
      sportswear: "Trekking clothes (spring weather)",
      footwear: "Light boots or trekking slippers",
    },
    tips: "grab your camera, the views are amazing.",
  },
  {
    name: "Pedraforca - Low part",
    location: "Saldes",
    image: "https://cmsmultimedia.catalunya.com/mds/multimedia/3611/F1/",
    routeImage:
      "https://static-maps.alltrails.com/production/at-map/60694547/v1-trail-spain-catalonia-pr-c-123-volta-al-pedraforca-at-map-60694547-1645112132-414w200h-en-US-i-2-style_3.png",
    distance: 7,
    level: 1,
    description: "Walk in one of the most iconic mountain of Catalonia",
    estimatedDuration: 3.4,
    inventary: {
      drinks: "1L.",
      food: "Lunch",
      sportswear: "Moutain clothes(winter weather)",
      footwear: "Moutain boots",
    },
    tips: "Autumn is the best time to do this route",
  },
  {
    name: "Pedraforca - Mid part",
    location: "Saldes",
    image:
      "https://images.alltrails.com/eyJidWNrZXQiOiJhc3NldHMuYWxsdHJhaWxzLmNvbSIsImtleSI6InVwbG9hZHMvcGhvdG8vaW1hZ2UvNTI0MTI0ODEvZmI3ODc1NjIxN2ExZTRiYjg3YmZkOWJlYjlmMTc2YzQuanBnIiwiZWRpdHMiOnsidG9Gb3JtYXQiOiJqcGVnIiwicmVzaXplIjp7IndpZHRoIjo1MDAsImhlaWdodCI6NTAwLCJmaXQiOiJpbnNpZGUifSwicm90YXRlIjpudWxsLCJqcGVnIjp7InRyZWxsaXNRdWFudGlzYXRpb24iOnRydWUsIm92ZXJzaG9vdERlcmluZ2luZyI6dHJ1ZSwib3B0aW1pc2VTY2FucyI6dHJ1ZSwicXVhbnRpc2F0aW9uVGFibGUiOjN9fX0=",
    routeImage:
      "https://static-maps.alltrails.com/production/at-map/30639751/v1-trail-spain-barcelona-pr-c-127-pedraforca-360-at-map-30639751-1660231102-414w200h-en-US-i-2-style_3.png",
    distance: 7,
    level: 3,
    description: "Pure mountain route with moderate hills.",
    estimatedDuration: 3.4,
    inventary: {
      drinks: "1.5L.",
      food: "Lunch",
      sportswear: "Moutain clothes(winter weather)",
      footwear: "Moutain boots",
    },
    tips: "We recomend you trekking sticks",
  },
  {
    name: "Pedraforca - high part",
    location: "Saldes",
    image:
      "https://images.alltrails.com/eyJidWNrZXQiOiJhc3NldHMuYWxsdHJhaWxzLmNvbSIsImtleSI6InVwbG9hZHMvcGhvdG8vaW1hZ2UvMjQ2MDEyNjIvN2I0MzRjYTcyNmJhM2JkZGViOWQ3MjE3NzQyOTdmNDIuanBnIiwiZWRpdHMiOnsidG9Gb3JtYXQiOiJqcGVnIiwicmVzaXplIjp7IndpZHRoIjo1MDAsImhlaWdodCI6NTAwLCJmaXQiOiJpbnNpZGUifSwicm90YXRlIjpudWxsLCJqcGVnIjp7InRyZWxsaXNRdWFudGlzYXRpb24iOnRydWUsIm92ZXJzaG9vdERlcmluZ2luZyI6dHJ1ZSwib3B0aW1pc2VTY2FucyI6dHJ1ZSwicXVhbnRpc2F0aW9uVGFibGUiOjN9fX0=",
    routeImage:
      "https://static-maps.alltrails.com/production/at-map/63894414/v1-trail-spain-barcelona-pedraforca--2-at-map-63894414-1645060405-414w200h-en-US-i-2-style_3.png",
    distance: 10,
    level: 5,
    description: "High part with important hills.",
    estimatedDuration: 7.4,
    inventary: {
      drinks: "1.5L.",
      food: "Lunch",
      sportswear: "High Mountain clothes",
      footwear: "High Mountain boots",
    },
    tips: "Check always the weather.",
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
