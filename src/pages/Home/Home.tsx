import React,{useEffect} from 'react'
import Carousel from '../../components/Carousel/Carousel'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/store';
import { getRecommendComicsAction, getTopComicsAction } from './duck/actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons';
import { faRankingStar } from '@fortawesome/free-solid-svg-icons';

export default function Home():JSX.Element {
  const dispatch = useDispatch();
  const {loading,lstRecommendComics,lstTopComics} = useSelector((state:RootState) => state.homeReducer);
  useEffect(() => {
    dispatch(getRecommendComicsAction());
    dispatch(getTopComicsAction())
  }, []);
  
  return (
    <div className='container mx-auto px-3 md:px-0'>
      <section className='py-8'>
        <h1 className='flex items-center gap-2 mb-6 text-xl sm:text-2xl md:text-3xl font-semibold'>
          <FontAwesomeIcon className='text-blue-400' icon={faThumbsUp} /> 
          <span>Recommend Comics</span>
        </h1>
        <Carousel data={lstRecommendComics}/>
      </section>
      <section className='pt-3 pb-10'>
        <h1 className='flex items-center gap-2 mb-6 text-xl sm:text-2xl md:text-3xl font-semibold'>
          <FontAwesomeIcon className='text-blue-400' icon={faRankingStar} /> 
          <span>Top Comics</span>
        </h1>
        <Carousel data={lstTopComics}/>
      </section>
    </div>
  )
}
