const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('sequelize');
const finale = require('finale-rest');
const oktaJWT = require('@okta/jwt-verifier');
require('dotenv').config();

const jwtVerify = new oktaJWT({
  clienId: process.env.OKTACLIENTID,
  issuer: process.env.OKTADOMAIN
})

let app = express();
app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => {
  if(!req.headers.authorization) {
    return next(new Error('Authorization header is required !'));
  }
  let parts = req.headers.authorization.trim().split(' ');
  let accessToken = parts.pop();
  jwtVerify.verifyAccessToken(accessToken)
    .then(jwt => {
      req.user = {
        uid: jwt.claims.uid,
        email: jwt.claims.sub
      }
      next()
    })
    .catch(next)
})

let DB = new sequelize({
  dialect: 'sqlite',
  storage: './test.sqlite'
})

let POST = DB.define('posts', {
  title: sequelize.STRING,
  body: sequelize.TEXT
})

finale.initialize({
  app: app,
  sequelize: DB
})

let userResource = finale.resource({
  model: POST,
  endpoints: ['/posts', '/posts/:id']
})

DB
  .sync({force: true})
  .then(() => {
    app.listen(8081, () => {
      console.log('listening on port 8081');
    })
  })
