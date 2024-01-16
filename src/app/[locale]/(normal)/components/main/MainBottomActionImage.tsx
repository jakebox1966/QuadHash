import * as React from 'react'

export interface IMainBottomActionImage {}

export default function MainBottomActionImage(props: IMainBottomActionImage) {
    return (
        <div className="w-full flex flex-col justify-center items-center relative overflow-hidden mt-20">
            <div className="absolute bottom-0 z-0">
                <img className="z-[-9999]" src="homepage_1.png" alt="homepage_1.png" />
            </div>
            <div className="max-w-[1600px]">
                <div
                    className={` flex flex-row justify-center items-start relative transition-all`}>
                    <div className="font-black">
                        <div className="text-[#006D53]">It's QUADHASH TIME</div>

                        <div className="flex flex-col lg:flex-row justify-between items-end lg:items-center gap-4 w-full">
                            <div>
                                <div className="text-xs mt-3">7 species, 10,222 unique</div>
                                <div className="text-xs">endless possibilities?</div>
                            </div>
                            <div className="text-white p-2 text-xs bg-[#F46221] rounded-full text-center">
                                VIEW COLLECTIBLES
                            </div>
                        </div>
                    </div>

                    <img
                        className="max-w-[100px] lg:max-w-[200px] translate-y-60 hidden lg:block"
                        src="/homepage2_5.png"
                        alt="homepage2_5"
                    />
                    <img
                        className="max-w-[200px] lg:max-w-[400px] transition-all"
                        src="/homepage2_6.png"
                        alt="homepage2_6"
                    />
                </div>
            </div>
        </div>
    )
}
