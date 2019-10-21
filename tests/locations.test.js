const request = require('supertest')
const { server } = require('../app')
const LocationSchema = require('../models/Locations')
const locations = require('../_data/locations')
const {ObjectID} = require('mongodb')

describe('/api/v1/locations', () => {

  // locationZero
  const { _id: idZero, user: userZero, ...locationZero } = locations[0]
  // locationOne
  const { _id: idOne, user: userOne, ...locationOne } = locations[1]


  beforeEach(async () => {
    // reset server connection
    await server.close()
    await server.listen()

    // delete all locations
    await LocationSchema.deleteMany()

    // save locations
    await new LocationSchema(locationZero).save()
    // await new LocationSchema(locationOne).save()
  })

  // initialize response variable
  let response

  // GET /api/v1/locations
  describe('GET /api/v1/locations', () => {

    // make GET request
    beforeEach(() => {
      response = request(server)
        .get('/api/v1/locations')
    })

    it('should respond 200', async () => await response.expect(200))

    it('should find 1 entry', async () => {

      const foundLocations = await LocationSchema.find()
      expect(foundLocations.length).toBe(1)
    })
  })

  // GET /api/v1/locations
  describe('POST /api/v1/locations', () => {

    beforeEach(() => {
      response = request(server)
        .post('/api/v1/locations')
    })

    describe('and no data is passed', () => {

      it('should respond 400', async () => {

        await response
          .send()
          .expect(400)
      })

      it('should find 1 location', async () => {

        await response
          .send()

        const foundLocations = await LocationSchema.find()
        expect(foundLocations.length).toBe(1)
      })
    })

    // TODO: create test
    describe('and invalid data is passed', () => {
    })

    describe('and valid data is passed', () => {

      describe('and the entry already exists', () => {

        it('should respond 400', async () => {

          await response
            .send(locationZero)
            .expect(400)
        })

        it('should find 1 location', async () => {

          await response
            .send(locationZero)

          const foundLocations = await LocationSchema.find()
          expect(foundLocations.length).toBe(1)
        })
      })

      describe('and the entry does not already exists', () => {

        it('should respond 201', async () => {

          await response
            .send(locationOne)
            .expect(201)
        })

        it('should find 2 entries', async () => {

          await response
            .send(locationOne)

          const foundLocations = await LocationSchema.find()
          expect(foundLocations.length).toBe(2)
        })
      })
    })
  })

  // TODO: complete tests
  describe('DELETE /api/v1/locations/:id', () => {

    describe('and the id is invalid', () => {

      beforeEach(() => {
        response = request(server)
          .delete('/api/v1/locations/1234')
      })

      it('should respond 404', async () => response.expect(404))

      it('should not delete anything', async () => {

        const foundLocations = await LocationSchema.find()
        expect(foundLocations.length).toBe(1)
      })
    })

    describe('and the id is valid', () => {

      describe('and the ID is not in the DB', () => {

        beforeEach(() => {
          response = request(server)
            .delete(`/api/v1/locations/${ new ObjectID }`)
        })

        it('should respond 404', async () => response.expect(404))

        it('should not delete anything', async () => {

          const foundLocations = await LocationSchema.find()
          expect(foundLocations.length).toBe(1)
        })
      })

      describe('and the ID is in the DB', () => {

        beforeEach(async () => {
          response = request(server)
            .delete(`/api/v1/locations/${idZero}`)
          console.log(idZero)
          const foundLocations = await LocationSchema.find()
          console.log(foundLocations)
        })

        it('should respond 201', async () => response.expect(201))

        it('should delete the entry with the specified id', async () => {

          const foundLocations = await LocationSchema.find()
          expect(foundLocations.length).toBe(0)
        })
      })
    })
  })
})
