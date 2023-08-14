import { GoHome, GoHistory, GoVideo } from "react-icons/go"
import { MdSubscriptions, MdOutlineVideoLibrary, MdOutlineWatchLater } from "react-icons/md"
import { GiUnderwearShorts } from "react-icons/gi"
import { BiLike } from "react-icons/bi"
import { SlArrowDown } from "react-icons/sl"
import { useSelector } from "react-redux"
import { RootState } from "../store"

export default function SideBar() {


  const isMenuOpen = useSelector((store: RootState) => store.app.isMenuOpen)

  if (!isMenuOpen) return null
  return (
    <div className="text-sm my-1">
      <ul>
        <li><div className="flex p-1 m-1 rounded hover:bg-neutral-600 ">
          <GoHome size={18} />
          <h6 className="ml-4">Home </h6>
        </div></li>
        <li><div className="flex p-1 m-1 rounded hover:bg-neutral-600 ">
          <GiUnderwearShorts size={18} />
          <h6 className="ml-4">Shorts </h6>
        </div></li >
        <li><div className="flex p-1 m-1 rounded hover:bg-neutral-600 ">
          <MdSubscriptions size={18} />
          <h6 className="ml-4">Subscriptions </h6>
        </div></li >
        <hr />
        <li><div className="flex p-1 m-1 rounded hover:bg-neutral-600 ">
          < MdOutlineVideoLibrary size={18} />
          <h6 className="ml-4">Library </h6>
        </div></li >
        <li><div className="flex p-1 m-1 rounded hover:bg-neutral-600 ">
          < GoHistory size={18} />
          <h6 className="ml-4">History </h6>
        </div></li >
        <li><div className="flex p-1 m-1 rounded hover:bg-neutral-600 ">
          < GoVideo size={18} />
          <h6 className="ml-4">Your videos </h6>
        </div></li >
        <li><div className="flex p-1 m-1 rounded hover:bg-neutral-600 ">
          < MdOutlineWatchLater size={18} />
          <h6 className="ml-4">Watch Later </h6>
        </div></li >
        <li><div className="flex p-1 m-1 rounded hover:bg-neutral-600 ">
          < BiLike size={18} />
          <h6 className="ml-4">Liked videos </h6>
        </div></li >
        <li><div className="flex p-1 m-1 rounded hover:bg-neutral-600 ">
          < SlArrowDown size={18} />
          <h6 className="ml-4">Show more </h6>
        </div></li >
      </ul >
    </div >
  )
}
