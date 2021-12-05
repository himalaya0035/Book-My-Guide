import React from 'react'
import BottomNav from '../Components/BottomNav/BottomNav'
import { getAccessToken, parseJwt } from '../jwtparser'


function Layout({children}) {
    let userObject
    try{
     userObject = parseJwt(getAccessToken())
    }
    catch(err){
        console.log(err)
        userObject = {}
    }
    return (
        <>
           {children}
           <BottomNav userObject = {userObject} /> 
        </>
    )
}

export default Layout
