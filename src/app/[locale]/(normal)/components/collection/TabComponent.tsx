'use client'
import Image from 'next/image'
import * as React from 'react'
import mypage_saza_icon from '/public/mypage_saza_icon.svg'
import mypage_gaza_icon from '/public/mypage_gaza_icon.svg'
import mypage_qbt_icon from '/public/mypage_qbt_icon.svg'
import { Select, Option } from '@material-tailwind/react'
import { IQueryParam } from '../../containers/CollectionContainer'
import logoShort from '/public/logo_short.png'

export interface ITabComponentProps {
    handleNftTypeParam: (nftType: any) => void
    handleOptionParam: (option: any) => void
    queryParam: IQueryParam
    burtonMorris: boolean
}

export default function TabComponent({
    handleNftTypeParam,
    handleOptionParam,
    queryParam,
    burtonMorris,
}: ITabComponentProps) {
    return (
        <div className="hidden lg:flex flex-row justify-start items-center gap-2 w-full max-w-[970px]">
            <div
                className={`${
                    queryParam.token_type === 'saza' ? 'border-[#F46221]' : ''
                } border-2 rounded-lg px-6 py-1 w-[calc(100%/3-7px)] cursor-pointer tansition-all`}
                onClick={() => {
                    handleNftTypeParam('saza')
                }}>
                <div className={`flex flex-row items-center gap-2`}>
                    <Image src={mypage_saza_icon} alt="saza_icon" width={30} height={30} />
                    <div>SAZA NFT</div>
                </div>
            </div>
            <div
                className={`${
                    queryParam.token_type === 'gaza' ? 'border-[#F46221]' : ''
                } border-2 rounded-lg px-6 py-1 w-[calc(100%/3-7px)] cursor-pointer tansition-all`}
                onClick={() => {
                    handleNftTypeParam('gaza')
                }}>
                <div className="flex flex-row items-center gap-2">
                    <Image src={mypage_gaza_icon} alt="gaza_icon" width={30} height={30} />
                    <div>GAZA NFT</div>
                </div>
            </div>
            {/* <div
                className={`${
                    queryParam.token_type === 'qbt' ? 'border-[#F46221]' : ''
                } border-2 rounded-lg px-6 py-1 w-[calc(100%/4)] cursor-pointer tansition-all`}
                onClick={() => {
                    handleNftTypeParam('exclusive')
                }}>
                <div className="flex flex-row items-center gap-2">
                    <Image src={mypage_qbt_icon} alt="qbt_icon" width={30} height={30} />
                    <div>QBT NFT</div>
                </div>
            </div> */}
            {!burtonMorris && (
                <div className="w-[calc(100%/3-7px)]">
                    <Select
                        variant="outlined"
                        value={queryParam.sort_by}
                        // defaultValue={queryParam.sort_by}
                        label={'option'}
                        placeholder={undefined}
                        onChange={(value) => {
                            console.log(value)
                            handleOptionParam(value)
                        }}>
                        <Option value="ranking">Rank: Descending</Option>
                        <Option value="ranking">Rank: Ascending</Option>
                        <Option value="number">Token ID</Option>
                        <Option value="number">Token ID</Option>
                    </Select>
                </div>
            )}
        </div>
    )
}
