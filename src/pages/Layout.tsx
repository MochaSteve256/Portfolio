import {Outlet} from "react-router-dom";

import Navbar from "../components/Navbar";
const Layout = () => {
    return (
      <>
        <Navbar />
        <div style={{ paddingTop: "32px" }}>
        <Outlet />
        </div>
      </>
    );
  };
  
export default Layout;