import { Route } from "react-router-dom";
import { useRef, useState, useEffect } from 'react'

function LayoutNone ({ exact, path, component: Component }){

  return (

    <Route
      exact={exact}
      path={path}
      render={(routeProps) => {
        return (
          <>
           
            <div>
              <Component {...routeProps} />
            </div>
            
          </>
        )
      }}  
    />
  );

}
export default LayoutNone