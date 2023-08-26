import { GoHome, GoHistory, GoVideo } from "react-icons/go"
import { MdSubscriptions, MdOutlineVideoLibrary, MdOutlineWatchLater } from "react-icons/md"
import { GiUnderwearShorts } from "react-icons/gi"
import { BiLike } from "react-icons/bi"
import { SlArrowDown } from "react-icons/sl"
import { useSelector } from "react-redux"
import { RootState } from "../store"

const sectionStyle = "flex p-1 m-1 rounded hover:bg-neutral-600"
const sectionList = [
  { icon: GoHome, name: "Home" },
  { icon: GiUnderwearShorts, name: "Shorts" },
  { icon: MdSubscriptions, name: "Subscriptions" }
]
const libraryList = [
  { icon: MdOutlineVideoLibrary, name: "Library" },
  { icon: GoHistory, name: "History" },
  { icon: GoVideo, name: "Your videos" },
  { icon: MdOutlineWatchLater, name: "Watch Later" },
  { icon: BiLike, name: "Liked videos" },
]

export default function SideBar() {

  const isMenuOpen = useSelector((store: RootState) => store.app.isMenuOpen)

  if (!isMenuOpen) return null
  return (
    <div className="text-sm my-1 ">
      <ul>
        {sectionList.map(ele => <li key={ele.name} className={sectionStyle}>
          <ele.icon size={18} />
          <h6 className="ml-4">{ele.name}</h6>
        </li>)}

        <hr />
        {libraryList.map(ele => <li key={ele.name} className={sectionStyle}>
          <ele.icon size={18} />
          <h6 className="ml-4">{ele.name}</h6>
        </li>)}
        <li key={"Show more"} className={sectionStyle}>
          <SlArrowDown size={18} />
          <h6 className="ml-4">Show more</h6>
        </li>
      </ul>
    </div>
  )
}
