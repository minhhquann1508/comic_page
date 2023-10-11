import React,{useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/store';
import { getLstComicByKeywordAction } from './duck/action';
import { useNavigate, useParams } from 'react-router-dom';
import { Skeleton } from 'antd';
import { GenresFormat } from '../../types/comic';
import { ERROR_IMAGE_LOADING } from '../../utils/constant';
import PaginationComponent from '../../components/Pagination/Pagination';

export default function SearchComic():JSX.Element {
  const dispatch = useDispatch();
  const {keyword} = useParams();
  const {loading,lstComicByKeyword,totalItem} = useSelector((state:RootState) => state.searchComicReducer);
  const page = new URLSearchParams(window.location.search).get('page');
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getLstComicByKeywordAction(String(keyword),Number(page)));
  }, [keyword,page]);

  const renderComic = () => {
    if(lstComicByKeyword) {
      if(lstComicByKeyword.comics.length !== 0) {
        return lstComicByKeyword.comics.map((comic:any,index:number) => {
          return (
            <div key={index} 
              onClick={() => navigate(`/detail/${comic.id}`)}
              className='group cursor-pointer hover:bg-gray-200 duration-200 flex gap-5 bg-gray-50 border border-gray-150 p-3 rounded-md'
            >
              <img 
                className='rounded aspect-[2/3] w-44 sm:w-auto sm:h-36 border border-blue-300 object-cover"' 
                src={comic.thumbnail}
                onError={(e) => (e.target as HTMLImageElement).src = ERROR_IMAGE_LOADING}
                alt={comic.title} 
              />
              <div className='w-full'>
                <h3 className='group-hover:text-blue-400 duration-200 text-lg text-black leading-5 font-semibold mb-2'>{comic.title}</h3>
                <p className='text-sm line-clamp-2 font-semibold text-gray-500 mb-3 leading-6'>{comic.short_description}</p>
                <ul className='flex flex-wrap gap-2'>
                  {comic.genres.map((genre:GenresFormat) => {
                    return (
                      <li key={genre.id} className='bg-cyan-100 text-cyan-800 text-xs px-2.5 py-0.5 rounded-full font-medium'>{genre.name}</li>
                    )
                  })}
                </ul>
              </div>
            </div>
          )
        })
      } else {
        return <div className='pt-10 font-semibold text-xl'>No result</div>
      }
    } else {
      return new Array(20).fill(null).map((_,index) => {
        return (
          <Skeleton key={index}/>
        )
      })
    }
  }
  
  return (
    <div className='flex justify-center py-10'>
      <section className='w-4/5'>
        <div className='grid grid-cols-2 gap-10' style={{minHeight:600}}>
          {renderComic()}
        </div>
        <PaginationComponent uri={`/search/${keyword}?type=all`} total={totalItem} currentPage={page}/>
      </section>
    </div>
  )
}
