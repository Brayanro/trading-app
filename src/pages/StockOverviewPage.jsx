import trading from '../assets/trading.png'
import AutoComplete from '../components/AutoComplete'
import StockList from '../components/StockList'

const StockOverviewPage = () => {
  return (
    <>
      <div className='text-center'>
        <img src={trading} alt='Trading Logo' className='w-25' />
      </div>
      <AutoComplete />
      <StockList />
    </>
  )
}

export default StockOverviewPage
