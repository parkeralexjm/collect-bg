// React imports
import { useEffect, useState } from 'react'
// Component imports

// Bootstrap imports

// Axios imports
import axiosAuth from '../lib/axios'
import axios from 'axios'

export default function GamesDisplay() {
  const [allGames, setAllGames] = useState([])

  useEffect(() => {
    async function getGamesData() {
      try {
        // const { data } = await axiosAuth.get('/api/games/') // This is authorised route for testing.
        const { data } = await axios.get('/api/games/') // This is unauthorised for testing
        setAllGames(data)
      } catch (error) {
        console.log(error)
      }
    }
    getGamesData()
  }, [])

  return (
    <section className='display-background'>
      {allGames.length > 0 ?
        <h1>{allGames[1].name}</h1> :
        <h1>Loading...</h1>
      }
    </section>
  )
}