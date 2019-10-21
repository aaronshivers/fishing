const fetch = require('node-fetch')

module.exports = geoCoder = async address => {

  try {

    const encodedAddress = (encodeURIComponent(address.trim()))
    const url = `http://www.mapquestapi.com/geocoding/v1/address?location=${ encodedAddress }&key=${ process.env.GEOCODE_API_KEY }`
    const res = await fetch(url)
    const json = await res.json()

    return {
      formattedAddress: json.results[0].providedLocation.location,
      latitude: json.results[0].locations[0].displayLatLng.lat,
      longitude: json.results[0].locations[0].displayLatLng.lng,
      street: json.results[0].locations[0].street,
      city: json.results[0].locations[0].adminArea5,
      state: json.results[0].locations[0].adminArea3,
      zipCode: json.results[0].locations[0].postalCode,
      country: json.results[0].locations[0].adminArea1,
    }
  } catch (error) {
    console.error(error.message)
  }
}
