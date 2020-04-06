const { expect } = require('@hapi/code')
const {
  describe,
  it
} = (module.exports.lab = require('@hapi/lab').script())
const axios = require('axios').default

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

describe('Integration test', () => {
  it('Waits untill syncope is available', async () => {
    let syncopeIsUp = false
    for (let i = 0; i < 300; i++) {
      try {
        await sleep(1000)
        console.log('Sending request to Syncope to check if it\'s up')
        const headers = {
          Authorization: 'Basic YWRtaW46cGFzc3dvcmQ=', // These are the default syncope credentials admin:password
          'Content-Type': 'application/scim+json;charset=UTF-8'
        }
        const response = await axios({
          method: 'get',
          timeout: 5000,
          url: 'http://syncope:8080/syncope/scim/v2/ServiceProviderConfig',
          headers
        })

        if (response.status === 200) {
          syncopeIsUp = true
          break
        }
      } catch (e) {
        console.log('Request failed, not online (yet) ...')
      }
    }
    expect(syncopeIsUp).be.true()
  })

  it('Test should succeed.', () => {
    expect(true).be.true()
  })
})
