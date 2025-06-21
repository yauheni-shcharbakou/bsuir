import React from 'react'
import { Switch, Redirect, Route } from 'react-router-dom'
import MainPage from '../pages/MainPage'
import ExamPage from '../pages/ExamPage'
import StudentPage from '../pages/StudentPage'

const routes = [
  {
    path: '/students',
    component: MainPage,
  },
  {
    path: '/exams',
    component: ExamPage,
  },
  {
    path: '/students/:id',
    component: StudentPage,
  },
]

const AppRouter = () => {
  return (
    <Switch>
      {routes.map(({ path, component }) => (
        <Route key={path} path={path} component={component} exact />
      ))}
      <Redirect to="/students" />
    </Switch>
  )
}

export default AppRouter
