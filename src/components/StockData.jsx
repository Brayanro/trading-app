import { useEffect, useState } from 'react'
import finnHub from '../api/finnHub'

const StockData = ({ symbol }) => {
  const [stockData, setStockData] = useState()

  useEffect(() => {
    let isMounted = true

    const fetchData = async () => {
      try {
        const response = await finnHub.get('/stock/profile2', {
          params: {
            symbol
          }
        })
        if (isMounted) {
          setStockData(response.data)
        }
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()

    return () => (isMounted = false)
  }, [symbol])

  return (
    <section>
      {stockData && (
        <div className='row border bg-white rounded shadow-sm p-4 my-5'>
          <div className='col'>
            <div>
              <span className='fw-bold'>Name: </span>
              {stockData.name}
            </div>
            <div>
              <span className='fw-bold'>Country: </span>
              {stockData.country}
            </div>
            <div>
              <span className='fw-bold'>Ticker: </span>
              {stockData.ticker}
            </div>
          </div>
          <div className='col'>
            <div>
              <span className='fw-bold'>Exchange: </span>
              {stockData.exchange}
            </div>
            <div>
              <span className='fw-bold'>Industry: </span>
              {stockData.finnhubIndustry}
            </div>
            <div>
              <span className='fw-bold'>IPO: </span>
              {stockData.ipo}
            </div>
          </div>
          <div className='col'>
            <div>
              <span className='fw-bold'>MarkeCap: </span>
              {stockData.marketCapitalization}
            </div>
            <div>
              <span className='fw-bold'>Shares Outstanding: </span>
              {stockData.shareOutstanding}
            </div>
            <div>
              <span className='fw-bold'>Url: </span>
              <a href={stockData.weburl} target='_blank' rel='noreferrer'> {stockData.weburl} </a>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default StockData
