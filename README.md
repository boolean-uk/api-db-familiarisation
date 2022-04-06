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

3. Create our index.js file. This is our entrypoint - the source file that will start running our server.
4. 
```//Include the express library
const express = require("express")
//Include the morgan middleware
const morgan = require("morgan")
//Include the cors middleware
const cors = require("cors")

//Create a new express application
const app = express()

//Tell express we want to use the morgan library
app.use(morgan("dev"))
//Tell express we want to use the cors library
app.use(cors())

//Start up our server
const port = 3030
app.listen(port, () => {
 console.log(`Server is running on http://localhost:${port}/`)
})
```

4. Update package.json "scripts" with the following:
```
"scripts": {
   "start" : "nodemon index.js"
},
```
5. Start server `npm start`
