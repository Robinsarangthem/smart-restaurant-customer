import React from 'react'
import ReactDOM from 'react-dom/client'
import ScrollToTop from './Element/ScrollToTop.jsx'
import './index.css'
import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
	Routes,
} from 'react-router-dom'
import Layout from './Layout.jsx'
import Home from './Pages/Home.jsx'
import Orders from './Pages/Orders.jsx'
import Contact from './Pages/Contact.jsx'
import Cart from './Pages/cart/Cart.jsx'
import PageNotFound from './Pages/PageNotFound.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Tables from './Components/Tables/Tables.jsx'
import FoodDetail from './Components/FoodDisplay/FoodDetail.jsx'
import WelcomePage from './Pages/welcomePage/WelcomePage.jsx'
import OrderDetails from './Pages/orders/OrderDetails.jsx'
import RootLayout from './Element/RootLayout.jsx'
import Search from './Components/search/Search.jsx'
import ProtectedRoute from './Components/ProtectedRoute.jsx'
import { ToastContainer } from 'react-toastify'
import SearchResults from './Components/search/SearchResults.jsx'

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route element={<RootLayout />}>
			{/* <Route element={<ProtectedRoute />}> */}
			<Route element={<Layout />}>
				<Route path='/' element={<Home />} />
				<Route path=':category' element={<Home />} />
				<Route path='/contact' element={<Contact />} />
				<Route path='food/:foodId' element={<FoodDetail />} />
				<Route path='/orders' element={<Orders />} />
				<Route path='/order_status' element={<OrderDetails />} />
				<Route path='/carts' element={<Cart />} />
				<Route path='/search' element={<SearchResults />} />
			</Route>
			{/* </Route> */}
			<Route path='*' element={<PageNotFound />} />
			<Route>
				<Route path='/tables/:id' element={<Tables />} />
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
		<ReactQueryDevtools />
	</QueryClientProvider>
)
