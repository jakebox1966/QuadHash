import Image from 'next/image'
import Test from './Test'
import Main from './(normal)/main/page'
import MainWrapper from './common/layouts/MainWrapper'

export default function Home() {
    return (
        <>
            <MainWrapper>
                <Main />
            </MainWrapper>
        </>
    )
}
