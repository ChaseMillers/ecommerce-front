const { expect } = require('chai')
const knex = require('knex')
const app = require('../src/app')

describe('Order Endpoints', function() {
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

  describe(`GET /order/list/:userId`, () => {
    context(`Reads list of orders from user`, () => {
           it(`responds with "Access denied"`, () => {
            const userId = "5d3a1a68653855394cd271e7" 
            return supertest(app)
               .get(`/api/order/list/${userId}`)
               .expect("Access denied")
           })
         })
  })
  describe(`GET /order/status-values/:userId`, () => {
    context(`Reads order status`, () => {
           it(`responds with "Access denied"`, () => {
            const userId = "5d3a1a68653855394cd271e7" 
            return supertest(app)
               .get(`/api/order/list/${userId}`)
               .expect("Access denied")
           })
         })
  })

})