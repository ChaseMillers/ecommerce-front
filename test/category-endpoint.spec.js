const { expect } = require('chai')
const knex = require('knex')
const app = require('../src/app')

describe('Category Endpoints', function() {
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
    context(`Lists all categorys`, () => {
           it(`responds with 200 Ok`, () => {
             return supertest(app)
               .get("/api/categories")
               .expect(200)
           })
         })
  })
  describe(`GET /api/category/:categoryId`, () => {
    context(`Gets info on specific category`, () => {
           it(`responds with 200 Ok`, () => {
             const categoryId = "5d38a949877e7c0bcce5ec62"
             return supertest(app)
               .get(`/api/category/${categoryId}`)
               .expect(200)
           })
         })
  })

  describe(`POST /api/category/create/:userId`, () => {
      it(`Posts category for user, responding with 200`,  function() {
        const feilds = {
            "name": "TestCategory"
        } 
        return supertest(app)
          .post("/api/category/create/5d3a1a68653855394cd271e7")
          .send(feilds)
          .expect(200)
    })
    })
    
    describe.only(`DELETE /api/category/:categoryId/:userId`, () => {
        context(`deletes category`, () => {
             it('responds with 204 and removes the Category', () => {
               const idToRemove = "5d7155f078cd0800246ff01c"
               return supertest(app)
                 .delete(`/api/category/${idToRemove}/5d3a1a68653855394cd271e7/`)
                 .expect(204)
             })
           })
      })
})