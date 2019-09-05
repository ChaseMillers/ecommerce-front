const { expect } = require('chai')
const knex = require('knex')
const app = require('../src/app')

describe('auth Endpoints', function() {
  let db

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL,
    })
    app.set('db', db)
  })

  after('disconnect from db', () => db.destroy())

  before('clean the table', () => db('auth').truncate())

  afterEach('cleanup',() => db('auth').truncate())

  describe(`GET /api/signout`, () => {
    context(`signs user out`, () => {
           it(`responds with 200, ok: true and redirected: false`, () => {
             return supertest(app)
               .get('/signout')
               .expect(200)
           })
         })
  })

  describe(`POST /api/signin`, () => {
      it(`signs in user, responding with 200`,  function() {
        const feilds = {
          signup, 
          signin, 
          signout, 
        } = require('../controllers/auth') 
        return supertest(app)
          .post('/signin', signin)
          .send(feilds)
          .expect(200)
    })
    })
    
  describe(`POST /api/signup`, () => {
    it(`signs user up, responding with 200`,  function() {
      const feilds = {
        signup, 
        signin, 
        signout, 
      } = require('../controllers/auth') 
      return supertest(app)
        .post('/signup', signin)
        .send(feilds)
        .expect(200)
  })
  })
})