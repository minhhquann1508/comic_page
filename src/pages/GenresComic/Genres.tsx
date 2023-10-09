import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getLstComicsByGenreAction, getLstGenresAction } from './duck/actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrown, faHeart } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import { limitCharacters } from '../../utils/globalFunc';
import { useLocation, useNavigate } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';
import { RootState } from '../../redux/store';
import { Select, Space,Skeleton } from 'antd';
import { GenresFormat } from '../../types/comic';
import { ERROR_IMAGE_LOADING } from '../../utils/constant';

export default function Genres() {
  const dispatch = useDispatch();
  const { loading, lstGenres, lstComicByGenres } = useSelector((state:RootState) => state.genresReducer);
  const type = new URLSearchParams(window.location.search).get('type');
  const page = new URLSearchParams(window.location.search).get('page');
  const navigate = useNavigate();
  const lstOptions:[] = lstGenres ? 
  lstGenres.map((genre:GenresFormat) => ({ value: genre.id, label: genre.name })) 
    : 
  [{value: 0, label: ''}] 
  const defaultOptions:string = lstGenres ? lstGenres.find((genre:GenresFormat) => genre.id === type) : type;
  const handleChangeType = (value: string) => {
    navigate(`/genres?type=${value}`);
  };

  useEffect(() => {
    dispatch(getLstGenresAction());
  },[type]);

  useEffect(() => {
    dispatch(getLstComicsByGenreAction(String(type),Number(page)));
  },[type,page]);

  const renderComics = useCallback(() => {
    if(loading || !lstComicByGenres) {
      return new Array(20).fill(null).map((_,index) => {
        return (
          <Skeleton key={index}/>
        )
      })
    } else {
      if(lstComicByGenres) {
        return lstComicByGenres.comics.map((comic:any, index:number) => {
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
  },[lstComicByGenres])  

  return (
    <div className='container mx-auto px-3 py-10'>
      <section className='flex gap-5 items-center'>
        <h1 className='text-3xl font-bold text-blue-400'><FontAwesomeIcon icon={faCrown} /> Genres</h1>
        <Select
          defaultValue={defaultOptions}
          style={{ width: 150 }}
          dropdownStyle={{background:'#fff',borderRadius:5,border:'1px solid #ccc'}}
          onChange={handleChangeType}
          options={lstOptions}
        />
      </section>
      <section className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 mt-8'>
        {renderComics()}
      </section>
    </div>
  )
}
