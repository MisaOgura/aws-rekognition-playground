import React from 'react'
import { renderToString } from 'react-dom/server'

import App from '../components/App'
import renderPage from '../utils/renderPage'

const router = (req, res) => {
  const appHtml = renderToString(<App />)
  res.status(200).send(renderPage(appHtml))
}

export default router
