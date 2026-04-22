import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Auth from '../pages/Auth'
import Users from '../pages/Users'
import Dashboard from '../pages/Dashboard'
import ChangePassword from '../pages/ChangePassword'
import Layout from '../components/Layout'

const Routing = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Auth />} />
                <Route element={<Layout />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path='/users' element={<Users />} />
                    <Route path='/change-password' element={<ChangePassword />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Routing