import { FoodListProvider, StoreContextProvider } from '@/Components/context'
import { AuthProvider } from '@/Components/context/AuthContext'
import { Outlet } from 'react-router-dom'

export default function RootLayout() {
	return (
		<AuthProvider>
			<StoreContextProvider>
				<FoodListProvider>
					<Outlet />
				</FoodListProvider>
			</StoreContextProvider>
		</AuthProvider>
	)
}
