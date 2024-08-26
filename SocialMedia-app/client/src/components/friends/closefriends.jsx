import "./closefriends.css";

export default function Closefriends({user}) {
  const PF=process.env.REACT_APP_PUBLIC_FOLDER;//this is the path to the public folder
  return (
    <li className="sidebarFriend">
            <img src={PF+user.profilePicture} alt="" className="sidebarFriendImg"/>
            <span className="sidebarFriendName">{user.username}</span>
          </li>
  )
}
