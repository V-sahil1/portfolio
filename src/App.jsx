
import { Route, Routes } from 'react-router-dom'
import './App.css'
import About from './COMPONET/About'
import Certification from './COMPONET/Certification'
import Contect from './COMPONET/Contect'
import Education from './COMPONET/Education'
import Hero from './COMPONET/Hero'
import Navbar from './COMPONET/Navbar'
import Proficiency from './COMPONET/Proficiency'
import Project from './COMPONET/Project'
import X from './COMPONET/X'


function App() {
  

  return (
   <>
   <div >
    <Navbar/>
    <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <About />
              <Proficiency />
              <Education />
              <Project />
              <Certification />
              <Contect />
            </>
          }
        />
    <Route path="/projects" element={<X/>}/>
   </Routes>
  
   </div>
   </>
  )
}

export default App
