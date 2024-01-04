'use client'
import * as React from 'react'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import SwiperCore from 'swiper'
import { Navigation } from 'swiper/modules'
import CategoryButton from './CategoryButton'

export interface ICategoryProps {
    categories?: any[]
    selectedCategory: any
    setSelectedCategory: React.Dispatch<any>
}

export default function Category({
    categories,
    selectedCategory,
    setSelectedCategory,
}: ICategoryProps) {
    return (
        <>
            <div className="flex flex-row justify-center items-center gap-2">
                <Swiper
                    modules={[Navigation]}
                    navigation={true}
                    spaceBetween={30}
                    slidesPerView={1}
                    onBeforeInit={(boforeInitValue) => {
                        console.log('boforeInit', boforeInitValue)
                        setSelectedCategory(categories[boforeInitValue.activeIndex])
                    }}
                    onSlideChange={(afterChangeValue) => {
                        console.log('slider value', afterChangeValue)
                        setSelectedCategory(categories[afterChangeValue.activeIndex])
                    }}>
                    {/* <CategoryButton></CategoryButton> */}
                    {categories?.map((item) => (
                        <SwiperSlide
                            onClick={() => {
                                setSelectedCategory(item)
                            }}
                            key={item.trait_type}
                            className={`text-center uppercase py-3 border-4 rounded-2xl text-xs font-black md:text-base lg:text-xl cursor-pointer`}>
                            {item.trait_type}
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </>
    )
}
