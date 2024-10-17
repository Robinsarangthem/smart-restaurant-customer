import { data } from 'autoprefixer'
import { Axios } from '../../utils/axiosSetup'
import { useNavigate } from 'react-router-dom'
import { FlaskRound, LogOut } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'
import { ClipLoader } from 'react-spinners'
import useAuth from '../hooks/useAuth'
import { toast } from 'react-toastify'

export default function Logout() {
	const navigate = useNavigate()

	const { setIsAuthenticated, setToken } = useAuth()
	async function handleLogout() {
		const tablesNo = localStorage.getItem('tables')
		const tables = JSON.parse(tablesNo)
		console.log(tables.id)
		try {
			await Axios.delete('/api/customer/delete', {
				data: {
					currentTableNumber: tables,
				},
			})
			console.log('logout Success', data)
			localStorage.clear()

			setIsAuthenticated(false)
			setToken(null)

			navigate('/landing', { replace: true })
		} catch (error) {
			error.message
		}
	}

	const { mutate, isSuccess, isPending } = useMutation({
		mutationKey: 'Logout',
		mutationFn: handleLogout,
	})

	if (isSuccess) {
		toast.success('Logout successfully')
	}

	return (
		<div>
			<button onClick={mutate}>
				{isPending ? (
					<div className='flex items-center'>
						<ClipLoader size={20} color='red' />
					</div>
				) : (
					<LogOut />
				)}
			</button>
		</div>
	)
}
