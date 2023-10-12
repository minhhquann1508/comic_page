import React,{useState} from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { useSpring,animated } from 'react-spring';

export default function OptionalBar(props:any):JSX.Element {
    const openAnimation = useSpring({
        opacity: 1,
        bottom:0,
        from: { opacity: 0, bottom: -100 },
        config: { duration: 500 },
    });
    const closeAnimation = useSpring({
        opacity: 0,
        right: -100,
        from: { opacity: 1, right: 0 },
        config: { duration: 500 },
    });
    const {currentChapterId,chapters,currentComicId,isShowOptional} = props;
    const [showEp,setShowEp] = useState(false);
    const navigate = useNavigate();
    const index = chapters?.findIndex((chapter:any) => chapter.id == currentChapterId);
    const nextBtnCondition = index && index > 0;
    const prevBtnCondition = chapters && index < chapters.length - 1;

    const changeChapter = (status:boolean) => {
        if(status) {
             //Handle Next 
            navigate(`/comic/${currentComicId}/${chapters[index - 1].id}`);
        } else {
            //Handle Previous
            navigate(`/comic/${currentComicId}/${chapters[index + 1].id}`);
        }
    }
    return (
        <animated.div 
            style={openAnimation}
            className={`${isShowOptional ? '' : 'hidden'} fixed bottom-0 left-0 w-full bg-black bg-opacity-70 py-4 flex justify-center gap-2`}
        >
            <button
                onClick={() => changeChapter(false)} 
                disabled={!prevBtnCondition} 
                className={`${prevBtnCondition ? '' : 'cursor-not-allowed'} font-medium px-3 py-1 rounded-full bg-gray-200 text-gray-500 hover:scale-105 duration-200`}>
                Previous
            </button>
            <button
                onClick={() => changeChapter(true)} 
                disabled={!nextBtnCondition} 
                className={`${nextBtnCondition ? '' : 'cursor-not-allowed'} font-medium px-3 py-1 rounded-full bg-emerald-200 text-emerald-500 hover:scale-105 duration-200`}>
                Next
            </button>
            <button 
                onClick={() => setShowEp((prev) => !prev)}
                className='font-medium px-3 py-1 bg-fuchsia-200 text-fuchsia-500 rounded-full relative'>
                Episodes
                <div className={`${showEp ? '' : 'hidden'} z-10 absolute bg-zinc-900 w-60 py-3 rounded bottom-9 text-white right-full translate-x-1/3 sm:translate-x-1/2 sm:right-1/2 text-left duration-200 origin-bottom scale-100`}>
                    <h5 className='px-4 mb-2'>All Episodes ({chapters?.length})</h5>
                    <ul className='custom-scrollbar overflow-auto text-sm h-max max-h-72 font-semibold'>
                        {chapters?.map((chapter:any,index:number) => {
                            return (
                                <NavLink key={index} to={`/comic/${currentComicId}/${chapter.id}`} className='py-2 block truncate px-5 duration-100 hover:bg-zinc-950'>{chapter.name.replace('Chuong','Chương')}</NavLink>
                            )
                        })}
                    </ul>
                </div>
            </button>
        </animated.div>
    )
}
