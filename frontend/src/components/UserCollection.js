// Component imports
import GameCards from './GameCards'
// Bootstrap imports
import Button from 'react-bootstrap/esm/Button'

export default function UserCollection({ allGames, getUserData, user, collectionUser, allCategories, allMechanics, deactivateCollectionMode }) {
  return (
    <>
      <div className='collection-header'>
        {/* eslint-disable-next-line quotes */}
        <h1>{collectionUser.username === user.username ? 'My collection' : collectionUser.username + "'s collection"}</h1>
        <Button variant='danger' onClick={deactivateCollectionMode}>Exit</Button>
      </div>
      <GameCards allGames={allGames} user={user} getUserData={getUserData} games={collectionUser.collection} allCategories={allCategories} allMechanics={allMechanics} collectionMode={true} />
    </>
  )
}