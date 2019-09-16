import React, { useState } from "react"

const Signup = () => {
  const [submitted, updateSubmitted] = useState(false)
  const [error, updateError] = useState("")
  const [email, updateEmail] = useState("")

  const handleSubmit = () => {
    /* TODO: Submit email to Mailchimp */
    /* If error, then update error and display it */
    /* Else clear email field and show submitted */
    updateEmail("")
    updateSubmitted(true)
  }

  return (
    <form onSubmit={handleSubmit}>
      <p>Sign up for my newsletter</p>
      <div>
        <label>Email</label>
      </div>
      <input type="email" value={email} onChange={updateEmail} />

      {submitted && <p>You're in the know!</p>}
      {error && !submitted(<p>Please enter a valid email.</p>)}
      <button type="submit">Submit</button>
    </form>
  )
}

export default Signup
