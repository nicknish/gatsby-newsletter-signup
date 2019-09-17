import ow from 'ow'

/* EDIT THESE ENV VARIABLES IN NETLIFY */
const mailChimpAPI = process.env.MAILCHIMP_API_KEY
const mailChimpListID = process.env.MAILCHIMP_LIST_ID
const mcRegion = process.env.MAILCHIMP_REGION

ow(
  mailChimpAPI,
  'MAILCHIMP_API_KEY environment variable is not set',
  ow.string.minLength(1)
)
ow(
  mailChimpListID,
  'MAILCHIMP_LIST_ID environment variable is not set',
  ow.string.minLength(1)
)
ow(
  mcRegion,
  'MAILCHIMP_REGION environment variable is not set',
  ow.string.minLength(1)
)

export const API_ENDPOINT = `https://${mcRegion}.api.mailchimp.com/3.0/lists/${mailChimpListID}/members`
export const API_HEADERS = {
  Authorization: `apikey ${mailChimpAPI}`,
  'Content-Type': 'application/json',
}

export const prepareRequestData = ({ email }) => ({
  email_address: email,
  status: 'subscribed',
  merge_fields: {},
})

export const handleBadResponse = request => {
  const { error, status, data } = request
  if (error || status >= 300 || data.title !== 'Member Exists') {
    throw Error(error || data.detail)
  }
}
