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

  describe(`GET /api/user/:userId`, () => {
    context(`shows user info, user must be signed in to work`, () => {
           it(`responds with 200, ok: true and redirected: false`, () => {
             return supertest(app)
               .get('/api/user/5d445617be01af14849e0a07')
               .expect(200)
           })
         })
  })
  describe(`GET /api/secret/:userId`, () => {
    context(`shows user info, user must be signed AND be a admin to work`, () => {
           it(`responds with 200, ok: true and redirected: false`, () => {
             return supertest(app)
               .get('/api/secret/5d445617be01af14849e0a07')
               .expect(200)
           })
         })
  })
  describe(`GET /api/orders/by/user/:userId`, () => {
    context(`shows user purchase history, user must be signed in to work`, () => {
           it(`responds with 200`, () => {
             return supertest(app)
               .get('/api/orders/by/user/5d445617be01af14849e0a07')
               .expect(200)
           })
         })
  })

  describe(`Put /api/signin`, () => {
      it(`It updates user info, responding with 200`,  function() {
        const feilds = {
            "name": "The Testing Man"
        }
        return supertest(app)
          .put('/api/user/5d445617be01af14849e0a07')
          .send(feilds)
          .expect(200)
    })
    })
    
})
