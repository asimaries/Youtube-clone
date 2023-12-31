import './App.css'
import Body from './components/Body'
import Head from './components/Head'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Offline from './components/Offline'
import Error from './components/Error'
import { Provider } from 'react-redux'
import store from './store'
import Watch from './components/Watch'
import MainContainer from './components/MainContainer'
import SearchResults from './components/SearchResults'

const Layout = () => {
  let isOnline = true
  return (
    <Provider store={store}>
      <div className='px-3'>
        <Head />
        {isOnline ? <Body /> : <Offline />}
      </div>
    </Provider>
  )
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: <MainContainer />
      },
      {
        path: 'watch',
        element: <Watch />
      },
      {
        path: 'results',
        element: <SearchResults />
      },
    ]
  }
])

function App() {
  return (
    <RouterProvider router={router} />
  )
}
/**
 * Head
 * Body
 *  SideBar
 *    menuItem
 *  maincontainer 
 *    button list 
 *    videocontainer 
 *     videocard
 */
export default App
