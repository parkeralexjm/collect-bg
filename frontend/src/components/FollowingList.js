// React imports
import { useState } from 'react'
import Select from 'react-select'
// Bootstrap imports
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
// Axios imports
import axiosAuth from '../lib/axios'

export default function FollowingList({ user, setCollectionUser, activateCollectionMode, allUsers, getUserData }) {
  const [follow, setFollow] = useState({ id: 0, type: 'add' })
  const [userKey, setUserKey] = useState(0)
  const options = [
    allUsers && allUsers.map((user) => {
      return (
        { value: user.username, label: user.username.charAt(0).toUpperCase() + user.username.slice(1) }
      )
    })
  ]

  function handleChange(e) {
    console.log(typeof (e.target.value))
    Number.isInteger(parseInt(e.target.value)) && setFollow({ ...follow, id: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    async function addFollowingUser() {
      if (follow.id !== 0) {
        try {
          const { data } = await axiosAuth.patch(`api/auth/${user.id}/follow/`, follow)
          getUserData()
        } catch (error) {
          console.log(error)
        }
      }
    }
    addFollowingUser()
  }

  function handleRemove(e) {
    async function removeFollowingUser() {
      try {
        const { data } = await axiosAuth.patch(`api/auth/${user.id}/follow/`, { id: e.target.value, type: 'remove' })
        getUserData()
      } catch (error) {
        console.log(error)
      }
    }
    removeFollowingUser()
  }

  return (
    <div className='following-display' data-customattribute={userKey}>
      <div className='following-form'>
        <Form onSubmit={handleSubmit}>
          <Form.Control as='select' value={follow.id} onChange={handleChange} aria-label='Default select '>
            <option selected>- Username -</option>
            {allUsers.length > 0 && allUsers.filter((current) => current.username !== user.username).map(({ username, id }, index) => {
              const found = user.following.some(el => el.username === username)
              return !found && <option value={id} key={index} >{username}</option>
            })}
          </Form.Control >
          <Button type='submit' variant='outline-info' onClick={() => setUserKey(userKey => userKey + 1)}>
            <i className="fa-solid fa-plus fa-lg"></i>
          </Button>
        </Form>
      </div>
      <div className='following-users'>
        {user.following && user.following.map((user, index) => {
          return <div key={index} className='following-collection'>
            <Button variant='warning' onClick={() => {
              setCollectionUser(user)
              activateCollectionMode()
            }}>{user.username}</Button>
            <Button variant='outline-danger' className='following-remove' value={user.id} onClick={handleRemove}>X</Button>
          </div>
        })}
      </div>
    </div >
  )
}