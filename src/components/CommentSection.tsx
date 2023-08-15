
interface IComment {
  name: string,
  text: string,
  replies: IComment[]
}

const commentData = [
  {
    name: 'Hanzla',
    text: ' Lorem ipsum dolor sit . Sequi, similique!',
    replies: [
      {
        name: 'Hanzala12',
        text: ' Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, similique!',
        replies: [
          {
            name: 'Hanzala121',
            text: ' Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, similique!',
            replies: [
              {
                name: 'Hanzala122',
                text: ' Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, similique!',
                replies: [

                ]
              }, {
                name: 'Hanzala1223',
                text: ' Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, similique!',
                replies: [

                ]
              }, {
                name: 'Hanzala1224',
                text: ' Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, similique!',
                replies: [

                ]
              },
            ]
          },
        ]
      },
    ]
  }, {
    name: 'Hanzala1',
    text: ' Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, similique!',
    replies: [
      {
        name: 'Hanzala13',
        text: ' Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, similique!',
        replies: [
          {
            name: 'Hanzala131',
            text: ' Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, similique!',
            replies: [

            ]
          },
        ]
      }, {
        name: 'Hanzala1',
        text: ' Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, similique!',
        replies: [

        ]
      },
    ]
  }, {
    name: 'Hanzla2',
    text: ' Lorem ipsum dolor sit amet consectetur, similique!',
    replies: [

    ]
  }, {
    name: 'Hanzla3',
    text: ' Lorem  consectetur adipisicing elit. Sequi, similique!',
    replies: [

    ]
  },
]


const Comment = ({ data }: { data: IComment }) => {
  const { name, text } = data
  return (
    <div className='p-1 flex bg-white bg-opacity-5 rounded-md m-1'>
      <img className='aspect-square h-8 rounded-full object-cover m-2' src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400" alt="" />
      <div className=" ">
        <h3 className='font-bold'>{name}</h3>
        <p className='text-sm'>{text}</p>
      </div>
    </div>
  )
}

const CommentsList = ({ commentsList }: { commentsList: IComment[] }) => (
  commentsList.map((data: IComment, index) => (
    <div key={data.name + index}>
      <Comment data={data} />
      <div className="pl-5 ml-5 border-l">
        <CommentsList commentsList={data.replies} />
      </div>
    </div>
  ))
)

export default function CommentSection() {
  return (
    <div className='my-3 mx-1'>
      <h2 className='font-bold text-xl'>Comments</h2>
      <input type="text" />
      <button className='bg-slate-500'>comment</button>
      <CommentsList commentsList={commentData} />
    </div>
  )
}
