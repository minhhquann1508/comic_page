import React,{useCallback, useEffect,useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { RootState } from '../../redux/store';
import { getComicsDetailAction } from './duck/actions';
import { GenresFormat } from '../../types/comic';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faBook, faEye, faHeart } from '@fortawesome/free-solid-svg-icons';
import Loading from '../../components/Loading/Loading';


export default function Detail():JSX.Element {
  const navigate = useNavigate();
  const {comicId} = useParams();
  const dispatch = useDispatch();
  const {comicDetail,loading} = useSelector((state:RootState) => state.comicDetailReducer);
  const [showItem,setShowItem] = useState({item:20,isShow:false});

  useEffect(() => {
    dispatch(getComicsDetailAction(String(comicId)));
  }, [comicId]);

  const renderChapter = useCallback(() => {
    if(comicDetail) {
      return comicDetail.chapters.slice(0,showItem.item).map((chapter) => {
        return (
          <button key={chapter.id} 
            onClick={() => navigate(`/comic/${comicId}/${chapter.id}`)}
            className='text-left border p-2 rounded-md hover:bg-blue-50 duration-200'>
            {chapter.name.replace('Chuong','Chương')}
          </button>
        )
      })
    }
  },[comicDetail,showItem])

  const renderHideItemBtn = () => {
    if(showItem.isShow && showItem.item > 20) {
      return (
        <button className='hover:underline duration-200 text-black' onClick={() => {
          setShowItem((prev) => ({
            ...prev,
            item: 20,
            isShow : false,
          }))
        }}>Hide</button>
      )
    }
  }

  const renderShowItemBtn = () => {
    if(comicDetail) {
      if(showItem.item < comicDetail.chapters.length) {
        return (
          <button className='hover:underline duration-200 mr-3' 
            onClick={() => {
              setShowItem((prev) => ({
                ...prev, 
                isShow: true,
                item: prev.item + 20,
              }));
            }}
          >
            Show more
          </button>
        )
      }
    }
  }
  if(comicDetail && !loading) {
    return (
      <>
        <section className='w-2/3 mx-auto py-8'>
          <div className='flex gap-5 lg:gap-8 items-center mb-8 flex-col justify-center lg:flex-row lg:items-start'>
            <div className='aspect-[2/3] w-64'>
              <img className='w-full h-fit object-cover rounded-md shadow-lg shadow-zinc-400' src={comicDetail?.thumbnail} alt={comicDetail?.title} />
            </div>
            <div className='w-full'>
              <h1 className='font-bold text-2xl mb-3'>{comicDetail?.title}</h1>
              <div className='flex flex-wrap gap-3 mb-2'>
                {comicDetail?.genres.map((genre:GenresFormat) => {
                  return (
                    <button 
                      onClick={() => navigate(`/genres?type=${genre.id}`)}
                      className='border-blue-400 border-2 py-1 px-2 rounded-md text-sm font-medium hover:bg-blue-400 duration-300' 
                      key={genre.id}>
                      {genre.name}
                    </button>
                  )
                })}
              </div>
              <p className='font-semibold mb-2'>Author: <span className='text-pink-600'>{comicDetail?.authors}</span></p>
              <div className='flex gap-3 mb-3'>
                <p><FontAwesomeIcon className='text-blue-500' icon={faEye}></FontAwesomeIcon> <span className='font-semibold'>{comicDetail?.total_views.toLocaleString()}</span></p>
                <p><FontAwesomeIcon className='text-red-500' icon={faHeart}></FontAwesomeIcon> <span className='font-semibold'>{comicDetail?.followers.toLocaleString()}</span></p>
              </div>
              <p className='leading-7 mb-5'>{comicDetail?.description}</p>
              <div className='flex flex-wrap gap-3'>
                <button 
                  onClick={() => navigate(`/comic/${comicId}/${comicDetail.chapters[comicDetail.chapters.length - 1].id}`)}
                  className='shadow-md shadow-zinc-200 border-2 border-blue-400 rounded-lg p-1.5 md:p-2 md:text-lg font-semibold text-blue-400 hover:scale-105 duration-200'>
                  Read the first chapter
                </button>
                <button 
                  onClick={() => navigate(`/comic/${comicId}/${comicDetail.chapters[0].id}`)}
                  className='shadow-md shadow-zinc-200 border-2 border-blue-400 rounded-lg p-1.5 md:p-2 md:text-lg font-semibold bg-blue-400 text-white hover:scale-105 duration-200'>
                  Read the latest chapter
                </button>
              </div>
            </div>
          </div>
          <div>
            <h2 className='pb-2 mb-5 border-b border-zinc-200 text-blue-400 flex items-center gap-1'><FontAwesomeIcon icon={faBook}></FontAwesomeIcon> <span className='text-xl font-bold'>Chapter</span></h2>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-5 mb-8'>
                {renderChapter()}
            </div>
            <div className='text-center font-medium text-blue-400'>
              {renderShowItemBtn()}
              {renderHideItemBtn()}
            </div>
          </div>
        </section>
      </>
    )
  } else {
    return <Loading/>
  }
}
