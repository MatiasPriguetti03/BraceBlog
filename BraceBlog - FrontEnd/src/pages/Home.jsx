import React from 'react'
import Posts from '../components/Posts'

const Home = () => {
  return (
    <>
      <section className="hero-section">
        <div className="container">
          <h1>CodeCraft Blog</h1>
          <p>
            Your ultimate destination for modern programming topics, cutting-edge technologies, 
            and software development best practices. Stay ahead of the curve with expert insights 
            and practical tutorials.
          </p>
        </div>
      </section>
      <Posts />
    </>
  )
}

export default Home