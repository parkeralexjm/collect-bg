// React imports
import { useState } from 'react'
// Component imports
import ChatDesktop from './ChatDesktop'
import FollowingList from './FollowingList'
// Bootstrap imports
import Button from 'react-bootstrap/Button'

export default function ChatMobile({ messageList, getMessageData, user, setCollectionUser, activateCollectionMode, allUsers, setUser, getUserData }) {
  const [chatMode, setChatMode] = useState(true)

  function activateChatMode() {
    setChatMode(true)
  }
  function activateFollowingMode() {
    setChatMode(false)
  }
  return (
    <div className='mobile-chat-following'>
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