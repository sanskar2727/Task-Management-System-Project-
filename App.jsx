
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Register from './component/Register'
import Login from './component/Login'
import Dashboard from './component/Dashboard'
import CreateTask from './component/CreateTask'
import MyTasks from './component/MyTasks'

function App() {

  return (
    <>
  <Routes>
     <Route path="/" element={<Login />} />
     <Route path='/register' element={<Register/>} />
     <Route path="/dashboard" element={<Dashboard />} />
     <Route path="/create-task" element={<CreateTask />} />
       <Route path="/tasks" element={<MyTasks />} />

  </Routes>
    </>
  )
}

export default App
