// React imports

// Component imports
import LandingFooter from './LandingFooter'
import Header from './Header'
// Bootstrap imports

export default function Landing() {
  return (
    <section className='landing landing-container'>
      <Header version='landing' />
      <section className="container landing-info">main</section>
      <LandingFooter />
    </section>
  )
}