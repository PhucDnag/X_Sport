import React from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
import Evaluate from '../components/Evaluate'

const Home = () => {
  return (
    <div className='bg-white'>
      <Hero />
      <LatestCollection/>
      <BestSeller />
      <OurPolicy />
      <Evaluate />
    </div>
  )
}

export default Home