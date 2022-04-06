# teacher-api-db-familiarisation

## To set up a new express application follow these steps.
1. Install express & nodemon, You can accept all the defaults.

```
npm init
npm install express
npm install --save-dev nodemon
```

2. Install morgan middleware & cors. Morgan (express middleware) server automatically logs all requests. Cors allows us to make HTTP requests to our API using fetch from the browser.

```
npm install morgan
npm install cors
```

3. Create index.js file entrypoint that will start running your server. Include below code for express requests:
```js
const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const port = 3030
const app = express()

// Middleware
app.use(morgan("dev"))
app.use(cors())
app.use(express.json());

// Modular/Sub Routers
const usersRoutes = require('./src/routers/users');

// Add Routers to APP
// Express automatically adds "users" as a prefix - so we don't need to
// include it in the router itself
app.use('/users', usersRoutes);

// Start Server
app.listen(port, () => {
 console.log(`Server is running on http://localhost:${port}/`)
})
```

4. There is a user.js file inside src/routers which has your modular router for users, theres is also a data.js.

5. Update package.json "scripts" with the following:
```js
"scripts": {
   "start" : "nodemon index.js"
},
```

6. Start server `npm start`

## To make http requests install either:
- [Insomnia](https://insomnia.rest/download)
- [Postman](https://www.postman.com/downloads/)
- use the url's suggested in the index.js code above.

## Set up Elepehant SQL
- [elephant sql](https://www.elephantsql.com/)
- more info here [elephant sql exercise](https://github.com/boolean-uk/api-express-database)

## Prisma setup with Elephant SQL
1. install prisma `npm install prisma typescript ts-node @types/node --save-dev`
2. initialise prisma `npx primsa init` this will give you a `prisma folder` inside here is `schema.prisma` file you can add models there.
see [prisma docs](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases-typescript-postgres)
3. inside`prisma folder` add a `seed.js` file and add the following code: 
```js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seed() {
  const createdCustomer = await prisma.customer.create({
    data: {
      name: 'Alice',
      contacts: {
        create: {
          phone: '07777123456',
          email: 'example@examp.com',
        },
      },
    },
  });
  console.log('Customer created', createdCustomer);
  process.exit(0);
}

seed().catch(async (error) => {
  console.error(error);
  await prisma.$disconnect();
  process.exit(1);
});
``` 
4. add these two models into schema.prisma:
```js
model Customer {
  id        Int      @id @default(autoincrement())
  name      String
  contacts  Contact?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Contact {
  id         Int       @id @default(autoincrement())
  phone      String
  email      String
  customerId Customer? @relation(fields: [id], references: [id])
  createdAt  DateTime  @default(now())
  updatedAt  DateTime  @updatedAt
}
```

## Prisma setup with Elephant SQL
1. Create two databases in Elephant sql : a 'primary database' and 'shadow database'
2. On the browser tab in elephant sql type `CREATE SCHEMA Primary` then hit 'Execute button, repeat for shadow.
3. In your `.env` file add two variables `DATABASE_URL` and `SHADOW_DATABASE_URL`
4. From the 'browser' tab in elephant sql copy the urls and append `?schema=shadow` and add to `.env` e.g. 
`SHADOW_DATABASE_URL="postgres://ousbbtre:LUm-kxs4NHk9JFBVS6TCX8miouU21PpQ@manny.db.elephantsql.com/ousbbtre?schema=shadow"`
8. In terminal run `npx prisma migrate reset` to execute the existing migration & data seed. Press y when it asks if you're sure.
- more info here [database orm exercise](https://github.com/boolean-uk/database-orm)
