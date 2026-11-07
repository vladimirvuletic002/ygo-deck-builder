import {RouterProvider, createBrowserRouter} from 'react-router-dom'
import Home from './pages/Home'
import CardsDB from './pages/CardsDB'
import Layout from './components/Layout'


const router = createBrowserRouter([
	{
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/cards-db', element: <CardsDB />}
    ]
  }  
])

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
