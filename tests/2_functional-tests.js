/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       (if additional are added, keep them at the very end!)
*/

var chaiHttp = require('chai-http');
var chai = require('chai');
var assert = chai.assert;
var server = require('../server');
const Issue = require('../models/Issue')

chai.use(chaiHttp);

let id
suite('Functional Tests', function () {

  suite('POST /api/issues/{project} => object with issue data', function () {

    test('Every field filled in', function (done) {
      chai.request(server)
        .post('/api/issues/test')
        .send({
          issue_title: 'Title',
          issue_text: 'text',
          created_by: 'Functional Test - Every field filled in',
          assigned_to: 'Chai and Mocha',
          status_text: 'In QA'
        })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.issue_title, 'Title')
          assert.equal(res.body.issue_text, 'text')
          assert.equal(res.body.created_by, 'Functional Test - Every field filled in')
          assert.equal(res.body.assigned_to, 'Chai and Mocha')
          assert.equal(res.body.status_text, 'In QA')
          assert.approximately(new Date(res.body.created_on).getTime(), new Date().getTime(), 5000)
          assert.approximately(new Date(res.body.updated_on).getTime(), new Date().getTime(), 5000)
          assert.equal(res.body.open, true)
          id = res.body._id
          done();
        });
    });

    test('Required fields filled in', function (done) {
      chai.request(server)
        .post('/api/issues/test')
        .send({
          issue_title: 'Title',
          issue_text: 'text',
          created_by: 'Functional Test - Required fields filled in',
        })
        .end(function (err, res) {
          assert.equal(res.status, 200)
          assert.equal(res.body.issue_title, 'Title')
          assert.equal(res.body.issue_text, 'text')
          assert.equal(res.body.created_by, 'Functional Test - Required fields filled in')
          done()
        })
    });

    test('Missing required fields', function (done) {
      chai.request(server)
        .post('/api/issues/test')
        .send({})
        .end(function (err, res) {
          assert.equal(res.status, 200)
          assert.equal(res.body.success, false)
          assert.equal(res.body.error, 'Issue Title missing')
          done()
        })
    });
  });

  suite('PUT /api/issues/{project} => text', function () {

    test('No body', function (done) {
      chai.request(server)
        .put('/api/issues/test')
        .send({
          _id: id
        })
        .end(function (err, res) {
          assert.equal(res.status, 200)
          console.log(res.body)
          assert.equal(res.body.error, "no updated field sent")
          assert.equal(res.body.success, false)
          done()
        })
    });

    test('One field to update', function (done) {
      chai.request(server)
        .put('/api/issues/test')
        .send({
          _id: id,
          issue_title: 'Updated title'
        })
        .end(function (err, res) {
          assert.equal(res.status, 200)
          assert.equal(res.body.issue_title, 'Updated title')
          done()
        })
    });

    test('Multiple fields to update', function (done) {
      chai.request(server)
        .put('/api/issues/test')
        .send({
          _id: id,
          issue_title: 'Updated title again',
          issue_text: 'Updated text',
          created_by: 'Updated by me',
          assigned_to: 'Chai and Mocha',
          status_text: 'In QA',
          open: false,
        })
        .end(function (err, res) {
          assert.equal(res.status, 200)
          assert.equal(res.body.issue_title, 'Updated title again')
          assert.equal(res.body.issue_text, 'Updated text')
          assert.equal(res.body.created_by, 'Updated by me')
          assert.equal(res.body.assigned_to, 'Chai and Mocha')
          assert.equal(res.body.status_text, 'In QA')
          assert.isFalse(res.body.open)
          done()
        })
    });

  });

  suite('GET /api/issues/{project} => Array of objects with issue data', function () {

    test('No filter', function (done) {
      chai.request(server)
        .get('/api/issues/test')
        .query({})
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.isArray(res.body);
          assert.property(res.body[0], 'issue_title');
          assert.property(res.body[0], 'issue_text');
          assert.property(res.body[0], 'created_on');
          assert.property(res.body[0], 'updated_on');
          assert.property(res.body[0], 'created_by');
          assert.property(res.body[0], 'assigned_to');
          assert.property(res.body[0], 'open');
          assert.property(res.body[0], 'status_text');
          assert.property(res.body[0], '_id');
          done();
        });
    });

    test('One filter', function (done) {
      chai.request(server)
        .get('/api/issues/test')
        .query({open: false})
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.isArray(res.body);
          assert.isAtLeast(res.body.length, 1)
          assert.property(res.body[0], '_id');
          assert.property(res.body[0], 'open');
          assert.isFalse(res.body[0].open)
          assert.equal(res.body[0]._id, id)
          done();
        });
    });

    test('Multiple filters (test for multiple fields you know will be in the db for a return)', function (done) {
      chai.request(server)
        .get('/api/issues/test')
        .query({
          issue_title: 'Updated title again',
          created_by: 'Functional Test - Required fields filled in',
        })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.isArray(res.body);
          assert.equal(res.body.length, 2)
          assert.equal(res.body[0].issue_title, 'Updated title again')
          assert.equal(res.body[1].created_by, 'Functional Test - Required fields filled in')
          done();
        });
    });

  });

  suite('DELETE /api/issues/{project} => text', function () {

    test('No _id', function (done) {

    });

    test('Valid _id', function (done) {

    });

  });

});
