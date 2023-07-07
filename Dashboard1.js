// import {NavLink} from 'react-router-dom';
import React from "react";
import Sidebar from "./src/component/Sidebar";
import Profile from "./src/component/Profile";
import Topbar from "./src/component/Topbar";
import Courses from "./src/component/Courses";
import Schedule from "./src/component/Schedule";
import Progress from "./src/component/Progress";
import OurCourse from "./src/component/OurCourse";

import "./App.css";

const Dashboard1 = () => {
  return (
    <section>
      <Topbar />
      <section className="container">
        <Sidebar />
        <section>
          <Courses />
        </section>
      </section>

      <section>
        <OurCourse />
      </section>
    </section>
  );
};

export default Dashboard1;
