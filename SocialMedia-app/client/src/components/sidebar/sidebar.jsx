import { Bookmark, Chat, Event, Groups, Help, PlayCircle,  RssFeed, School,  WorkOutline } from "@mui/icons-material";
import "./sidebar.css";
import Closefriends from "../friends/closefriends";
import { Users } from "../../dummydata";
export default function Sidebar() {
  return (
    <div className="sideBar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <RssFeed className="sidebarIcon"/>
            <span className="sidebarListItemText"> Feed</span>
          </li>

          <li className="sidebarListItem">
            <Chat className="sidebarIcon"/>
            <span className="sidebarListItemText"> Chats</span>
          </li>

          <li className="sidebarListItem">
            <PlayCircle className="sidebarIcon"/>
            <span className="sidebarListItemText"> Videos</span>
          </li>

          <li className="sidebarListItem">
            <Groups className="sidebarIcon"/>
            <span className="sidebarListItemText"> Groups</span>
          </li>

          <li className="sidebarListItem">
            <Bookmark className="sidebarIcon"/>
            <span className="sidebarListItemText"> BookMarks</span>
          </li>

          <li className="sidebarListItem">
            <Help className="sidebarIcon"/>
            <span className="sidebarListItemText"> Questions</span>
          </li>

          <li className="sidebarListItem">
            <WorkOutline className="sidebarIcon"/>
            <span className="sidebarListItemText"> Jobs</span>
          </li>

          <li className="sidebarListItem">
            <Event className="sidebarIcon"/>
            <span className="sidebarListItemText"> Events</span>
          </li>

          <li className="sidebarListItem">
            <School className="sidebarIcon"/>
            <span className="sidebarListItemText"> Courses</span>
          </li>

        </ul>

        <button className="sidebarButton">Show More</button>
        <hr className="sidebarHr"/>
        <ul className="sidebarFriendList">
          
          {Users.map(u => (
      <Closefriends key={u.id} user={u} />
    ))}
          </ul>
      </div>
      
    </div>
  )
}
