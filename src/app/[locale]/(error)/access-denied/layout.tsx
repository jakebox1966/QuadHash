import MainWrapperNoFooter from '@/app/[locale]/common/layouts/MainWrapperNoFooter'
import * as React from 'react'

export default function DefaultLayout({ children }: { children: React.ReactNode }) {
    return <MainWrapperNoFooter>{children}</MainWrapperNoFooter>
}
