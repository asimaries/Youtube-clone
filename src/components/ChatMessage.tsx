export default function ChatMessage({ name, message }: { name: string, message: string }) {
  return (
    <div className='flex items-center m-1 p-1 bg-inherit rounded-md '>
      <img
        className='aspect-square h-8 rounded-full object-cover'
        src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400"
        alt="" />
      <span className='font-bold px-2'>{name}</span>
      <span>{message}</span>
    </div>
  )
}
