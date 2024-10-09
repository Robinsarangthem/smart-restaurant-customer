import useAuth from './hooks/useAuth'
import { Navigate, Outlet } from 'react-router'

function CheckIfAlreadyAuthenticated() {
	const { isAuthenticated } = useAuth()

	return isAuthenticated ? <Navigate replace to={'/'} /> : <Outlet />
}

export default CheckIfAlreadyAuthenticated
