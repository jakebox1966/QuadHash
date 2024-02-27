import * as React from 'react'
import MainWrapperNoFooter from '../../common/layouts/MainWrapperNoFooter'

export interface IAboutLayoutProps {}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
    return <MainWrapperNoFooter>{children}</MainWrapperNoFooter>
}
