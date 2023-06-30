import { RouteObject, useRoutes } from 'react-router-dom'
import Layout from '../layout/index'
// Home
import WeatherApp from './WeatherApp'
// About
// import AboutPage from '../routes/AboutRoutes' // 另外簡化到 AboutRoutes
import About from './about/About'
import Desc from './about/Desc'
// Product
import Food from './product/Food'
import Drink from './product/Drink'

const AboutPage = () => {
  const aboutRouterConfig: RouteObject[] = [
    {
      path: '',
      element: <Layout />,
      children: [
        {
          path: '',
          element: <About />
        },
        {
          path: 'desc',
          element: <Desc />
        }
      ]
    },
    {
      path: '*',
      element: <div>頁面404</div>
    }
  ]
  const elements = useRoutes(aboutRouterConfig)
  return elements
}

const ProductPage = () => {
  const productRouterConfig: RouteObject[] = [
    {
      path: '',
      element: <Layout />,
      children: [
        {
          path: 'food',
          element: <Food />
        },
        {
          path: 'drink',
          element: <Drink />
        }
      ]
    },
    {
      path: '*',
      element: <div>頁面404</div>
    }
  ]
  const elements = useRoutes(productRouterConfig)
  return elements
}

function App() {
  const routerConfig: RouteObject[] = [
    {
      path: '',
      element: <WeatherApp />
    },
    {
      path: 'about/*',
      element: <AboutPage />
    },
    {
      path: 'product/*',
      element: <ProductPage />
    },
    {
      path: '*',
      element: <div>頁面404</div>
    }
  ]
  const elements = useRoutes(routerConfig)
  return (
    <div className="App">
      {elements}
    </div>
  )
}

export default App
