import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useState } from 'react'

export default function FollowingList({ user, setCollectionUser, handleCollectionDisplay, allUsers }) {
  const [follow, setFollow] = useState('')

  function handleChange(e) {
    setFollow(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    console.log(e)
  }

  return (
    <div className='following-display'>
      {user.following.map((user, index) => {
        return <Button variant='danger' className='m-2' key={index} onClick={() => {
          // console.log(user)
          setCollectionUser(user)
          handleCollectionDisplay()
        }}>{user.username}</Button>
      })}
      <Form onSubmit={handleSubmit}>
        <Form.Control as='select' value={follow} onChange={handleChange} aria-label='Default select '>
          {allUsers.map(({ username, id }, index) => {
            return <option value={id} key={index} >{username}</option>
          })}
        </Form.Control >
        <Button type='submit'>Follow user</Button>
      </Form>
    </div>
  )
}