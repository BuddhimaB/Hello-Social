import Topbar from "../../components/topbar/Topbar"
import Sidebar from "../../components/sidebar/sidebar"
import Rightbar from "../../components/rightbar/rightbar"
import Feed from "../../components/feed/feed"
import "./home.css"
export default function Home() {
  return (
    <div>
      <Topbar />
      <div className="homeContainer">
        <Sidebar/>
        <Feed/>
        <Rightbar/>
      </div>
    </div>
  )

}


