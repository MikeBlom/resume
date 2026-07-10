import { Route, Routes } from 'react-router-dom'
import { Experience } from './app/Experience'
import { HowItWasBuilt } from './app/HowItWasBuilt'
import { ResumePage } from './app/ResumePage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Experience />} />
      <Route path="/resume" element={<ResumePage />} />
      <Route path="/how-it-was-built" element={<HowItWasBuilt />} />
      <Route path="*" element={<Experience />} />
    </Routes>
  )
}
