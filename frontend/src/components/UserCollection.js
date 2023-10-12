// Component imports
import GameCards from './GameCards'
// Bootstrap imports
import Button from 'react-bootstrap/esm/Button'

export default function UserCollection({ getUserData, user, collectionUser, allCategories, allMechanics, deactivateCollectionMode }) {
  return (
    <>
      <div className='collection-header'>
        <h1>{collectionUser.username}&apos;s collection</h1>
        <Button variant='danger' onClick={deactivateCollectionMode}>Exit</Button>
      </div>
      <GameCards user={user} getUserData={getUserData} games={collectionUser.collection} allCategories={allCategories} allMechanics={allMechanics} collectionMode={true} />
    </>
  )
}