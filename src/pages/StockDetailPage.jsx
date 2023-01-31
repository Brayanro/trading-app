import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import finnHub from '../api/finnHub'
import StockChart from '../components/StockChart'
import StockData from '../components/StockData'

const formatData = data => {
  return data.t.map((el, index) => {
    return {
      x: el * 1000,
      y: Math.floor(data.c[index])
    }
  })
}

const StockDetailPage = () => {
  const [chartData, setChartData] = useState()
  const { symbol } = useParams()

  useEffect(() => {
    const fetchData = async () => {
      const date = new Date()
      const currenTime = Math.floor(date.getTime() / 1000)
      let oneDay
      if (date.getDay() === 6) {
        oneDay = currenTime - 2 * 24 * 60 * 60
      } else if (date.getDay() === 0) {
        oneDay = currenTime - 3 * 24 * 60 * 60
      } else {
        oneDay = currenTime - 24 * 60 * 60
      }
      const oneWeek = currenTime - 7 * 24 * 60 * 60
      const oneYear = currenTime - 365 * 24 * 60 * 60

      try {
        const responses = await Promise.all([
          finnHub.get('/stock/candle', {
            params: {
              symbol,
              from: oneDay,
              to: currenTime,
              resolution: 30
            }
          }),
          finnHub.get('/stock/candle', {
            params: {
              symbol,
              from: oneWeek,
              to: currenTime,
              resolution: 60
            }
          }),
          finnHub.get('/stock/candle', {
            params: {
              symbol,
              from: oneYear,
              to: currenTime,
              resolution: 'W'
            }
          })
        ])
        setChartData({
          day: formatData(responses[0].data),
          week: formatData(responses[1].data),
          year: formatData(responses[2].data)
        })
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [symbol])

  return (
    <>
      {chartData && (
        <div>
          <StockChart chartData={chartData} symbol={symbol} />
          <StockData symbol={symbol} />
        </div>
      )}
    </>
  )
}

export default StockDetailPage
