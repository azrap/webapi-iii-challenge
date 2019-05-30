// code away!

//Old Code:
const server = require('./server.js')

// server.listen(9090, ()=>{
//     console.log('listening on port 9090')
// })


//The Heroku Code:
// it's recommended to load configuration for .env as early as possible


// require('dotenv').config(); // add this line as the first thing to run1

// const server = require('./api/server.js');

// we'll read the port from the server environment if it is there
// heroku will have the PORT environment variable set
const port = process.env.PORT || 6000;

// we can now use that port, if set up by heroku or read from .env or 5000 as a default if not set
server.listen(port, () => {
  console.log(`\n*** Server Running on http://localhost:5000***\n`);
});


