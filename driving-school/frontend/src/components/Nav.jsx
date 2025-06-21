import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'

const links = [
  {
    title: 'Students',
    path: 'students',
  },
  {
    title: 'Exams',
    path: 'exams',
  }
]

const Nav = () => {
  const { pathname } = useLocation()

  return (
    <nav className="nav">
      <div className="nav-wrapper">
        <ul>
          {links.map(({ title, path }) => (
            <li key={path} style={{ backgroundColor: pathname === path ? 'gray' : 'transparent' }}>
              <NavLink to={path}>{title}</NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

export default Nav
