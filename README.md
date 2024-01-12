# WALK AWAY REST API

## Description!!

This is a the backend repository for the React application Walk Away.

---

## Instructions

When cloning the project, change the <code>sample.env</code> file name for <code>.env</code>. The project will run on **PORT 8000**.

Then, run:

```bash
npm install
```

## Scripts

- To start the project run:

```bash
npm run start
```

- To start the project in development mode, run:

```bash
npm run dev
```

- To seed the database, run:

```bash
npm run seed
```

---

## Models

### User

Users in the database have the following properties:

```js
 {
    username: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      default:
        "https://img.freepik.com/premium-vector/male-avatar-icon-unknown-anonymous-person-default-avatar-profile-icon-social-media-user-business-man-man-profile-silhouette-isolated-white-background-vector-illustration_735449-120.jpg?w=360",
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    hashedPassword: {
      type: String,
      required: true,
    },
    experiencePoints: {
      type: Number,
      min: 0,
      default: 0,
    },
    level: {
      type: Number,
      min: 1,
      max: 5,
      default: 1,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
```

### Inventary

```js
{
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    food: {
      type: String,
      enum: ["Empty", "Lunch", "Snacks", "All day meal", "Two days meal"],
      default: "Empty",
    },
    drinks: {
      type: String,
      enum: ["Empty", "1L.", "1.5L.", "2L.", "Isotonic drink"],
      default: "Empty",
    },
    sportswear: {
      type: String,
      enum: [
        "Empty",
        "Trekking clothes (spring weather)",
        "Moutain clothes(winter weather)",
        "High Mountain clothes",
        "Long Route",
      ],
      default: "Empty",
    },
    footwear: {
      type: String,
      enum: [
        "Empty",
        "Light boots or trekking slippers",
        "Moutain boots",
        "High Mountain boots",
      ],
      default: "Empty",
    },
    other: { type: [String], default: ["Empty"] },
  },
  {
    timestamps: true,
  }
```

### Route

```js
{
    name: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default:
        "https://images.squarespace-cdn.com/content/63d00bcc43aae3657868830b/1675370946198-Z5F9F296XS071OFSOQHD/Cover-Stipple-Mountains.jpg?content-type=image%2Fjpeg",
    },
    routeImage: {
      type: String,
      default:
        "https://jalamaoutdoor.com/wp-content/uploads/2018/12/orientacion-montan%CC%83a-ppal.jpg",
    },
    distance: {
      type: Number,
      required: true,
      min: 1,
    },
    level: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    description: {
      type: String,
      required: true,
    },
    estimatedDuration: {
      type: Number,
      required: true,
      min: 1,
    },
    inventary: {
      type: {
        drinks: {
          type: String,
          enum: ["1L.", "1.5L.", "2L.", "Isotonic drink"],
          required: true,
        },
        food: {
          type: String,
          enum: ["Lunch", "Snacks", "All day meal", "Two days meal"],
          required: true,
        },
        sportswear: {
          type: String,
          enum: [
            "Trekking clothes (spring weather)",
            "Moutain clothes(winter weather)",
            "High Mountain clothes",
            "Long Route",
          ],
          required: true,
        },
        footwear: {
          type: String,
          enum: [
            "Light boots or trekking slippers",
            "Moutain boots",
            "High Mountain boots",
          ],
          required: true,
        },
      },
      required: true,
    },
    tips: {
      type: String,
      default: "No tips for this route",
    },
  },
  {
    timestamps: true,
  }
```

### SavedRoute

```js
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    routeId: {
      type: Schema.Types.ObjectId,
      ref: "Route",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "started", "finished"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
```

---

## API endpoints and usage

| Action                                       | Method | Endpoint                           | Req.body                                                                      | Private/Public  |
| -------------------------------------------- | ------ | ---------------------------------- | ----------------------------------------------------------------------------- | --------------- |
| SIGN UP user and create inventary            | POST   | /auth/signup                       | { email, password1, password2, username }                                     | Public          |
| LOG IN user                                  | POST   | /auth/login                        | { email, password }                                                           | Public          |
| Get logged in user                           | GET    | /auth/me                           |                                                                               | Private         |
| Get all users                                | GET    | /users/all                         |                                                                               | Private-admin   |
| Get a specific user                          | GET    | /users/me                          |                                                                               | Private         |
| Edit user in session                         | PUT    | /users/edit                        | { username, email, img, password1, password2 }                                | Private         |
| Delete user in session and his inventary     | DELETE | /users/delete                      |                                                                               | Private         |
| Get all routes                               | GET    | /routes/all                        |                                                                               | Public          |
| Get a specific route                         | GET    | /routes/:routeId                   |                                                                               | Private         |
| Create a new route                           | POST   | /routes/new                        | { name,location, distance, level, description, estimatedDuration, inventary } | Private - admin |
| Edit route                                   | PUT    | /routes/edit/:routeId              | {name,location,distance,level,description,estimatedDuration,inventary}        | Private - admin |
| Delete route                                 | DELETE | /routes/delete/:routeId            |                                                                               | Private - admin |
| Get the inventary from the user in session   | GET    | /inventary                         |                                                                               | Private         |
| Edit inventary from the user in session      | PUT    | /inventary/edit                    | { food, drinks, sportswear, footwear, other }                                 | Private         |
| Get all saved routes from user in session    | GET    | /saved-routes/all                  |                                                                               | Private         |
| Get single saved route from user in session  | GET    | /saved-routes/:routeId             |                                                                               | Private         |
| Create a saved route for the user in session | POST   | /saved-routes/add/:routeId         |                                                                               | Private         |
| Edit a saved route for the user in session   | PUT    | /saved-routes/edit/:savedRouteId   | { status }                                                                    | Private         |
| Delete a saved route for the user in session | DELETE | /saved-routes/delete/:savedRouteId |                                                                               | Private         |

---

## Useful links

- [Presentation slides](https://slides.com/albertovalenzuelamunoz/deck-25b4ad)
- [Frontend repository](github.com/avalen28/frontend-template-m3)
- [Frontend deploy](https://walk-away.netlify.app)
- [Deployed REST API](walkaway.fly.dev)
