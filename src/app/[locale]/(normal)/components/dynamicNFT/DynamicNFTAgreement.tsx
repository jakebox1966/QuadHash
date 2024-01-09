'use client'

import * as React from 'react'
import {
    Button,
    Dialog,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Checkbox,
} from '@material-tailwind/react'

export interface IDynamicNFTPolicyProps {
    startDynamicNFT: () => Promise<void>
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function DynamicNFTPolicy({
    startDynamicNFT,
    open,
    setOpen,
}: IDynamicNFTPolicyProps) {
    const handleOpen = () => setOpen((cur) => !cur)
    const [allAgreed, setAllAgreed] = React.useState(false)
    const [agreements, setAgreements] = React.useState({
        firstTerm: false,
        secondTerm: false,
    })
    const [isError, setIsError] = React.useState(false)

    React.useEffect(() => {
        return () => {
            setAllAgreed(false)
            setAgreements((prev) => ({ ...prev, firstTerm: false, secondTerm: false }))
        }
    }, [])

    const handleAgreementChange = (e: { target: { name: any; checked: any } }) => {
        const { name, checked } = e.target
        setIsError(false)
        setAgreements((prevAgreements) => ({ ...prevAgreements, [name]: checked }))
        const allChecked = Object.values({ ...agreements, [name]: checked }).every(
            (value) => value === true,
        )
        setAllAgreed(allChecked)
    }

    const handleAllAgreementChange = (e: { target: { checked: any } }) => {
        const { checked } = e.target
        setIsError(false)
        setAllAgreed(checked)

        if (e.target.checked) {
            setAgreements((prev) => ({ ...prev, firstTerm: true, secondTerm: true }))
        } else {
            setAgreements((prev) => ({ ...prev, firstTerm: false, secondTerm: false }))
        }
    }

    const generateDynamicNFT = () => {
        if (allAgreed && Object.values(agreements).every((item) => item === true)) {
            setOpen(!open)
            startDynamicNFT()
            setAllAgreed(false)
            setAgreements((prev) => ({ ...prev, firstTerm: false, secondTerm: false }))
            setIsError(false)
        } else {
            setIsError(true)
        }
    }

    const cancelDynamicNFT = () => {
        setOpen(!open)
        setAllAgreed(false)
        setAgreements((prev) => ({ ...prev, firstTerm: false, secondTerm: false }))
        setIsError(false)
    }

    return (
        <>
            <Dialog
                size="xl"
                open={open}
                handler={handleOpen}
                className="bg-transparent shadow-none"
                placeholder={undefined}>
                <Card className="mx-auto w-full max-w-full md:max-w-[80%]" placeholder={undefined}>
                    <CardBody className="flex flex-col gap-4" placeholder={undefined}>
                        <Typography variant="h4" color="blue-gray" placeholder={undefined}>
                            Alert
                        </Typography>

                        <div className="-ml-2.5 -mt-3">
                            <Checkbox
                                label="[Dynamic NFT 이용약관 전체 동의]"
                                ripple={false}
                                // name="allAgreed"
                                className="h-8 w-8 rounded-full border-gray-900/20 bg-gray-900/10 transition-all hover:scale-105 hover:before:opacity-0"
                                crossOrigin={undefined}
                                checked={allAgreed}
                                onChange={handleAllAgreementChange}
                            />
                        </div>

                        <hr />
                        <div className="flex flex-col justify-start items-start gap-3">
                            <div className="-ml-2.5 -mt-3">
                                <Checkbox
                                    label="사용자는 토큰 구매와 서비스 이용에 필요한 모든 조건을 충분히 이해하고, 이에 동의합니다."
                                    ripple={false}
                                    name="firstTerm"
                                    className="h-8 w-8 rounded-full border-gray-900/20 bg-gray-900/10 transition-all hover:scale-105 hover:before:opacity-0"
                                    crossOrigin={undefined}
                                    checked={agreements.firstTerm}
                                    onChange={handleAgreementChange}
                                />
                            </div>

                            <div className="-ml-2.5 -mt-3">
                                <Checkbox
                                    label="Dynamic NFT 서비스를 이용하여 파츠 변경 시, 변경된 내용은 원상 복구가 불가능합니다."
                                    ripple={false}
                                    name="secondTerm"
                                    className="h-8 w-8 rounded-full border-gray-900/20 bg-gray-900/10 transition-all hover:scale-105 hover:before:opacity-0"
                                    crossOrigin={undefined}
                                    checked={agreements.secondTerm}
                                    onChange={handleAgreementChange}
                                />
                            </div>
                        </div>

                        <div
                            className={`text-center font-black text-red-600 ${
                                isError ? 'visible' : 'invisible'
                            }`}>
                            약관에 동의해주세요.
                        </div>
                        <div className="text-center">
                            Dynamic NFT 진행시 보유한 티켓 1개가 차감됩니다. 진행 하시겠습니까?
                        </div>
                    </CardBody>
                    <CardFooter
                        className="pt-0 flex flex-row justify-center items-center gap-4"
                        placeholder={undefined}>
                        <Button
                            variant="gradient"
                            onClick={generateDynamicNFT}
                            fullWidth
                            placeholder={undefined}>
                            확인
                        </Button>
                        <Button
                            variant="gradient"
                            onClick={cancelDynamicNFT}
                            fullWidth
                            placeholder={undefined}>
                            취소
                        </Button>
                    </CardFooter>
                </Card>
            </Dialog>
        </>
    )
}
