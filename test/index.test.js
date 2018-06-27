process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const {app} = require('../index')

let should = chai.should()
chai.use(chaiHttp)

describe('Backend Index', () => {

    // GET /login/:userId
    describe('GET /login/:userId', () => {
        it('it should allow an existing user to login', done => {
            chai
                .request(app)
                .get('/login/1')
                .end((err, res) => {
                    res
                        .should
                        .have
                        .status(200)
                    res
                        .body
                        .should
                        .be
                        .a('object')
                    res
                        .body
                        .should
                        .have
                        .property('response')
                        .eql('success')
                    res
                        .body
                        .should
                        .have
                        .property('userId')
                        .eql(1)
                    done();
                })
        })
        it('it should deny a user that does not exist', done => {
            chai
                .request(app)
                .get('/login/100')
                .end((err, res) => {
                    res
                        .should
                        .have
                        .status(404)
                    res
                        .body
                        .should
                        .be
                        .a('object')
                    res
                        .body
                        .should
                        .have
                        .property('response')
                        .eql('failure')
                    res
                        .body
                        .should
                        .have
                        .property('userId')
                        .eql(null)
                    done();
                })
        })
        it('it should deny a userId that is not a number', done => {
            chai
                .request(app)
                .get('/login/helloworld')
                .end((err, res) => {
                    res
                        .should
                        .have
                        .status(404)
                    res
                        .body
                        .should
                        .be
                        .a('object')
                    res
                        .body
                        .should
                        .have
                        .property('response')
                        .eql('failure')
                    res
                        .body
                        .should
                        .have
                        .property('userId')
                        .eql(null)
                    done();
                })
        })
    })

    // POST /rating
    describe('POST /rating', () => {
        it('it should create a tuple representing the users rating', done => {
            let ratingObj = {
                userId: 1,
                contentId: 2,
                rating: 3
            }
            chai
                .request(app)
                .post('/rating')
                .query(ratingObj)
                .end((err, res) => {
                    res
                        .should
                        .have
                        .status(200)
                    res
                        .body
                        .should
                        .be
                        .a('object')
                    res
                        .body
                        .should
                        .have
                        .property('response')
                        .eql('success')
                    done();
                })
        })
        it('it should deny a request with a nonexistant userId', done => {
            let ratingObj = {
                userId: 10,
                contentId: 2,
                rating: 3
            }
            chai
                .request(app)
                .post('/rating')
                .query(ratingObj)
                .end((err, res) => {
                    res
                        .should
                        .have
                        .status(404)
                    res
                        .body
                        .should
                        .be
                        .a('object')
                    res
                        .body
                        .should
                        .have
                        .property('response')
                        .eql('failure')
                    done();
                })
        })
        it('it should deny a request with a nonexistant contentId', done => {
            let ratingObj = {
                userId: 1,
                contentId: 10,
                rating: 3
            }
            chai
                .request(app)
                .post('/rating')
                .query(ratingObj)
                .end((err, res) => {
                    res
                        .should
                        .have
                        .status(404)
                    res
                        .body
                        .should
                        .be
                        .a('object')
                    res
                        .body
                        .should
                        .have
                        .property('response')
                        .eql('failure')
                    done();
                })
        })
        it('it should deny a request with an inappropriate rating score', done => {
            let ratingObj = {
                userId: 1,
                contentId: 2,
                rating: 8
            }
            chai
                .request(app)
                .post('/rating')
                .query(ratingObj)
                .end((err, res) => {
                    res
                        .should
                        .have
                        .status(400)
                    res
                        .body
                        .should
                        .be
                        .a('object')
                    res
                        .body
                        .should
                        .have
                        .property('response')
                        .eql('failure')
                    done();
                })
        })

    })

    // GET /rating/:contentId
    describe('GET /rating/:contentId', () => {
        it('it should respond with the contentId and rating of a content that exists', done => {
            chai
                .request(app)
                .get('/rating/1')
                .end((err, res) => {
                    res
                        .should
                        .have
                        .status(200)
                    res
                        .body
                        .should
                        .be
                        .a('object')
                    res
                        .body
                        .should
                        .have
                        .property('response')
                        .eql('success')
                    res
                        .body
                        .should
                        .have
                        .property('contentId')
                        .eql(1)
                    res
                        .body
                        .should
                        .have
                        .property('rating')
                        .eql(3)
                    done()
                })
        })
        it('it should fail if contentId does not exist', done => {
            chai
                .request(app)
                .get('/rating/100')
                .end((err, res) => {
                    res
                        .should
                        .have
                        .status(404)
                    res
                        .body
                        .should
                        .be
                        .a('object')
                    res
                        .body
                        .should
                        .have
                        .property('response')
                        .eql('failure')
                    done()
                })
        })
    })

    // GET /content
    describe('GET /content', () => {
        it('it should respond with a list of content (no matter what as there is no input)', done => {
            chai
                .request(app)
                .get('/content')
                .end((err, res) => {
                    res
                        .should
                        .have
                        .status(200)
                    res
                        .body
                        .should
                        .have
                        .property('content')
                        .be
                        .a('array')
                    done()
                })
        })
    })
})
