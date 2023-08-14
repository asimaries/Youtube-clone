import React, { useRef, useState } from 'react'
import { BsSearch, BsFillMicFill } from 'react-icons/bs'
import { debounce } from '../utils/debounce'
import useLocalStorage from '../hooks/useLocalStorage'

export default function Search() {

  const [searchText, setSearchText] = useState('')
  const [showLastSearchs, setShowLastSearchs] = useState(false)
  const { setLocalItem, getLocalItem } = useLocalStorage()
  const [lastSearch, setLastSearch] = useState<string[]>([])
  const inputRef = useRef<HTMLInputElement>(null)



  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value)
    const func = () => console.log(event.target.value)
    debounce(func)
  }

  function loadLastSearchs(event: React.FocusEvent<HTMLInputElement>) {
    let data: Array<string> | null = getLocalItem('lastSearch')
    if (data == null) {
      data = []
    }
    setLastSearch(data)
    setShowLastSearchs(true)
  }

  function unLoadLastSearchs() {
    setTimeout(() => { setShowLastSearchs(false) }, 100)
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (searchText === '') return
    let data: Array<string> | null = getLocalItem('lastSearch')
    if (data == null) {
      data = []
    }
    data = [searchText, ...data]
    setShowLastSearchs(false)
    setLocalItem('lastSearch', data)
    setLastSearch(data)
  }

  function searchElement(event: React.MouseEvent<HTMLSpanElement>, value: string) {
    setSearchText(value)
    inputRef.current!.value = value
  }

  function removeElement(event: React.MouseEvent<HTMLButtonElement>, removeIndex: number) {
    console.log(removeIndex)
    let data: Array<string> = getLocalItem('lastSearch')
    console.log(data)
    data = data.filter((value, index) => index !== removeIndex)
    console.log(data)
    setLocalItem('lastSearch', data)
    setLastSearch(data)
  }


  return (
    <form className='flex' onSubmit={handleSubmit}>
      <div className=' h-10 flex flex-col relative'>
        <div className="flex border rounded-full">
          <input className='h-10 w-96 text-sm px-4 rounded-l-full bg-inherit'
            ref={inputRef}
            type="text"
            placeholder='Search'
            onChange={handleChange}
            onFocus={loadLastSearchs}
            onBlur={unLoadLastSearchs}
          />
          <button className='w-16 grid place-items-center rounded-r-full bg-neutral-600 hover:bg-neutral-700' onClick={() => { console.log('search') }}><BsSearch /></button>
        </div>
        {showLastSearchs && <div className='bg-neutral-800  rounded-xl  '>
          <ul className='flex flex-col'>
            {lastSearch.map((ele, index) => {
              return (<li className='flex justify-between rounded-full  hover:bg-neutral-700' key={index}>
                <span onClick={(e) => searchElement(e, ele)} className='px-2 py-1'>{ele}</span>
                <button onClick={(e) => removeElement(e, index)} className='text-blue-500 px-2 hover:underline'>remove</button>
              </li>)
            })}
          </ul>
        </div>}
      </div>
      <button className='mx-8 bg-neutral-600 bg-opacity-40 hover:bg-opacity-80 p-3 rounded-full'> <BsFillMicFill /> </button>
    </form>
  )
}
