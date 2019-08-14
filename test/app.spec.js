const app = require('../app')

describe('App', () => {
  it('GET / responds with 200 containing', () => {
    return supertest(app)
      .get('/')
      .expect(200)
  })
})