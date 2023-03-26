require("dotenv").config();
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
const User = require("../models/User");

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



mongoose
  .connect(process.env.MONGO_URL)
  .then((x) => console.log(`Connected to ${x.connection.name}`))
  .then(() => {
    return User.deleteMany({});
  })
  .then(() => {
    return User.create(usersArr);
  })
  .then((created) => {
    console.log(`Created ${created.length} Users Seed done 🌱`);
  })
  .catch((e) => console.log("error connecting Mongo", e))
  .finally(() => {
    console.log("Closing connection");
    mongoose.connection.close();
  });

// Run npm run seed
