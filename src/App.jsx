import { Nav, Hero, Stats, Pain, Splits, Features, Band, Pricing, Cta, Footer } from './components/Sections.jsx'

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Stats />
        <Pain />
        <Splits />
        <Features />
        <Band />
        <Pricing />
        <Cta />
      </main>
      <Footer />
    </>
  )
}
