import { Route } from "react-router-dom";
import { useRef, useState, useEffect } from 'react'
import Header from "../Header";
import Footer from "../Footer";
import NavBar from "../Navbar";
function DefaultLayout ({ exact, path, component: Component }){
  // const [sticky,setSticky]=useState(false);

  // window.addEventListener('scroll',()=>{
  //   if(window.scrollY >=100){
  //     setSticky(true);
  //   }
  //   else
  //     setSticky(false);
  // })

  return (

    <Route
      exact={exact}
      path={path}
      render={(routeProps) => {
        return (
          <>
            <Header />
            <NavBar {...routeProps}/>
            <div style={{minHeight:"60vh"}}>
              <Component {...routeProps} />
            </div>
            <Footer />
          </>
        )
      }}  
    />
  );

}
export default DefaultLayout