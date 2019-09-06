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

  describe(`GET /api/prodcuts`, () => {
    context(`Lists all prodcuts`, () => {
           it(`responds with 200 Ok`, () => {
             return supertest(app)
               .get("/api/prodcuts")
               .expect(200)
           })
         })
  })
  describe(`GET api/products/related/:productId`, () => {
    context(`Gets info on specific category`, () => {
           it(`responds with 200 Ok`, () => {
             const productId = "5d61920701adbc0024b239ef"
             return supertest(app)
               .get(`/api/products/related/${productId}`)
               .expect(200)
           })
         })
  })
  describe(`GET api/products/categories`, () => {
    context(`shows categorys related to products`, () => {
           it(`responds with 200 Ok`, () => {
             const categoryId = "5d61920701adbc0024b239ef"
             return supertest(app)
               .get(`/api/products/categories`)
               .expect(200)
           })
         })
  })
  describe(`GET api/product/photo/:productId`, () => {
    context(`Gets product picture`, () => {
           it(`responds with 200 Ok`, () => {
             const productId = "5d61920701adbc0024b239ef"
             return supertest(app)
               .get(`/api/product/photo/${productId}`)
               .expect(200)
           })
         })
  })
  describe(`GET api/product/:productId`, () => {
    context(`Gets all product info`, () => {
           it(`responds with 200 Ok`, () => {
             const productId = "5d61920701adbc0024b239ef"
             return supertest(app)
               .get(`/api/product/${productId}`)
               .expect(200)
           })
         })
  })

  describe(`POST api/product/create/:userId`, () => {
      it(`Posts product, responding with 200`,  function() {
        const feilds = {
            "name": "TestCategory",
            "description": "testing is so much fun",
            "price": 1000.00,
            "category":"5d38a949877e7c0bcce5ec62",
            "shipping":false,
            "quantity": 15,
            "photo":null
        } 
        return supertest(app)
          .post("/api/product/create/5d3a1a68653855394cd271e7")
          .send(feilds)
          .expect(200)
    })
    })
    describe(`PUT api/product/create/:userId`, () => {
        it(`Posts product, responding with 200`,  function() {
          const feilds = {
              "name": "TestCategory-Changed",
              "description": "testing is sooooooo much fun",
              "price": 10.00,
              "category":"5d38a949877e7c0bcce5ec62",
              "shipping":false,
              "quantity": 10,
              "photo":null
          } 
          return supertest(app)
            .put("/api/product/5d3a1a68653855394cd271e7")
            .send(feilds)
            .expect(200)
      })
      })
    
    describe.only(`DELETE /api/product/:productId/:userId`, () => {
        context(`deletes product`, () => {
             it('responds with 204 and removes product', () => {
               const idToRemove = "5d7155f078cd0800246ff01c"
               return supertest(app)
                 .delete(`/api/product/${idToRemove}/5d3a1a68653855394cd271e7/`)
                 .expect(204)
             })
           })
      })
})