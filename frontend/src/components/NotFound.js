// Component imports
import Header from './Header'
import { Link } from 'react-router-dom'
// Bootstrap imports

function Previous() {
  window.history.back()
}

export default function NotFound() {
  return (
    <section className='landing not-found-background'>
      <Header version={'notFound'} />
      <section className="container not-found">
        <div>
          <h1>Something&apos;s<br />missing.</h1>
          <Link onClick={Previous}>Go Back</Link>
        </div>
      </section>

    </section >
  )
}