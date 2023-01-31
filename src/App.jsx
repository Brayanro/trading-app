import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { WatchListContextProvider } from './context/watchListContext'
import StockDetailPage from './pages/StockDetailPage'
import StockOverviewPage from './pages/StockOverviewPage'

const App = () => {
  return (
    <main className='container'>
      <WatchListContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<StockOverviewPage />} />
            <Route path='/detail/:symbol' element={<StockDetailPage />} />
          </Routes>
        </BrowserRouter>
      </WatchListContextProvider>
    </main>
  )
}

export default App
