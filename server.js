// server.js
const jsonServer = require('json-server');
const express = require('express');
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()
 
server.use(middlewares)
server.use('http://localhost:3000/users', router)
server.listen(process.env.PORT || 5000, () => {
  console.log('JSON Server is running')
})
