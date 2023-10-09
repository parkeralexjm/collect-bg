import GameCards from './GameCards'

export default function UserCollection({ games, allCategories, allMechanics }) {
  return (
    <GameCards games={games} allCategories={allCategories} allMechanics={allMechanics} collectionMode={true} />
  )
}