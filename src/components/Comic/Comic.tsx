import React from 'react'
import { useNavigate } from 'react-router-dom';
import { ERROR_IMAGE_LOADING } from '../../utils/constant';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faHeart } from '@fortawesome/free-solid-svg-icons';
import { changeColorStatus, changeNumberFormat, limitCharacters } from '../../utils/globalFunc';

export default function Comic(props:any):JSX.Element {
    const navigate = useNavigate();
    const {comic,index} = props;

    return (
        <div key={index} 
          onClick={() => navigate(`/detail/${comic.id}`)}
          className='border relative rounded-md shadow-lg shadow-zinc-400 group cursor-pointer overflow-hidden hover:scale-105 duration-300'
        >
          <div className='flex gap-2 absolute top-2 left-2 items-center'>
            <span className={`${comic.is_trending ? '' : 'hidden'} font-medium bg-red-500 text-white text-xs py-0.5 px-1.5 rounded-sm`}>Hot</span>
            <span className={`${changeColorStatus(String(comic.status))} font-medium text-white text-xs py-0.5 px-1.5 rounded-sm`}>{comic.status}</span>
          </div>
          <img
            onError={(event) => {(event.target as HTMLImageElement).src = ERROR_IMAGE_LOADING}}
            className='rounded-md w-full aspect-[2/3] object-cover object-center origin-bottom select-none'
            src={comic.thumbnail}
            alt={comic.title} 
          />
          <div className='flex flex-col items-center rounded-md justify-end absolute h-full w-full bottom-0 left-0 bg-gradient-to-b from-transparent to-zinc-900/90'>
            <div className='p-3 w-full'>
              <h3 className='group-hover:text-blue-400 duration-300 text-white font-semibold md:text-lg pb-1'>{limitCharacters(comic.title, 50)}</h3>
              <div className='w-full bg-zinc-300 rounded-md mb-1' style={{ height: '0.25px' }}></div>
              <p className='text-zinc-400 font-medium text-xs mb-2'>Cập nhật: {comic.updated_at}</p>
              <div className='flex gap-2 justify-center'>
                <span className='text-xs flex items-center gap-1 bg-blue-400/25 px-1 font-medium text-blue-700 rounded'><FontAwesomeIcon icon={faEye} /> {changeNumberFormat(comic.total_views)}</span>
                <span className='text-xs flex items-center gap-1 bg-blue-400/25 px-1 font-medium text-blue-700 rounded'><FontAwesomeIcon icon={faHeart} /> {changeNumberFormat(comic.followers)}</span>
              </div>
            </div>
          </div>
        </div>
    )
}
