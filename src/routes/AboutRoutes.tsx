import { RouteObject, useRoutes } from 'react-router-dom'
import Layout from '../layout/index'
// About
import About from '../pages/about/About'
import Desc from '../pages/about/Desc'

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

export default AboutPage
