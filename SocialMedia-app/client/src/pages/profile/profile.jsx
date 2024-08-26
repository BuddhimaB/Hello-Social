import './profile.css';
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/sidebar";
import Rightbar from "../../components/rightbar/rightbar";
import Feed from "../../components/feed/feed";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

export default function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER; // This is the path to the public folder
  const [user, setUser] = useState({}); // Initialize with an empty object
const username = useParams().username; // Get the parameters from the URL



  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`/users?username=${username}`); // Fetch the user by username
        console.log("Fetched User Data:", res.data);
        setUser(res.data);
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };

    fetchUser();
  }, [username]);

  return (
    <div>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img 
              src={user.coverPicture ? PF+ user.coverPicture: `${PF}persons/noCover.png`} 
              alt="" 
              className="profileCoverImg" />

              <img 
              src={user.profilePicture ? PF+user.profilePicture :`${PF}persons/noImage.png`} 
              alt="" 
              className="profileUserImg" />

            </div>
            <div className="profileInfo">
              <h4 className='profileInfoName'>{user.username || "Loading..."}</h4>
              <span className="profileInfoDesc">{user.desc || "No description available"}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={user.username} />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </div>
  );
}
