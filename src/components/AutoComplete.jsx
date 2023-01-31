import { useContext, useEffect, useState } from 'react'
import finnHub from '../api/finnHub'
import { WatchListContext } from '../context/watchListContext'

const AutoComplete = () => {
  const [search, setSearch] = useState('')
  const [results, setResults] = useState([])
  const { addStock } = useContext(WatchListContext)

  const renderDropdown = () => {
    const dropDownclass = search ? 'show' : null
    return (
      <ul
        style={{
          height: '500px',
          overflowY: 'scroll',
          overflowX: 'hidden',
          cursor: 'pointer'
        }}
        className={`dropdown-menu ${dropDownclass}`}
      >
        {results.map(result => {
          return (
            <li
              onClick={() => {
                addStock(result.symbol)
                setSearch('')
              }} className='dropdown-items' key={result.symbol}
            >{result.description}({result.symbol})
            </li>
          )
        })}
      </ul>
    )
  }

  useEffect(() => {
    let isMounted = true
    const fetchData = async () => {
      try {
        const response = await finnHub.get('/search', {
          params: {
            q: search
          }
        })
        if (isMounted) {
          setResults(response.data.result)
        }
      } catch (error) {
        console.error(error)
      }
    }
    if (search.length > 0) {
      fetchData()
    } else {
      setResults([])
    }
    return () => (isMounted = false)
  }, [search])

  return (
    <section className='w-50 p-5 rounded mx-auto'>
      <div className='form-floating dropdown'>
        <input
          type='text'
          style={{ backgroundColor: 'rgba(145,158,171,0.04)' }}
          id='search'
          className='form-control'
          placeholder='Search'
          autoComplete='off'
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <label htmlFor='search'>Search</label>
        {renderDropdown()}
      </div>
    </section>
  )
}

export default AutoComplete
