const router = require("express").Router()
const path = require("path")
const { body, validationResult, } = require('express-validator/check')
const { sanitizeBody, } = require('express-validator/filter')


module.exports = () => {

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
      .withMessage('Status Text should be at least 1 characters')
      .isAscii()
      .withMessage('Status Text should include only valid ascii characters'),
  ]

  ///////////////////////////////////////////////////////////
  // Do something
  ///////////////////////////////////////////////////////////
  router.route('/issues/')
    .post(issue_form_validation, (req, res, next) => {

      const errors = validationResult(req)
      console.log(errors.array())
      const { title, text, createdBy, assignedTo, statusText } = req.body

      res.json({success: true, ...req.body})
    })

    .put((req, res, next) => {
      next()
    })

    .delete((req, res, next) => {
      next()
    })

    .get((req, res, next) => {
      next()
    })

  return router
  
}