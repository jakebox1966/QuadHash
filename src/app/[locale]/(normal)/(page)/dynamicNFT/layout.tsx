import MainWrapper from '@/app/[locale]/common/layouts/MainWrapper'
import MainWrapperNoFooter from '@/app/[locale]/common/layouts/MainWrapperNoFooter'
import * as React from 'react'

export interface IAboutLayoutProps {}

export default function DefaultLayout({ children }: { children: React.ReactNode }) {
    return <MainWrapper>{children}</MainWrapper>
}
