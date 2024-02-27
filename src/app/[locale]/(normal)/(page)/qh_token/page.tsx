import * as React from 'react'
import BuyContainer from '../../containers/BuyContainer'
import CommingSoonComponent from '@/app/[locale]/common/components/ComingSoon'

export interface IBuyPageProps {}

export default function BuyPage(props: IBuyPageProps) {
    return (
        <>
            {/* <BuyContainer /> */}
            <CommingSoonComponent />
        </>
    )
}
