import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import ReactDOM from 'react-dom/client'
import {
	Route,
	RouterProvider,
	createBrowserRouter,
	createRoutesFromElements,
} from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import CustomerFoodList from './Components/customerSection/CustomerFoodList.jsx'
import RootLayout from './Element/RootLayout.jsx'
import Layout from './Layout.jsx'
import Contact from './Pages/Contact.jsx'
import LoginOrSignup from './Pages/LoginOrSignup.jsx'
import PageNotFound from './Pages/PageNotFound.jsx'
import Cart from './Pages/cart/Cart.jsx'
import OrderConfirmation from './Pages/order-confirmation/OrderConfirmation.jsx'
import Order from './Pages/order/Order.jsx'
import WelcomePage from './Pages/welcomePage/WelcomePage.jsx'
import './index.css'
import VerifyOTP from './Pages/VerifyOTP.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import ShowQRCodes from './Pages/ShowQRCodes.jsx'

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route element={<RootLayout />}>
			{/* <Route element={<ProtectedRoute />}> */}
			<Route path='/' element={<ShowQRCodes />} />
			<Route path='/restaurant/:restaurantSlug/:tableNo' element={<Layout />}>
				<Route index element={<CustomerFoodList />} />
				<Route path='cart' element={<Cart />} />
				<Route path='order_confirmation' element={<OrderConfirmation />} />
				<Route path='contact' element={<Contact />} />
				<Route element={<ProtectedRoute />}>
					<Route path='order-summary' element={<Order />} />
				</Route>
				<Route path='loginOrSignup' element={<LoginOrSignup />} />
				<Route path='verify-otp' element={<VerifyOTP />} />
				{/* <Route index element={<Home />} />
				<Route path='category/:category' element={<Home />} />
				<Route path='food/:foodId' element={<FoodDetail />} />
				<Route path='/orders' element={<Orders />} />
				<Route path='/order_status' element={<OrderDetails />} />
				<Route path='/carts' element={<Cart />} />
				<Route path='/search' element={<SearchResults />} /> */}
			</Route>
			<Route path='*' element={<PageNotFound />} />
			{/* </Route> */}
			<Route>
				<Route path='/landing' element={<WelcomePage />} />
			</Route>
		</Route>
	)
)
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
	<QueryClientProvider client={queryClient}>
		<ToastContainer position='top-center' autoClose={1000} />
		<RouterProvider router={router} />
		{/* <ReactQueryDevtools /> */}
	</QueryClientProvider>
)
