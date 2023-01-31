import { useContext, useEffect, useState } from 'react'
import { BsFillCaretDownFill, BsFillCaretUpFill } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import finnHub from '../api/finnHub'
import { WatchListContext } from '../context/watchListContext'

const StockList = () => {
  const [stock, setStock] = useState([])
  const { watchList, deleteStock } = useContext(WatchListContext)
  const navigate = useNavigate()

  const changeColor = change => {
    return change > 0 ? 'success' : 'danger'
  }

  const renderIcon = change => {
    return change > 0 ? <BsFillCaretUpFill /> : <BsFillCaretDownFill />
  }

  useEffect(() => {
    let isMounted = true

    const fetchData = async () => {
      try {
        const responses = await Promise.all(watchList.map(stock => {
          return finnHub.get('/quote', {
            params: {
              symbol: stock
            }
          })
        }))
        const data = responses.map(response => {
          return {
            data: response.data,
            symbol: response.config.params.symbol
          }
        })
        if (isMounted) {
          setStock(data)
        }
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
    return () => (isMounted = false)
  }, [watchList])

  const handleStockSelect = symbol => {
    navigate(`detail/${symbol}`)
  }

  return (
    <section className='table-responsive'>
      <table className='table table-sm table-bordered table-hover mt-4'>
        <thead className='text-primary-emphasis'>
          <tr>
            <th scope='col'>Name</th>
            <th scope='col'>Last</th>
            <th scope='col'>Chg</th>
            <th scope='col'>Chg%</th>
            <th scope='col'>High</th>
            <th scope='col'>Low</th>
            <th scope='col'>Open</th>
            <th scope='col'>Pclose</th>
          </tr>
        </thead>
        <tbody>
          {stock.map(stockData => {
            return (
              <tr style={{ cursor: 'pointer' }} onClick={() => handleStockSelect(stockData.symbol)} className='table-row' key={stockData.symbol}>
                <th scope='row'>{stockData.symbol}</th>
                <td>{stockData.data.c}</td>
                <td className={`text-${changeColor(stockData.data.d)}`}>{stockData.data.d}{renderIcon(stockData.data.dp)}</td>
                <td className={`text-${changeColor(stockData.data.dp)}`}>{stockData.data.dp}{renderIcon(stockData.data.dp)}</td>
                <td>{stockData.data.h}</td>
                <td>{stockData.data.l}</td>
                <td>{stockData.data.o}</td>
                <td>
                  {stockData.data.pc}
                  <button
                    className='btn btn-danger btn-sm d-inline-block delete-button'
                    onClick={e => {
                      e.stopPropagation()
                      deleteStock(stockData.symbol)
                    }}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </section>
  )
}

export default StockList
