import { useState } from 'react'
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Reports from './Reports'
import CreateReports from './CreateReports'
import UpdateReports from './UpdateReports'
import CreatePayments from './CreatePayments'
import Payments from './payments'
function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/payments'element={<Payments/>}></Route>
          <Route path='/create-payments'element={<CreatePayments/>}></Route>
          <Route path='/' element={<Reports />}></Route>
          <Route path='/create' element={<CreateReports />}></Route>
          <Route path='/update/:id' element={<UpdateReports />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
