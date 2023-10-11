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
import PaginationComponent from '../../components/Pagination/Pagination';
import Comic from '../../components/Comic/Comic';

export default function Genres() {
  const dispatch = useDispatch();
  const { loading, lstGenres, lstComicByGenres,totalItem } = useSelector((state:RootState) => state.genresReducer);
  const type = new URLSearchParams(window.location.search).get('type');
  const page = new URLSearchParams(window.location.search).get('page');
  const navigate = useNavigate();
  const lstOptions:[] = lstGenres ? 
  lstGenres.map((genre:GenresFormat) => ({ value: genre.id, label: genre.name })) 
    : 
  [{value: 0, label: ''}] 
  const defaultOptions:any = type;
  const handleChangeType = (value: string) => {
    navigate(`/genres?type=${value}`);
  };

  useEffect(() => {
    dispatch(getLstGenresAction());
  },[type,page]);

  useEffect(() => {
    if(page) {
      dispatch(getLstComicsByGenreAction(String(type),Number(page)));
    } else {
      dispatch(getLstComicsByGenreAction(String(type),1));
    }
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
          return <Comic comic={comic} index={index} key={index}/>;
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
      <PaginationComponent uri={`/genres?type=${type}`} total={totalItem} currentPage={page}/>
    </div>
  )
}
