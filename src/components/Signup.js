import React, { useState } from 'react'
import axios from 'axios'

const Signup = () => {
  const [submitted, updateSubmitted] = useState(false)
  const [error, updateError] = useState('')
  const [email, updateEmail] = useState('')

  const handleSubmit = e => {
    e.preventDefault()

    axios
      .post(
        '/.netlify/functions/signup',
        { email },
        { headers: { 'Content-Type': 'application/json' } }
      )
      .then(({ data }) => {
        if (data.status === 'success') {
          updateSubmitted(true)
          updateEmail('')
          updateError('')
        } else {
          updateError('Oops, there was an issue.')
        }
      })
      .catch(error => {
        updateError(error.response.data.error)
      })
  }

  if (submitted) return <p>You're in the know!</p>

  return (
    <form onSubmit={handleSubmit}>
      <p>Sign up for my newsletter</p>
      <div>
        <label>Email</label>
      </div>
      <input
        type="email"
        value={email}
        onChange={e => updateEmail(e.target.value)}
      />
      <button type="submit">Submit</button>
      {error && <p>{error}</p>}
    </form>
  )
}

export default Signup
