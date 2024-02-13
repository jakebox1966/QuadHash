import * as React from 'react'
import MainWrapper from '../../../common/layouts/MainWrapper'

export default function DefaultLayout({ children }: { children: React.ReactNode }) {
    return <MainWrapper>{children}</MainWrapper>
}
