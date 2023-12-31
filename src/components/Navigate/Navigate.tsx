import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faMagnifyingGlass,faHouse,faCrown,faFire,faRankingStar,faSquareUpRight,faClock,faMars,faVenus, faXmark} from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import SearchBox from '../SearchBox/SearchBox';
import { useSpring,animated } from 'react-spring';

export default function Navigate(props:any):JSX.Element {
    const {isShow,setIsShow} = props;
    const openAnimation = useSpring({
        opacity: 1,
        right:0,
        from: { opacity: 0, right: -100 },
        config: { duration: 500 },
    });
    const closeAnimation = useSpring({
        opacity: 0,
        right: -100,
        from: { opacity: 1, right: 0 },
        config: { duration: 500 },
    });

    return (
        <div className='lg:hidden top-0 fixed w-full h-full bg-black bg-opacity-90' style={{zIndex:99999}}>
            <animated.nav className='bg-white opacity-100 h-full absolute right-0' style={isShow ? openAnimation : closeAnimation}>
                <ul className='flex flex-col justify-around gap-5 p-5'>
                    <li className='text-right'>
                        <button onClick={() => setIsShow(false)}>
                            <FontAwesomeIcon className='text-2xl' icon={faXmark}/>
                        </button>
                    </li>
                    <li>
                        <SearchBox/>
                    </li>
                    <li className='hover:bg-zinc-100 p-2 duration-150'>
                        <NavLink to='/' className='flex gap-3 items-center'>
                            <FontAwesomeIcon icon={faHouse} />
                            <span className='text-lg font-semibold'>Home</span>
                        </NavLink>
                    </li>
                    <li className='hover:bg-zinc-100 p-2 duration-150'>
                        <NavLink to='/genres?type=all' className='flex gap-3 items-center'>
                        <FontAwesomeIcon icon={faCrown} />
                            <span className='text-lg font-semibold'>Genres</span>
                        </NavLink>
                    </li>
                    <li className='hover:bg-zinc-100 p-2 duration-150'>
                        <NavLink to='/top?tab=all' className='flex gap-3 items-center'>
                            <FontAwesomeIcon icon={faRankingStar} />
                            <span className='text-lg font-semibold'>Top comics</span>
                        </NavLink>
                    </li>
                    <li className='hover:bg-zinc-100 p-2 duration-150'>
                        <NavLink to='/new?type=all' className='flex gap-3 items-center'>
                            <FontAwesomeIcon icon={faSquareUpRight} />
                            <span className='text-lg font-semibold'>New comics</span>
                        </NavLink>
                    </li>
                    <li className='hover:bg-zinc-100 p-2 duration-150'>
                        <NavLink to='/history' className='flex gap-3 items-center'>
                            <FontAwesomeIcon icon={faClock} />
                            <span className='text-lg font-semibold'>History</span>
                        </NavLink>
                    </li>
                    <li className='hover:bg-zinc-100 p-2 duration-150'>
                        <NavLink to='/boy' className='flex gap-3 items-center'>
                            <FontAwesomeIcon icon={faMars} />
                            <span className='text-lg font-semibold'>Boy comics</span>
                        </NavLink>
                    </li>
                    <li className='hover:bg-zinc-100 p-2 duration-150'>
                        <NavLink to='/girl' className='flex gap-3 items-center'>
                            <FontAwesomeIcon icon={faVenus} />
                            <span className='text-lg font-semibold'>Girl comics</span>
                        </NavLink>
                    </li>
                </ul>
            </animated.nav>
        </div>
    )
}
