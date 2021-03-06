require('dotenv').config();
const express = require('express');

const mongoose = require('mongoose');
const config = require('config');
const chalk = require('chalk');

const setMiddleware =require('./middleware/middleware')
//import routes
const setRoutes = require('./routes/routes')


const MONGODB_URI=`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.jolmh.mongodb.net/nahid-blog?retryWrites=true&w=majority`


const app = express();

//setup view engine
app.set('view engine', 'ejs');
app.set('views', 'views');

//using middleware from middleware directory

setMiddleware(app);

//using routes from route directory

setRoutes(app)

app.use((req, res, next) =>{
  let error=new Error('404 page not found')
  error.status=404
  next(error)
})

app.use((error,req, res, next) =>{
if(error.status===404){
  return res.render('pages/error/404', {flashMessage:{}})
}
console.log(chalk.red.inverse(error.message))
console.log(error)
res.render('pages/error/500', {flashMessage:{}})
})

const port = process.env.PORT || 5000;

mongoose.connect(MONGODB_URI,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log(chalk.yellow('database connected'));
    app.listen(port, () => {
      console.log(chalk.green.inverse(`server is listening on port ${port}`));
    });
  })
  .catch((err) => {
    return console.log(err);
  });
