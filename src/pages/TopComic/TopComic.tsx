import React,{useCallback, useEffect,useState} from 'react'
import PaginationComponent from '../../components/Pagination/Pagination'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCrown, faEye, faHeart } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { getLstTopComicAction } from './duck/action'
import { Select, Skeleton } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'
import { ERROR_IMAGE_LOADING, lstStatus, lstTab } from '../../utils/constant'
import { limitCharacters } from '../../utils/globalFunc'
import Comic from './../../components/Comic/Comic';

export default function TopComic():JSX.Element {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {loading,lstTopComic,totalItem} = useSelector((state:RootState) => state.topComicReducer);
  const [status,setStatus] = useState<string>('all');
  const tab = new URLSearchParams(window.location.search).get('tab') || 'all';
  const page = new URLSearchParams(window.location.search).get('page') || 1;

  useEffect(() => {
    dispatch(getLstTopComicAction(String(tab),Number(page),status));    
  }, [tab,page,status]);

  const handleChangeTab = (value:string) => {
    if(value === 'all') {
      navigate(`/top?status=all&page=1`);
    } else {
      navigate(`/top?tab=${value}&status=${status}&page=1`);
    }
  };

  const handleChangeStatus = (value:string) => {
      setStatus(value);
      navigate(`/top?tab=${tab}&status=${value}&page=1`);
  };

  const renderComics = useCallback(() => {
    if(loading || !lstTopComic) {
      return new Array(20).fill(null).map((_,index) => {
        return (
          <Skeleton key={index}/>
        )
      })
    } else {
      if(lstTopComic) {
        return lstTopComic.comics.map((comic:any, index:number) => {
          return <Comic key={index} comic={comic} index={index}/>
        })
      }
    }
  },[lstTopComic]);
  

  return (
    <div className='container mx-auto px-3 py-10'>
      <div className='flex gap-7 sm flex-col md:flex-row md:items-center'>
        <h1 className='text-3xl font-bold text-blue-400'><FontAwesomeIcon icon={faCrown} /> Top</h1>
        <div className='flex gap-5 items-center'>
          <Select
              defaultValue={'all'}
              style={{ width: 140 }}
              dropdownStyle={{background:'#fff',borderRadius:5,border:'1px solid #ccc'}}
              onChange={handleChangeTab}
              options={lstTab}
            />
            <Select
              defaultValue={'all'}
              style={{ width: 140 }}
              dropdownStyle={{background:'#fff',borderRadius:5,border:'1px solid #ccc'}}
              onChange={handleChangeStatus}
              options={lstStatus}
            />
        </div>
      </div>
      <section className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 mt-8'>
        {renderComics()}
      </section>
      {tab === 'all' ? 
      <PaginationComponent uri={`/top?status=${status}`} total={totalItem} currentPage={page}/>
        :
      <PaginationComponent uri={`/top?${tab}?status=${status}`} total={totalItem} currentPage={page}/>
      }
    </div>
  )
}
