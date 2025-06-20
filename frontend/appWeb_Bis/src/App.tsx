import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Userform from './modules/user/UserForm'
import UserTable from './modules/user/UserTable'
import ProductForm from './modules/product/ProductForm'
import OrderForm from './modules/oder/OrderForm'

function App() {
  return (
    <>
      <Router>
        <nav>
          <ul>
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/user">Usuario</Link></li>
            <li><Link to="/users">Lista de Usuarios</Link></li>
            <li><Link to="/products">Productos</Link></li>
            <li><Link to="/orders">Ordenes</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/user" element={<Userform />} />
          <Route path="/users" element={<UserTable />} />
          <Route path="/products" element={<ProductForm />} />
          <Route path="/orders" element={<OrderForm />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
