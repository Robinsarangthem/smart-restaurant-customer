import { FoodListProvider, StoreContextProvider } from '@/context'
import { AuthProvider } from '@/context/AuthContext'
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
