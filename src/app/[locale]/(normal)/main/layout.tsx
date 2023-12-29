import * as React from 'react'
import MainWrapper from '../../common/layouts/MainWrapper'
import Footer from '../../common/layouts/footer/Footer'

export interface IAboutLayoutProps {}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
    return <MainWrapper>{children}</MainWrapper>
}
