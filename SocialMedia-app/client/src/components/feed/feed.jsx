import { useContext, useEffect, useState } from "react";
import Post from "../posts/posts"
import Share from "../share/share"
import "./feed.css"
import axios from "axios"
import { AuthContext } from "../../context/AuthContext";



export default function Feed({username}) {
  const [Posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = username 
        ? await axios.get("/posts/profile/" + username) 
        : await axios.get("/posts/timeline/" + user._id);
        setPosts(res.data);
        console.log(res.data.sort((p1,p2)=>{
          return new Date(p2.createdAt)-new Date(p1.createdAt)
        }));
      } catch (err) {
        console.error(err);
      }
    };
    
    fetchPosts();
  }, [username,user._id]);

  return (
    <div className="feed">
      <div className="feedWrapper">
        {(!username || username===user.username) && <Share />}
        {Posts.map((p) => (
          <Post key={p._id} post={p} />
        ))
        }
        
        
      </div>
    </div>
  )
}
