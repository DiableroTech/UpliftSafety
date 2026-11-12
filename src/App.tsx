import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import About from './pages/About'
import Contact from './pages/Contact'
import Home from './pages/Home'
import Hygiene from './pages/Hygiene'
import SafetyServices from './pages/SafetyServices'
import Training from './pages/Training'
import TrainingV2 from './pages/TrainingV2'
import Equipment from './pages/Equipment'
import Projects from './pages/Projects'
import ProjectDetail from './pages/ProjectDetail'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="/services" element={<SafetyServices />} />
          <Route path="/services/hygiene" element={<Hygiene />} />
          <Route path="/training" element={<Training />} />
          <Route path="/training-v2" element={<TrainingV2 />} />
          <Route path="/training/equipment" element={<Equipment />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
