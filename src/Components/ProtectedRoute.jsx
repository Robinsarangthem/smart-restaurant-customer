import React from 'react'
import useAuth from './hooks/useAuth'
import { Navigate, Outlet } from 'react-router-dom'

export default function ProtectedRoute() {
	const { isAuthenticated } = useAuth()
	const { params } = useAuth()
	return isAuthenticated ? <Outlet /> : <Navigate to='/qr_scanner' replace />
}
