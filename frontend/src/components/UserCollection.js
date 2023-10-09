import GameCards from './GameCards'

export default function UserCollection({ user, games, allCategories, allMechanics }) {
  return (
    <>
      <h1>{user.username}&apos;s collection</h1>
      <GameCards games={games} allCategories={allCategories} allMechanics={allMechanics} collectionMode={true} />
    </>
  )
}