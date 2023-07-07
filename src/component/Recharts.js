import React, { PureComponent } from 'react';
import { AreaChart, Area, XAxis, Line, ResponsiveContainer } from 'recharts';

const Data = [
  {
    name: 'Page A',
   "Active User": 4000,
    
  },
  {
    name: 'Page B',
    "Active User": 3000,
    
  },
  {
    name: 'Page C',
    "Active User": 2000,
    
  },
  {
    name: 'Page D',
    "Active User": 2780,
  
  },
  {
    name: 'Page E',
    "Active User": 1890,
    
  },
  {
    name: 'Page F',
    "Active User": 2390,
   
  },
  {
    name: 'Page G',
    "Active User": 3490,
    
  },
];

export const Recharts =()=> {
 
    return (
      <ResponsiveContainer width="100%" aspect={4/1}>
        <AreaChart
         
          Data={Data}
          // margin={{
          //   top: 10,
          //   right: 30,
          //   left: 0,
          //   bottom: 0,
          // }}
        >
          
          <XAxis dataKey="name" stroke="#5550bd" />
          <Line type="monotone" datakey="Active User" />
          
          <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
      </ResponsiveContainer>
    );
  }


