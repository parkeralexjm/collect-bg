import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useState } from 'react'
import axiosAuth from '../lib/axios'

export default function FollowingList({ user, setCollectionUser, handleCollectionDisplay, allUsers, setUser }) {
  const [follow, setFollow] = useState({ id: 0 })
  const [userKey, setUserKey] = useState(0)

  function handleChange(e) {
    setFollow({ ...follow, id: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    async function addFollowingUser() {
      try {
        const { data } = await axiosAuth.patch(`api/auth/${user.id}/follow/`, follow)
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    }
    addFollowingUser()
  }

  return (
    <div className='following-display' data-customattribute={userKey}>
      {user.following.map((user, index) => {
        return <Button variant='danger' className='m-2' key={index} onClick={() => {
          // console.log(user)
          setCollectionUser(user)
          handleCollectionDisplay()
        }}>{user.username}</Button>
      })}
      <Form onSubmit={handleSubmit}>
        <Form.Control as='select' value={follow.id} onChange={handleChange} aria-label='Default select '>
          {allUsers.map(({ username, id }, index) => {
            return <option value={id} key={index} >{username}</option>
          })}
        </Form.Control >
        <Button type='submit' onClick={() => setUserKey(userKey => userKey + 1)}>Follow user</Button>
      </Form>
    </div>
  )
}