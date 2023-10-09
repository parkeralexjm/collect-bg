import Button from 'react-bootstrap/Button'
import ChatDesktop from './ChatDesktop'
import { useState } from 'react'

import FollowingList from './FollowingList'

export default function ChatDisplay({ messageList, getMessageData, user, setCollectionUser, handleCollectionDisplay, allUsers, setUser }) {
  console.log(user)
  const [chatMode, setChatMode] = useState(true)

  function activateChatMode() {
    setChatMode(true)
  }
  function activateFollowingMode() {
    setChatMode(false)
  }
  return (
    <div className='desktop-chat-following'>
      <div className='chat-following-switch'>
        <Button onClick={activateChatMode} variant={chatMode ? 'warning' : 'primary'}>Chat</Button>
        <Button onClick={activateFollowingMode} variant={chatMode ? 'primary' : 'warning'}>Following</Button>
      </div>
      {
        chatMode ?
          <ChatDesktop messageList={messageList} refresh={getMessageData} />
          :
          <FollowingList user={user} setCollectionUser={setCollectionUser} handleCollectionDisplay={handleCollectionDisplay} allUsers={allUsers} setUser={setUser} />
      }
    </div>
  )
}