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
import Comic from '../../components/Comic/Comic';

export default function NewComic():JSX.Element {
  const dispatch = useDispatch();
  const {loading,lstNewComic,totalItem} = useSelector((state:RootState) => state.newCommicReducer);
  const navigate = useNavigate();
  const type = new URLSearchParams(window.location.search).get('type');
  const page = new URLSearchParams(window.location.search).get('page');
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
          return <Comic key={index} comic={comic} index={index} />;
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
      <PaginationComponent uri={`/new?type=${type}`} total={totalItem} currentPage={page}/>
    </div>
  )
}
