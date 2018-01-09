const chai = require('chai');
const chaiHttp = require('chai-http');
const Mongoose = require('mongoose');
const app = require('../api/server');
const dbConfig = require('../db.config');


chai.use(chaiHttp);

describe('routes', () => {
  let database = null;
  before((done) => {
    Mongoose.Promise = global.Promise;
    Mongoose.connect(dbConfig.url, {
      useMongoClient: true,
    }).then((db) => {
      database = db;
      database.dropDatabase();
    }).then(() => {}).then(done, done);
  });

  afterEach(() => {
    database.dropDatabase();
  });

  describe('Links', () => {
    it('POST /links should add link', (done) => {
      const linkObject = {
        title: 'title of link',
        url: 'http://url.of.link.com',
      };
      chai.request(app)
        .post('/links')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(linkObject)
        .end((req, res) => {
          chai.expect(res.status).to.equal(200);
          chai.expect(res.body.title).to.equal('title of link');
          done();
        });
    });

    it('GET /links should return added links in array', (done) => {
      const linkObject = {
        title: 'title of link',
        url: 'http://url.of.link.com',
      };
      chai.request(app)
        .post('/links')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(linkObject)
        .end(() => {
          chai.request(app)
            .get('/links')
            .end((req, res) => {
              chai.expect(res.status).to.equal(200);
              chai.expect(res.body).to.be.a('array');
              chai.expect(res.body).to.have.lengthOf(1);
              done();
            });
        });
    });

    it('GET links/:id should return link with matching id', (done) => {
      const linkObject = {
        title: 'title of link',
        url: 'http://url.of.link.com',
      };
      chai.request(app)
        .post('/links')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(linkObject)
        .end((request, response) => {
          const linkID = response.body._id;
          chai.request(app)
            .get(`/links/${linkID}`)
            .end((req, res) => {
              chai.expect(res.status).to.equal(200);
              chai.expect(res.body).to.be.a('object');
              chai.expect(res.body._id).to.equal(linkID);
              done();
            });
        });
    });
  });

  describe('Signup', () => {
    it('POST /signup should add user', (done) => {
      const userObject = {
        username: 'myUsername',
        firstName: 'First',
        lastName: 'Last',
        email: 'unique@email.com',
        password: 'pAssw0rd!',
      };
      chai.request(app)
        .post('/signup')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(userObject)
        .end((req, res) => {
          chai.expect(res.status).to.equal(200);
          chai.expect(res.body.username).to.equal('myUsername');
          done();
        });
    });
  });

  describe('Login', () => {
    it('should validate correct password', (done) => {
      const userObject = {
        username: 'myOtherUsername',
        firstName: 'First',
        lastName: 'Last',
        email: 'aunique@email.com',
        password: 'P@ssw0rd',
      };
      chai.request(app)
        .post('/signup')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(userObject)
        .end(() => {
          chai.request(app)
            .post('/login')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({
              email: 'aunique@email.com',
              password: 'P@ssw0rd',
            })
            .end((req, res) => {
              chai.expect(res.status).to.equal(200);
              done();
            });
        });
    });

    it('should error on incorrect password', (done) => {
      const userObject = {
        username: 'myOtherUsername',
        firstName: 'First',
        lastName: 'Last',
        email: 'aunique@email.com',
        password: 'P@ssw0rd',
      };
      chai.request(app)
        .post('/signup')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(userObject)
        .end(() => {
          chai.request(app)
            .post('/login')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({
              email: 'aunique@email.com',
              password: 'P@ssw0rdz',
            })
            .end((req, res) => {
              chai.expect(res.status).to.equal(404);
              done();
            });
        });
    });
  });
});
