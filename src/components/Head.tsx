import { AiOutlineMenu, } from 'react-icons/ai'
import { BsCameraVideo } from 'react-icons/bs'
import { IoNotificationsOutline } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { toggleMenu } from '../store/appSlice'
import SearchBar from './SearchBar'

function Head() {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const toggleMenuHandler = () => {
    dispatch(toggleMenu())
  }

  console.log('rendered')
  return (
    <div className='p-2 flex justify-between items-center sticky top-0 bg-neutral-900'>
      <div className='flex justify-between'>
        <button className='px-3  rounded-full hover:bg-neutral-500' onClick={toggleMenuHandler}><AiOutlineMenu size={22} /></button>
        <button className='px-3' onClick={() => navigate('/')}><img className='h-8' src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Logo_of_YouTube_%282015-2017%29.svg/1920px-Logo_of_YouTube_%282015-2017%29.svg.png?20200109235614" alt="Youtube" title='Youtube' /></button>
      </div>
      <SearchBar />
      <div className='w-40 flex justify-evenly'>
        <button className='px-1' onClick={() => console.log('camera')}><BsCameraVideo size={22} /></button>
        <button className='px-1 relative' onClick={() => console.log('notification')}><IoNotificationsOutline size={22} />
          <div className='bg-red-600 absolute top-0 left-4 text-xs rounded-full px-1'>9+</div>
        </button>
        <button className='px-1' onClick={() => console.log('profile')}><img className='aspect-square h-8 rounded-full object-cover ' src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400" alt="" /></button>
      </div>
    </div>

  )
}
{/* <div className='grid grid-flow-col p-1'>
      <div className='flex justify-around col-span-1'>
        <button className='' onClick={() => console.log('menu')}>
          <AiOutlineMenu size={22} />
        </button>
        <button className='h-8' onClick={() => navigate('/')}>
          <img className='h-8' src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Logo_of_YouTube_%282015-2017%29.svg/1920px-Logo_of_YouTube_%282015-2017%29.svg.png?20200109235614" alt="Youtube" title='Youtube' />
        </button>
      </div>
      <div className='flex col-span-10 justify-center'>
        <input className='h-8 w-1/2 px-4 rounded-l-full bg-inherit border border-white' type="text" placeholder='Search' />
        <button className='max-w-xs w-12 grid place-items-center rounded-r-full bg-neutral-600 hover:bg-neutral-700' onClick={() => { console.log('search') }}>
          <BsSearch />
        </button>
      </div>
      <div className=' flex justify-evenly  col-span-1'>
        <button onClick={() => console.log('camera')}>
          <BsCameraVideo size={22} />
        </button>
        <button onClick={() => console.log('notification')}>
          <IoNotificationsOutline size={22} />
        </button>
        <button onClick={() => console.log('profile')}>
          <img className='h-7 aspect-square rounded-full object-cover' src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400" alt="" />
        </button>
      </div>
    </div> */}
export default Head