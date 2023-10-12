// React imports
import { useState } from 'react'
// Bootstrap imports
import Button from 'react-bootstrap/Button'
// Component imports
import ChatDesktop from './ChatDesktop'
import FollowingList from './FollowingList'

export default function ChatDisplay({ messageList, getMessageData, user, setCollectionUser, activateCollectionMode, allUsers, setUser, getUserData }) {
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
          <ChatDesktop messageList={messageList} getMessageData={getMessageData} />
          :
          <FollowingList user={user} setCollectionUser={setCollectionUser} activateCollectionMode={activateCollectionMode} allUsers={allUsers} setUser={setUser} getUserData={getUserData} />
      }
    </div>
  )
}