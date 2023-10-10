import React, { useState } from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faClockRotateLeft,faMagnifyingGlass,faBars} from '@fortawesome/free-solid-svg-icons';
import Navigate from '../Navigate/Navigate';
import { NavLink } from 'react-router-dom';
export default function Header():JSX.Element {
  const [isShow,setIsShow] = useState(false);
  return (
    <>
      <div className='border-b-2 fixed top-0 left-0 w-full bg-white z-30'>
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
                <NavLink to='/top'>Top Comics</NavLink>
              </li>
            </ul>
            <ul className='flex gap-5 items-center'>
              <li>
                <a href=""><FontAwesomeIcon icon={faClockRotateLeft} /></a>
              </li>
              <li>
                <form className='border px-3 py-2 focus-within:border-blue-400 rounded-full'>
                  <input type="text" className='focus:outline-none text-sm mr-2' placeholder='Search comics / authors'/>
                  <button>
                    <FontAwesomeIcon icon={faMagnifyingGlass}/>
                  </button>
                </form>
              </li>
            </ul>
          </nav>
          <button className='lg:hidden' onClick={() => setIsShow((prev) => !prev)}>
            <FontAwesomeIcon className='text-2xl' icon={faBars} />
          </button>
        </header>
      </div>
      {isShow ? <Navigate setIsShow={setIsShow}/> : ''}
    </>
    
  )
}
