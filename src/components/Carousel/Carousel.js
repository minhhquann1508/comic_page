import React from 'react'
import { Navigation, Pagination, Scrollbar, A11y, Autoplay, Zoom } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';
import 'swiper/css/zoom';
import { limitCharacters } from '../../utils/globalFunc';
import { useNavigate } from 'react-router-dom';
import { Skeleton } from 'antd';
import { ERROR_IMAGE_LOADING } from '../../utils/constant';

export default function Carousel(props) {
    const { data } = props;
    const navigate = useNavigate();
    return (
        <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
            spaceBetween={20}
            autoplay={{ delay: 3000 }}
            breakpoints={{
                0: {
                    slidesPerView: 2
                },
                400: {
                    slidesPerView: 2
                },
                567: {
                    slidesPerView: 3
                },
                778: {
                    slidesPerView: 4
                },
                1024: {
                    slidesPerView: 6
                }
            }}
        >
            {data ? data.map((comic) => {
                return (
                    <SwiperSlide key={comic.id}>
                        <div className='relative cursor-pointer' onClick={() => navigate(`/detail/${comic.id}`)}>
                            <img
                                onError={(e) => e.target.src = ERROR_IMAGE_LOADING}
                                className='w-full aspect-[2/3] rounded-lg object-cover object-center scale-[1.01] hover:scale-105 duration-300 origin-bottom select-none'
                                src={comic.thumbnail} alt="anh"
                            />
                            <div className='py-2'>
                                <h5 className='hover:text-blue-400 cursor-pointer duration-200 font-semibold'>{limitCharacters(comic.title, 15)}</h5>
                                <p className='text-sm'>Cập nhật: {comic.updated_at}</p>
                            </div>
                        </div>
                    </SwiperSlide>
                )
            }) :
                new Array(20).fill(null).map((_, index) => {
                    return (
                        <SwiperSlide key={index} >
                            <Skeleton />
                        </SwiperSlide>
                    )
                })
            }
        </Swiper>
    )
}
