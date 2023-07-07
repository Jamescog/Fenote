import React from 'react'
import {people} from './People'

const Profile = () => {
  return (
    <div>
  
    <ul>
      {people.map((person) => (
        <li key={person.email} class="">
          <img className="img" src={person.image} alt="" />
          <div className="">
            <p className="">{person.name}</p>
            <p className="">{person.email}</p>
          </div>
        </li>
      ))}
    </ul>


    </div>
  )
}

export default Profile
