import { useDispatch, useSelector } from 'react-redux'
import ChatMessage from './ChatMessage'
import { FormEvent, useEffect, useState } from 'react'
import { addMessage, clearMessage } from '../store/chatSlice'
import { RootState } from '../store'
import generateName from '../utils/randomName'

export default function LiveChat() {

  const dispatch = useDispatch()
  const [liveMessage, setLiveMessage] = useState('')
  const chatMessage = useSelector((store: RootState) => store.chat.messages)
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(addMessage([{
        name: generateName(),
        message: (crypto.randomUUID()),
        key: crypto.randomUUID()
      }, {
        name: generateName(),
        message: ('sas'),
        key: crypto.randomUUID()
      }]))
    }, 1000)
    return () => {
      clearInterval(interval)
      dispatch(clearMessage())
    }
  }, [])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(addMessage([{
      name: 'hanzala',
      message: liveMessage,
      key: crypto.randomUUID()
    }]))
    setLiveMessage('')
  }

  return (
    <div className='flex flex-col w-full  h-[600px] m-1 p-1 border border-white bg-white bg-opacity-5 rounded'>
      <div className='flex h-full flex-col-reverse  overflow-y-scroll '>
        {chatMessage.map((chat) => <ChatMessage
          key={chat.key}
          name={chat.name}
          message={chat.message}
        />)}
      </div>

      <form onSubmit={handleSubmit} className='flex m-1 p-1 bg-inherit'>
        <input type="text"
          className='w-full p-1'
          value={liveMessage}
          onChange={e => setLiveMessage(e.target.value)}
        />
        <button className='px-2 py-1 border rounded' type="submit">Send</button>
      </form>

    </div>
  )
}
