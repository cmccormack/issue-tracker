const router = require("express").Router()
const path = require("path")
const { body, validationResult, } = require('express-validator/check')
const { sanitizeBody, } = require('express-validator/filter')
const Issue = require('../models/Issue')
const ObjectId = require('mongoose').Types.ObjectId


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


  ///////////////////////////////////////////////////////////
  // Validations
  ///////////////////////////////////////////////////////////
  const issue_form_validation = [
    body('issue_title')
      .trim()
      .isLength({ min: 3, })
      .withMessage('Issue Title should be at least 4 characters')
      .isAscii()
      .withMessage('Issue Title should include only valid ascii characters'),

    body('issue_text')
      .trim()
      .isLength({ min: 3, })
      .withMessage('Issue Text should be at least 4 characters')
      .isAscii()
      .withMessage('Issue Text should include only valid ascii characters'),

    body('created_by')
      .trim()
      .isLength({ min: 2, })
      .withMessage('Created By Name should be at least 3 characters')
      .isAscii()
      .withMessage('Created By Name should include only valid ascii characters'),

    body('assigned_to')
      .optional({ checkFalsy: true, })
      .trim()
      .isLength({ min: 2, })
      .withMessage('Assigned To Name should be at least 3 characters')
      .isAscii()
      .withMessage('Assigned To Name should include only valid ascii characters'),

    body('status_text')
      .optional({ checkFalsy: true, })
      .trim()
      .isLength({ min: 2, })
      .withMessage('Status Text should be at least 3 characters')
      .isAscii()
      .withMessage('Status Text should include only valid ascii characters'),

    sanitizeBody('issue_title').trim(),
    sanitizeBody('issue_text').trim(),
    sanitizeBody('created_by').trim(),
    sanitizeBody('assigned_to').trim(),
    sanitizeBody('status_text').trim(),
  ]

  const issue_id_validation = [
    body('_id')
      .trim()
      .isLength({ min: 1, })
      .withMessage('Issue ID should be at least 1 character')
      .isAscii()
      .withMessage('Issue ID should include only valid ascii characters'),
  ]


  ///////////////////////////////////////////////////////////
  // Manage Issue Add/Update/Delete
  ///////////////////////////////////////////////////////////
  router.route('/issues/:project_name')

    // ** POST ** request
    .post(issue_form_validation, (req, res, next) => {

      // Check validation and exit early if unsuccessful 
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return next(Error(errors.array()[0].msg))
      }

      const { issue_title, issue_text, created_by, assigned_to, status_text } = req.body
      const { project_name } = req.params

      const issue = new Issue({
        project_name,
        issue_title,
        issue_text,
        created_by,
        assigned_to,
        status_text
      })

      issue.save((err, doc) => {
        if (err) { return next(Error(err)) }

        const response = doc.toObject()
        delete response.__v
        // console.log('saved!', response)
        res.json(response)
      })

    })


    // ** PUT ** request
    .put(issue_id_validation, issue_form_validation, async (req, res, next) => {

      // Check validation and exit early if unsuccessful
      const idErrors = validationResult(req).array().filter(error => error.param === 'id')
      if (idErrors.length > 0) {
        console.log(idErrors)
        return next(Error(idErrors[0].msg))
      }

      const update = {...req.body}
      const id = ObjectId(req.body.id)

      // Strip unchanged properties from body for update
      Object.keys(update).forEach(param => (!update[param] || param === '_id') && delete update[param])

      const issue = await Issue.findByIdAndUpdate(id, update, {new: true})

      res.json({success: true, issue: issue.toObject()})

    })


    // ** DELETE ** request
    .delete((req, res, next) => {
      console.warn('Endpoint not yet built')
      next()
    })

    // ** GET ** request
    .get((req, res, next) => {

      const {project_name} = req.params
      
      Issue.find({project_name})
      .exec((err, issues) => {
        if (err) { return Error(err.message) }

        res.json(issues)
      })
    })

  return router
  
}