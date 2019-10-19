const request = require('supertest')
const { server } = require('../app')
const LocationSchema = require('../models/Locations')
const locations = require('../_data/locations')

describe('/api/v1/locations', () => {

  // locationZero
  const locationZero = locations[0]
  // locationOne
  const locationOne = locations[1]


  beforeEach(async () => {
    // reset server connection
    await server.close()
    await server.listen()

    // delete all locations
    await LocationSchema.deleteMany()

    // save locations
    await new LocationSchema(locationZero).save()
    await new LocationSchema(locationOne).save()
  })

  describe('GET /api/v1/locations', () => {

    it('should respond 200, and return all locations', async () => {

      await request(server)
        .get('/api/v1/locations')
        .expect(200)

      const foundLocations = await LocationSchema.find()
      expect(foundLocations.length).toBe(2)
    })
  })
})
