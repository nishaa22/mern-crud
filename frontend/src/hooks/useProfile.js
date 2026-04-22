import { useEffect, useState } from 'react'
import { getProfile } from '../utils/auth'

const useProfile = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const token = sessionStorage.getItem('token')
    if (!token) {
      setLoading(false)
      return
    }

    const fetchProfile = async () => {
      try {
        const data = await getProfile(token)
        if (data && !data.error) {
          setUser(data.results)
        } else {    
          setError(data?.error || 'Failed to fetch profile')
        }
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [])

  return { user, setUser, loading, error }
}

export default useProfile
