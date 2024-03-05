import Main from './(normal)/(page)/main/page'
import MainWrapper from './common/layouts/MainWrapper'

export default function Home() {
    return (
        <>
            <MainWrapper>
                {process.env.NODE_ENV}
                <Main />
            </MainWrapper>
        </>
    )
}
