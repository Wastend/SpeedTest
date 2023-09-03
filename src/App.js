import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainLayout from './app/components/MainLayout'
import pages from './pages/index'

function App() {
  return (
    <BrowserRouter >
      <Routes>
        <Route
          path='/'
          element={<MainLayout />}
        >
          <Route
            path='/'
            element={<pages.MainPage />}
          >

          </Route>
        </Route>
        <Route
          path='*'
          element={<pages.ErrorPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
