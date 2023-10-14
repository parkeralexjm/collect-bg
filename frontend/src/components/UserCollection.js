// Component imports
import GameCards from './GameCards'
// Bootstrap imports
import Button from 'react-bootstrap/esm/Button'

export default function UserCollection({ getUserData, user, collectionUser, deactivateCollectionMode }) {
  return (
    <>
      <div className='collection-header'>
        {/* eslint-disable-next-line quotes */}
        <h1>{collectionUser.username === user.username ? 'My collection' : collectionUser.username + "'s collection"}</h1>
        <Button variant='outline-danger' onClick={deactivateCollectionMode}>Exit</Button>
      </div>
      <GameCards user={user} getUserData={getUserData} games={collectionUser.collection} collectionMode={true} />
    </>
  )
}