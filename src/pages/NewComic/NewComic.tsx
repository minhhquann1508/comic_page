import React,{useEffect,useCallback} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/store';
import { getListNewComicAction } from './duck/actions';
import { Select, Space,Skeleton } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrown, faHeart } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import { useNavigate } from 'react-router-dom';
import { ERROR_IMAGE_LOADING } from '../../utils/constant';
import { limitCharacters } from '../../utils/globalFunc';
import PaginationComponent from '../../components/Pagination/Pagination';

export default function NewComic():JSX.Element {
  const dispatch = useDispatch();
  const {loading,lstNewComic} = useSelector((state:RootState) => state.newCommicReducer);
  const navigate = useNavigate();
  const type = new URLSearchParams(window.location.search).get('type');
  const page = new URLSearchParams(window.location.search).get('page');
  const total = lstNewComic ? lstNewComic.total_pages * 36 : 1000;
  useEffect(() => {
    if(page) {
      dispatch(getListNewComicAction(Number(page),String(type)));
    } else {
      dispatch(getListNewComicAction(1,String(type)));
    }
  }, [type,page]);

  const handleChangeType = (value: string) => {
    navigate(`/new?type=${value}`);
  };

  const renderComics = useCallback(() => {
    if(loading || !lstNewComic) {
      return new Array(20).fill(null).map((_,index) => {
        return (
          <Skeleton key={index}/>
        )
      })
    } else {
      if(lstNewComic) {
        return lstNewComic.comics.map((comic:any, index:number) => {
          return (
            <div key={index} 
              onClick={() => navigate(`/detail/${comic.id}`)}
              className='border relative rounded-md shadow-lg shadow-zinc-400 group cursor-pointer overflow-hidden hover:scale-105 duration-300'>
              <img
                onError={(event) => {(event.target as HTMLImageElement).src = ERROR_IMAGE_LOADING}}
                className='rounded-md w-full aspect-[2/3] object-cover object-center origin-bottom select-none'
                src={comic.thumbnail}
                alt={comic.title} />
              <div className='flex flex-col items-center rounded-md justify-end absolute h-full w-full bottom-0 left-0 bg-gradient-to-b from-transparent to-zinc-900/90'>
                <div className='p-3 w-full'>
                  <h3 className='group-hover:text-blue-400 duration-300 text-white font-semibold md:text-lg pb-1'>{limitCharacters(comic.title, 50)}</h3>
                  <div className='w-full bg-zinc-300 rounded-md mb-1' style={{ height: '0.25px' }}></div>
                  <p className='text-zinc-400 font-medium text-xs mb-2'>Cập nhật: {comic.updated_at}</p>
                  <div className='flex gap-2 justify-center'>
                    <span className='text-xs flex items-center gap-1 bg-blue-400/25 px-1 font-medium text-blue-700 rounded'><FontAwesomeIcon icon={faEye} /> 39K</span>
                    <span className='text-xs flex items-center gap-1 bg-blue-400/25 px-1 font-medium text-blue-700 rounded'><FontAwesomeIcon icon={faHeart} /> 1.2K</span>
                  </div>
                </div>
              </div>
            </div>
          )
        })
      }
    }
  },[lstNewComic])  
  
  return (
    <div className='container mx-auto px-3 py-10'>
      <h1 className='text-3xl font-bold text-blue-400 mb-8'><FontAwesomeIcon icon={faCrown} /> New</h1>
      <section className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 mt-8'>
        {renderComics()}
      </section>
      <PaginationComponent uri={`/new?type=${type}`} total={total}/>
    </div>
  )
}
