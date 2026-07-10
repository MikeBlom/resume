import { NavLink } from 'react-router-dom'

export function SiteNav() {
  return (
    <nav className="site-nav" aria-label="Site">
      <NavLink to="/" end>
        Home
      </NavLink>
      <NavLink to="/resume">Resume</NavLink>
      <NavLink to="/how-it-was-built">How it was built</NavLink>
    </nav>
  )
}
