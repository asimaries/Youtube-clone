import { GoCloudOffline } from 'react-icons/go'

export default function Offline() {
  return (
    <div className='flex justify-center items-center  min-h-max'>
      <div className='grid place-items-center my-20'>
        <GoCloudOffline size={120} />
        <h3 className='text-xl'>Connect to the Internet</h3>
        <p className='text-xs'>You're offline. Check your Internet</p>
        <button className='border rounded-full px-3 py-1 m-2 bg-neutral-900 text-em hover:bg-neutral-600' onClick={() => location.reload()}>Retry</button>
      </div>
    </div>
  )
}
