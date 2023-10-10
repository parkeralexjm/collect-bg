import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useState } from 'react'
import axiosAuth from '../lib/axios'

export default function FollowingList({ user, setCollectionUser, activateCollectionMode, allUsers, setUser }) {
  const [follow, setFollow] = useState({ id: 0 })
  const [userKey, setUserKey] = useState(0)
  console.log(user)

  function handleChange(e) {
    setFollow({ ...follow, id: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    async function addFollowingUser() {
      try {
        const { data } = await axiosAuth.patch(`api/auth/${user.id}/follow/`, follow)
      } catch (error) {
        console.log(error)
      }
    }
    addFollowingUser()
  }

  function handleRemove(e) {
    console.log({ id: e.target.value })
    async function removeFollowingUser() {
      try {
        const { data } = await axiosAuth.patch(`api/auth/${user.id}/follow/`, { id: e.target.value })
      } catch (error) {
        console.log(error)
      }
    }
    removeFollowingUser()
  }

  return (
    <div className='following-display' data-customattribute={userKey}>
      <Form onSubmit={handleSubmit}>
        <Form.Control as='select' value={follow.id} onChange={handleChange} aria-label='Default select '>
          <option selected disabled>- Username -</option>
          {allUsers.map(({ username, id }, index) => {
            const found = user.following.some(el => el.username === username)
            return !found && <option value={id} key={index} >{username}</option>
          })}
        </Form.Control >
        <Button type='submit' variant='secondary' onClick={() => setUserKey(userKey => userKey + 1)}>Follow user</Button>
      </Form>
      {user.following.map((user, index) => {
        return <div key={index} className='following-collection'>
          <Button variant='warning' onClick={() => {
            // console.log(user)
            setCollectionUser(user)
            activateCollectionMode()
          }}>{user.username}</Button>
          <Button variant='danger' className='following-remove' value={user.id} onClick={handleRemove}>X</Button>
        </div>
      })}
    </div >
  )
}