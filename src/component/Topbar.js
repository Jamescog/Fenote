import React from "react";
import "./Topbar.css";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {NavLink} from 'react-router-dom';
import Profile from "./Profile";
const Topbar = ({posts,setSearchResult}) => {
  const handelSubmit = (e)=>e.preventDefault();
  const handelonChange=(e)=>{
    if(!e.target.value)
    return setSearchResult(posts)
    const resultsArray = posts.filter(post=>post.titel.includes(
      e.target.value
    )|| posts.body.includes(e.target.value)
    )
    setSearchResult( resultsArray)
  }
  return (
    <section className="topbar">
      <section className="topbarwrapper">
        <section className="topleft">
          <span className="logo">Fenote</span>
        </section>
        <div className="middel">
          <form className="search" onSubmit={handelSubmit}>
          <input type="text" placeholder="search" onChange={handelonChange}/>
          <button>
            <SearchOutlinedIcon/>
          </button>
          </form>
         
        </div>
        <section className="topright">
         <NavLink Link='/Profile'>
         <AccountCircleIcon />
         </NavLink> 
        </section>
      </section>
    </section>
  );
};

export default Topbar;
