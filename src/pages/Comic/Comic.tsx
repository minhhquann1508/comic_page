import React,{useEffect,useCallback,useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/store';
import { useParams } from 'react-router-dom';
import { getChapterImageAction } from './duck/actions';
import { ChapterImage } from '../../types/comic';
import OptionalBar from '../../components/OptionalBar/OptionalBar';
import Loading from '../../components/Loading/Loading';

export default function Comic():JSX.Element {
  const {lstChapterImg,loading} = useSelector((state:RootState) => state.chapterReducer);
  const [showOptional,setShowOptional] = useState<boolean>(false);
  const dispatch = useDispatch();
  const {comicId,chapterId} = useParams();
  useEffect(() => {
    dispatch(getChapterImageAction(String(comicId),Number(chapterId)))
  }, [comicId,chapterId])
  
  const renderChapterImage = useCallback(() => {
    if(lstChapterImg) {
      return lstChapterImg.images.map((image:ChapterImage) => {
        return (
          <img className='w-full object-cover' 
            onError={(event) => (event.target as HTMLImageElement).src = image.backup_src}
            key={image.page} 
            src={image.src} 
            alt={image.src}/>
        )
      })
    } else {
      return <Loading/>
    }
  },[lstChapterImg])

  return (
    <>
      <div className='flex justify-center bg-zinc-800' onClick={() => setShowOptional((prev:boolean) => !prev)}>
        <div className='sm:w-2/3' style={{minHeight:700}}>
          {renderChapterImage()}
        </div>
      </div>
      <OptionalBar 
          isShowOptional={showOptional}
          currentChapterId={chapterId} 
          currentComicId={comicId} 
          chapters={lstChapterImg?.chapters}
      />
    </>
  )
}
