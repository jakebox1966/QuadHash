'use client'
import * as React from 'react'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import SwiperCore from 'swiper'
import { Navigation } from 'swiper/modules'
import CategoryButton from './CategoryButton'
import { gazaCategoryValidation, sazaCategoryValidation } from '@/app/utils/partsUtils'

export interface ICategoryProps {
    categories?: any[]
    metaData: any
    nftType: string
    selectedCategory: any
    setSelectedCategory: React.Dispatch<any>
}

export default function Category({
    categories,
    nftType,
    metaData,
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
                    preventClicks={true}
                    preventClicksPropagation={true}
                    onBeforeInit={(boforeInitValue) => {
                        if (nftType === 'saza') {
                            const result = sazaCategoryValidation(
                                metaData.attributes[0].value,
                                selectedCategory?.trait_type,
                            )

                            setSelectedCategory({ ...selectedCategory, ...result })
                        } else if (nftType === 'gaza') {
                            const result = gazaCategoryValidation(
                                metaData.attributes[0].value,
                                selectedCategory?.trait_type,
                                metaData.attributes.filter((item, index) => index !== 0),
                            )
                            setSelectedCategory({
                                ...categories[boforeInitValue.activeIndex],
                                ...result,
                            })
                        }
                    }}
                    onSlideChange={(afterChangeValue) => {
                        if (nftType === 'saza') {
                            const result = sazaCategoryValidation(
                                metaData.attributes[0].value,
                                categories[afterChangeValue.activeIndex].trait_type,
                            )

                            setSelectedCategory({
                                ...categories[afterChangeValue.activeIndex],
                                ...result,
                            })
                        } else if (nftType === 'gaza') {
                            const result = gazaCategoryValidation(
                                metaData.attributes[0].value,
                                categories[afterChangeValue.activeIndex].trait_type,
                                metaData.attributes,
                            )
                            setSelectedCategory({
                                ...categories[afterChangeValue.activeIndex],
                                ...result,
                            })
                        }
                    }}>
                    {categories?.map((item) => (
                        <SwiperSlide
                            key={item.trait_type}
                            className={`text-center uppercase py-3 border-4 rounded-2xl font-black text-xl cursor-pointer`}>
                            {item.trait_type}
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </>
    )
}
