const { expect } = require('chai')
const knex = require('knex')
const app = require('../src/app')

describe('braintree Endpoints', function() {
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

  describe(`GET api/braintree/getToken/:userId`, () => {
    context(`gets ID of user for payment info`, () => {
           it(`responds with 200`, () => {
            const userId = "5d3a1a68653855394cd271e7"
             return supertest(app)
               .get(`/api/braintree/getToken/${userId}`)
               .expect(200)
           })
         })
  })
    
})