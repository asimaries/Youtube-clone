import { useDispatch } from "react-redux";
import ButtonList from "./ButtonList";
import VideoContainer from "./VideoContainer";
import { Menu } from "../store/appSlice";
import { useEffect } from "react";


export default function MainContainer() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(Menu(true))
  }, [])
  return (
    <div className="w-auto overflow-auto">
      <ButtonList />
      <VideoContainer />
    </div>
  )
}
