// React imports
import React, { useEffect } from 'react'
import { Route, redirect } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

export default function ProtectedRoute({ isAuth }) {
  const navigate = useNavigate()
  useEffect(() => {
    if (!isAuth) {
      navigate('/')
    }
  }, [])
  return (
    <section>

    </section>
  )
}
