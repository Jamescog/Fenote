import React from 'react'
import { SidebarData } from './SidebarData'
import './Sidebar.css'
import {NavLink} from 'react-router-dom'

const Sidebar = () => {
  return (
    <section className='sidebar'>
      
        <ul className='SidebarList active'>
        {SidebarData.map((val,key)=>{
return<li  className="row active" key={key} onClick ={()=>{window.location.pathname=val.link}}>
   
   <NavLink ><div>{val.Icon}{" "}{val.title}</div></NavLink> 
   
</li>

})}
        </ul>
      
    </section>
  
  )
}

export default Sidebar
