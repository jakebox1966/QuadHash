import * as React from 'react'
import MainWrapper from '../../../common/layouts/MainWrapper'
import MainWrapperNoFooter from '@/app/[locale]/common/layouts/MainWrapperNoFooter'

export default function DefaultLayout({ children }: { children: React.ReactNode }) {
    // return <MainWrapper>{children}</MainWrapper>

    return <MainWrapper>{children}</MainWrapper>
}
