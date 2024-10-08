import React from 'react'
import { Link } from 'react-router-dom'

function HeaderNext() {
  return (
    <>
    <header>
            <div className='container'>
            <img src="https://www.freepnglogos.com/uploads/coffee-logo-png/coffee-logo-logo-elements-logo-objects-3.png" alt="Coffee" className='logo'/>
            <h2>Welcome to Coffee Shop About page</h2>
            </div>
            <div className='Btncontainer'>
            <div className='btnss'>
                <Link to={'/#'} className='link'>Home page</Link> 
            </div>
            </div>
        </header>
        </>
  )
}

export default HeaderNext
