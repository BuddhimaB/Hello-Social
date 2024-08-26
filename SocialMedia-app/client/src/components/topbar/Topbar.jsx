import { Chat, Notifications, Person, Search } from "@mui/icons-material"
import "./topbar.css"
import { Link } from "react-router-dom" //this is used to link to different pages
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";


export default function Topbar() {
  const PF=process.env.REACT_APP_PUBLIC_FOLDER;//this is the path to the public folder
 const {user}= useContext(AuthContext);///this is used to get the user from the context

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to='/' style={{textDecoration:'none'}}>
        <span className="Logo">HelloSocial</span>
        
        </Link>
      </div>


      <div className="topbarCenter">
        <div className="searchbar">
          <input placeholder="Search for friend, post or video" className="searchInput" />
          <span className="searchIcon">
            <Search />
          </span>
        </div>
        </div>



      <div className="topbarRight">

        <div className="topbarLinks">
          <span className="topbarLinks">Homepage</span>
          <span className="topbarLinks">Timeline</span>
        </div>

        <div className="topbarIcons">

          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>

          <div className="topbarIconItem">
            <Chat />
            <span className="topbarIconBadge">1</span>
          </div><div className="topbarIconItem">
            <Notifications/>
            <span className="topbarIconBadge">2</span>
          </div>
        </div>
        <Link to={`/profile/${user.username}`}>
        <img src={user.profilePicture 
          ? PF+user.profilePicture 
          : PF+ "persons/noImage.png"} 
          alt="" className="topbarImg" />
        </Link>
      </div>  
    </div>
  )
}
