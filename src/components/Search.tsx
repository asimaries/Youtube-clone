import React, { useEffect, useRef, useState } from 'react'
import { BsSearch, BsFillMicFill } from 'react-icons/bs'
import { debounce } from '../utils/debounce'
import useLocalStorage from '../hooks/useLocalStorage'
import axios from 'axios'
import { SEARCH_AUTOCOMPLETE_API } from '../constants'
import { useDispatch, useSelector } from 'react-redux'
import store, { RootState } from '../store'
import { cacheResults } from '../store/searchSlice'

export default function Search() {

  const [searchQuery, setSearchQuery] = useState('')
  const [showLastSearchs, setShowLastSearchs] = useState(false)
  const [lastSearch, setLastSearch] = useState<string[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const { setLocalItem, getLocalItem } = useLocalStorage()
  const [suggestions, setSuggestions] = useState<string[]>([])
  const dispatch = useDispatch()

  const searchCache = useSelector((store: RootState) => store.search)

  const getSuggestions = async () => {
    console.log(`API CALL ${searchQuery}`)
    const { data } = await axios(SEARCH_AUTOCOMPLETE_API + searchQuery)
    setSuggestions(data[1])
    dispatch(cacheResults({ [searchQuery]: data[1] }))
  }

  useEffect(() => {
    const timer = setTimeout(() => {

      if (searchCache[searchQuery])
        setSuggestions(searchCache[searchQuery])
      else {
        getSuggestions()
      }

    }, 200);

    return () => { clearTimeout(timer) }
  }, [searchQuery])


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
    loadLastSearchs()
  }

  function loadLastSearchs() {
    let data: Array<string> | null = getLocalItem('lastSearch')
    if (data == null) data = []
    data = data.filter((value) => value.includes(searchQuery))
    setLastSearch(data)
    setShowLastSearchs(true)
  }

  function unLoadLastSearchs() {
    setTimeout(() => { setShowLastSearchs(false) }, 100)
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (searchQuery === '') return
    let data: Array<string> | null = getLocalItem('lastSearch')
    if (data == null) data = []
    data = [searchQuery, ...data]
    setShowLastSearchs(false)
    setLocalItem('lastSearch', data)
    setLastSearch(data)
  }

  function searchElement(event: React.MouseEvent<HTMLSpanElement>, value: string) {
    setSearchQuery(value)
    inputRef.current!.value = value
  }

  function removeElement(event: React.MouseEvent<HTMLButtonElement>, element: string) {
    console.log(element)
    let data: Array<string> = getLocalItem('lastSearch')
    console.log(data)
    data = data.filter((value) => value !== element)
    console.log(data)
    setLocalItem('lastSearch', data)
    setLastSearch(data)
  }


  return (
    <form className='flex' onSubmit={handleSubmit}>
      <div className=' h-10 flex flex-col'>
        <div className="flex border rounded-full">
          <input className='h-10 w-96 text-sm px-4 rounded-l-full bg-inherit'
            ref={inputRef}
            type="text"
            placeholder='Search'
            onChange={handleChange}
            onFocus={loadLastSearchs}
            onBlur={unLoadLastSearchs}
          />
          <button type='submit' className='w-16 grid place-items-center rounded-r-full bg-neutral-600 hover:bg-neutral-700' onClick={() => { console.log('search') }}><BsSearch /></button>
        </div>

        {showLastSearchs ? <div className=' bg-neutral-800  rounded-xl shadow-neutral-900 shadow-md '>
          <ul className='flex flex-col'>
            {lastSearch.map((ele) => {
              return (<li className='flex justify-between rounded-full  hover:bg-neutral-700' key={ele}>
                <span onClick={(e) => searchElement(e, ele)} className='px-2 py-1'>{ele}</span>
                <button onClick={(e) => removeElement(e, ele)} className='text-blue-500 px-2 hover:underline'>remove</button>
              </li>)
            })}
            {suggestions.map((ele) => {
              return (<li className='flex justify-between rounded-full  hover:bg-neutral-700' key={ele}>
                <span onClick={(e) => searchElement(e, ele)} className='px-2 py-1'>{ele}</span>
                {/* <button onClick={(e) => removeElement(e, ele)} className='text-blue-500 px-2 hover:underline'>remove</button> */}
              </li>)
            })}
          </ul>
        </div> : null}
      </div>
      <button className='mx-8 bg-neutral-600 bg-opacity-40 hover:bg-opacity-80 p-3 rounded-full'> <BsFillMicFill /> </button>
    </form>
  )
}
