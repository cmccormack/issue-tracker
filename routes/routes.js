

module.exports = (app) => {

  ///////////////////////////////////////////////////////////
  // Testing/Debug Middleware
  ///////////////////////////////////////////////////////////
  app.use((req, res, next) => {
    const { user = { username: null, }, } = req
    console.debug(`DEBUG originalUrl: ${req.originalUrl}`)
    next()
  })

  const apiRouter = require('./api')()


  ///////////////////////////////////////////////////////////
  // API
  ///////////////////////////////////////////////////////////
  app.use("/api", apiRouter)


  ///////////////////////////////////////////////////////////
  // Root Router Handler, Serves Pug rendered index
  ///////////////////////////////////////////////////////////
  app.route('/')
    .get((req, res, next) => {
      res.render('index', {
      title: "Issue Tracker",
      header: "Issue Tracker"
      })
    })


  ///////////////////////////////////////////////////////////
  // Error Handler
  ///////////////////////////////////////////////////////////
  app.use((err, req, res, next) => {
    console.error(err.message)

    res.send(err.message)
  })
}