const router = require("express").Router()
const path = require("path")

module.exports = () => {

  ///////////////////////////////////////////////////////////
  // Do something
  ///////////////////////////////////////////////////////////
  router.route('/someroute').get((req, res, next) => {
    next()
  })

  return router
  
}