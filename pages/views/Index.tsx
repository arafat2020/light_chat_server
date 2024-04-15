import React, { useEffect } from 'react'

function Index() {
  useEffect(()=>{
    console.log(window.location);
  },[])  
  return (
    <div>index</div>
  )
}

export default Index