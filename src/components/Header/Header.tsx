import React, { useState,useEffect } from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faClockRotateLeft,faBars} from '@fortawesome/free-solid-svg-icons';
import Navigate from '../Navigate/Navigate';
import { NavLink, useLocation } from 'react-router-dom';
import SearchBox from '../SearchBox/SearchBox';
export default function Header():JSX.Element {
  const [isShow,setIsShow] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsShow(false);
  }, [location])
  

  return (
    <>
      <div className='border-b-2 fixed top-0 left-0 w-full bg-white' style={{zIndex:9999}}>
        <header className='flex justify-between gap-3 items-center px-3 py-4 container mx-auto '>
          <NavLink to='/' className='block lg:w-1/5'>
            <img src="https://img.pikbest.com/png-images/20190918/cartoon-snail-loading-loading-gif-animation_2734139.png!bw700"  
              className='w-12 h-12 inline-block'
              alt="logo" />
            <span className='font-bold text-2xl' style={{fontFamily:'cursive'}}>wibucomics</span>
          </NavLink>
          <nav className='hidden lg:flex justify-between w-4/5'>
            <ul className='flex items-center gap-5'>
              <li className='font-semibold text-lg'>
                <NavLink to='/genres?type=all'>Genres</NavLink>
              </li>
              <li className='font-semibold text-lg'>
                <NavLink to='/new?type=all'>New Comics</NavLink>
              </li>
              <li className='font-semibold text-lg'>
                <NavLink to='/top?tab=all'>Top Comics</NavLink>
              </li>
            </ul>
            <ul className='flex gap-5 items-center'>
              <li>
                <a href=""><FontAwesomeIcon icon={faClockRotateLeft} /></a>
              </li>
              <li>
                <SearchBox />
              </li>
            </ul>
          </nav>
          <button className='lg:hidden' onClick={() => setIsShow((prev) => !prev)}>
            <FontAwesomeIcon className='text-2xl' icon={faBars} />
          </button>
        </header>
      </div>
      {isShow ? <Navigate setIsShow={setIsShow} isShow={isShow}/> : ''}
    </>
    
  )
}
