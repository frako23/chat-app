import { useState } from 'react'
import toast from 'react-hot-toast'

const useSignup = () => {
  const [loading, setLoading] = useState(false)

  const signup = async ({
    fullName,
    username,
    password,
    confirmPassword,
    gender
  }) => {
    const sucess = handleInputErrors({
      fullName,
      username,
      password,
      confirmPassword,
      gender
    })

    if (!sucess) return

    setLoading(true)

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          username,
          password,
          confirmPassword,
          gender
        })
      })

      const data = await res.json()
      console.log(data)
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return { signup, loading }
}

export default useSignup

function handleInputErrors({
  fullName,
  username,
  password,
  confirmPassword,
  gender
}) {
  if (!fullName || !username || !password || !confirmPassword || !gender) {
    toast.error('Pleaser fill all fields')
    return false
  }

  if (password !== confirmPassword) {
    toast.error('Passwords do not match')
    return false
  }

  if (password.length < 6) {
    toast.error('Password must be at least 6 characters')
    return false
  }

  return true
}
