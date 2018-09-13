const router = require("express").Router()
const path = require("path")
const { body, validationResult, } = require('express-validator/check')
const { sanitizeBody, } = require('express-validator/filter')
const Issue = require('../models/Issue')


module.exports = () => {

  ///////////////////////////////////////////////////////////
  // Utility Endpoints
  ///////////////////////////////////////////////////////////
  router.get("/wipeissues", (req, res) => {
    Issue.deleteMany({}, err => {
      if (err) return Error(err.message)
      const message = "Successfully wiped 'issues' collection"
      res.json({ success: true, message, })
    })
  })

  const issue_form_validation = [
    body('title')
      .trim()
      .isLength({ min: 3, })
      .withMessage('Title should be at least 4 characters')
      .isAscii()
      .withMessage('Title should include only valid ascii characters'),

    body('text')
      .trim()
      .isLength({ min: 3, })
      .withMessage('Issue Text should be at least 4 characters')
      .isAscii()
      .withMessage('Issue Text should include only valid ascii characters'),

    body('createdBy')
      .trim()
      .isLength({ min: 2, })
      .withMessage('Created By Name should be at least 3 characters')
      .isAscii()
      .withMessage('Created By Name should include only valid ascii characters'),

    body('assignedTo')
      .optional({ checkFalsy: true, })
      .trim()
      .isLength({ min: 2, })
      .withMessage('Assigned To Name should be at least 3 characters')
      .isAscii()
      .withMessage('Assigned To Name should include only valid ascii characters'),

    body('statusText')
      .optional({ checkFalsy: true, })
      .trim()
      .isLength({ min: 2, })
      .withMessage('Status Text should be at least 3 characters')
      .isAscii()
      .withMessage('Status Text should include only valid ascii characters'),

    sanitizeBody('title').trim(),
    sanitizeBody('text').trim(),
    sanitizeBody('createdBy').trim(),
    sanitizeBody('assignedTo').trim(),
    sanitizeBody('statusText').trim(),
  ]

  const issue_id_validation = [
    body('id')
      .trim()
      .isLength({ min: 1, })
      .withMessage('Issue ID should be at least 1 character')
      .isAscii()
      .withMessage('Issue ID should include only valid ascii characters'),
  ]

  ///////////////////////////////////////////////////////////
  // Manage Issue Add/Update/Delete
  ///////////////////////////////////////////////////////////
  router.route('/issues/:project')

    // ** POST ** request
    .post(issue_form_validation, (req, res, next) => {

      // Check validation and exit early if unsuccessful
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return next(Error(errors.array()[0].msg))
      }

      const { title, text, createdBy, assignedTo, statusText } = req.body
      const { project } = req.params

      const issue = new Issue({
        project,
        title,
        text,
        createdBy,
        assignedTo,
        statusText
      })

      issue.save(err => {
        if (err) { return next(Error(err)) }

        console.log('saved!')
        res.json({success: true, ...req.body, project})
      })

    })

    // ** PUT ** request
    .put(issue_form_validation, issue_id_validation, (req, res, next) => {

      // Check validation and exit early if unsuccessful
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        console.log(errors.array())
        return next(Error(errors.array()[0].msg))
      }

      res.json({ success: true, ...req.body })
    })

    // ** DELETE ** request
    .delete((req, res, next) => {
      console.warn('Endpoint not yet built')
      next()
    })

    // ** GET ** request
    .get((req, res, next) => {

      const {project} = req.params
      
      Issue.find({project})
      .exec((err, issues) => {
        if (err) { return Error(err.message) }

        res.json(issues)
      })
    })

  return router
  
}