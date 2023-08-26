import React, { useEffect, useRef, useState } from 'react'
import { BsSearch, BsFillMicFill } from 'react-icons/bs'
import useLocalStorage from '../hooks/useLocalStorage'
import axios from 'axios'
import { SEARCH_AUTOCOMPLETE_API } from '../constants'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store'
import { cacheResults } from '../store/searchSlice'
import { useNavigate } from 'react-router-dom'
import useSpeechToText from '../hooks/useSpeechToText'

export default function SearchBar() {

  const { isDone, toggleButtonRef, transcribedText, listingStatus } = useSpeechToText()
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [showLastSearchs, setShowLastSearchs] = useState(false)
  const [lastSearch, setLastSearch] = useState<string[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const formRef = useRef<HTMLButtonElement>(null)
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

  useEffect(() => {
    console.log(transcribedText)
    setSearchQuery(transcribedText)
    console.log(isDone)
    if (isDone) formRef.current?.click()
  }, [transcribedText, isDone])

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
    // setShowLastSearchs(false)
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (searchQuery === '') return
    let data: Array<string> | null = getLocalItem('lastSearch')
    if (data == null) data = []
    if (!data.includes(searchQuery))
      data = [searchQuery, ...data]
    setShowLastSearchs(false)
    setLocalItem('lastSearch', data)
    setLastSearch(data)
    navigate(`/results?search_query=${searchQuery}`)
  }

  function searchElement(value: string) {
    setSearchQuery(value)
    inputRef.current!.value = value
  }

  function removeElement(event: React.MouseEvent<HTMLDivElement>, element: string) {
    // console.log(element)
    event.stopPropagation()
    let data: Array<string> = getLocalItem('lastSearch')
    // console.log(data)
    data = data.filter((value) => value !== element)
    console.log(data)
    setLocalItem('lastSearch', data)
    setLastSearch(data)
  }
  // console.log(transcribedText)
  return (
    <form className='flex'
      onSubmit={handleSubmit} >
      <div className=' h-10 flex flex-col'>
        <div className="flex border rounded-full">
          <input className='h-10 w-96 text-sm px-4 rounded-l-full bg-inherit'
            value={searchQuery}
            ref={inputRef}
            type="text"
            placeholder='Search'
            onChange={handleChange}
            onFocus={loadLastSearchs}
            onBlur={unLoadLastSearchs}
          />
          <button
            // onFocus={loadLastSearchs}
            ref={formRef}
            type='submit' className='w-16 grid place-items-center rounded-r-full bg-neutral-600 hover:bg-neutral-700 ' onClick={() => { console.log('search') }}><BsSearch /></button>
        </div>
        <div
          onBlur={unLoadLastSearchs}>

          {showLastSearchs ? <div className=' bg-neutral-800  rounded-xl shadow-neutral-900 shadow-md w-full  '
          >
            <div className='flex flex-col'>
              {lastSearch.map((ele) => (
                <button onClick={() => searchElement(ele)} className=' flex justify-between items-center rounded-full  hover:bg-neutral-700' key={ele} >
                  <div className='px-3 py-1'>{ele}</div>
                  <div onClick={(e) => removeElement(e, ele)} className='  text-red-500 px-2 hover:underline transition'>remove</div>
                </button>
              ))}
              {suggestions.map((ele) => (
                <button onClick={() => searchElement(ele)} className=' flex justify-between items-center rounded-full  hover:bg-neutral-700' key={ele}>
                  <div className='px-3 py-1'>{ele}</div>
                </button>
              ))}
            </div>
          </div> : null}
        </div>
      </div>
      <button type='button'
        disabled={listingStatus} ref={toggleButtonRef} className='mx-8 bg-neutral-600 bg-opacity-40 hover:bg-opacity-80 p-3 rounded-full disabled:opacity-20'> <BsFillMicFill /> </button>
    </form>
  )
}
