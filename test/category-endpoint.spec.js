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

  describe(`GET /api/categories`, () => {
    context(`Reads categorys for products`, () => {
           it(`responds with 200 Ok`, () => {
            const {
                create,
                categoryById,
                read,
                update,
                remove,
                list
            } = require("../controllers/category");
             return supertest(app)
               .get("/categories", list)
               .expect(200)
           })
         })
  })

  describe(`POST /category/create/:userId`, () => {
      it(`Posts category for user, responding with 200`,  function() {
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