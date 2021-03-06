import { useState} from "react";
import { useVideoActions } from "../../context/VideoActionsContext";
import { postPlaylists } from "../../services/playListServices";
import { useAuth } from "../../context/AuthContext";
import VideoStyles from "../../pages/VideoListing/VideoListing.module.css";

const ModalForm = () => {
    const {videoActDispatch}=useVideoActions();
    const {eToken}=useAuth();
    const [playListName,setPlayListName]=useState("");
    const playlistCreate=(e)=>{
        e.preventDefault();
        playListName && postPlaylists(playListName,videoActDispatch,eToken,setPlayListName);
    }
    
  return (
    <form className={`${VideoStyles["modal-form"]}`}>
       <div>
           <input type="text" placeholder="Create Playlist" required value={playListName} onChange={(e)=>setPlayListName(e.target.value)}></input>
           <button type="submit" onClick={(e)=>playlistCreate(e)} >Create</button>
       </div>
    </form>
  )
}

export {ModalForm};