import axios from 'axios'
import ow from 'ow'
import {
  API_ENDPOINT,
  API_HEADERS,
  prepareRequestData,
  handleBadResponse,
} from '../utils/mailchimp'

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
}

const isEmail = ow.string.is(e => /^.+@.+\..+$/.test(e))
const log = (...args) => console.log(`>`, ...args)

export const handler = async (event, context) => {
  log(`Kicking off signup newsletter.`)

  try {
    const { email } = JSON.parse(event.body)
    if (!ow.isValid(email, isEmail)) throw Error('Invalid email')

    log(`Sending ${email} to Mailchimp.`)
    const response = await axios.post(
      API_ENDPOINT,
      prepareRequestData({ email }),
      { headers: API_HEADERS }
    )

    handleBadResponse(response)
  } catch (err) {
    const errorMessage = err.message || err
    log(`ERROR ${errorMessage}`)

    return {
      statusCode: 403,
      headers,
      body: JSON.stringify({ status: 'failed', error: errorMessage }),
    }
  }

  log(`> ${email} successfully subscribed.`)
  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({ status: 'success' }),
  }
}
