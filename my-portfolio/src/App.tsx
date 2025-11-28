import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './header'
import Navbar from './header'
import About from './about'
import Skills from './skills'
import galaxyVideo from './assets/galaxy.mp4';
import Projects from './projects'
import Education from './education'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <video className="bg-video" autoPlay muted loop>
  <source src={galaxyVideo} type="video/mp4" />
</video>
      <Navbar />
      <About />
      <Skills />
      <Education />
      <Projects />
    </>
  )
}

export default App
