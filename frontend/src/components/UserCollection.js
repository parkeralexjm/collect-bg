import Button from 'react-bootstrap/esm/Button'
import GameCards from './GameCards'

export default function UserCollection({ user, games, allCategories, allMechanics, deactivateCollectionMode }) {
  return (
    <>
      <div className='collection-header'>
        <h1>{user.username}&apos;s collection</h1>
        <Button variant='danger' onClick={deactivateCollectionMode}>Exit</Button>
      </div>
      <GameCards games={games} allCategories={allCategories} allMechanics={allMechanics} collectionMode={true} />
    </>
  )
}