import { Route, Routes } from 'react-router-dom'
import { HowItWasBuilt } from './app/HowItWasBuilt'
import { Landing } from './app/Landing'
import { ResumePage } from './app/ResumePage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/resume" element={<ResumePage />} />
      <Route path="/how-it-was-built" element={<HowItWasBuilt />} />
      <Route path="*" element={<Landing />} />
    </Routes>
  )
}
