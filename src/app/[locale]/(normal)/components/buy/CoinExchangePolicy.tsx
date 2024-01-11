import * as React from 'react'

export interface ICoinExchangePolicyProps {}

export default function CoinExchangePolicy(props: ICoinExchangePolicyProps) {
    return (
        <>
            <div className="border-4 rounded-2xl p-6 flex flex-col justify-center items-start gap-3 w-full text-gray-700 text-xs lg:text-base">
                <div className="text-black font-bold">[토큰 구매 조건]</div>
                <div>
                    본 QH 웹사이트에서 제공하는 서비스를 이용하기 위해 필요한 ERC-20 기반 토큰(이하
                    '토큰') 구매는 이더리움(ETH)을 통해서만 가능합니다. 모든 사용자는 토큰을
                    구매함에 있어 다음의 조건에 동의한 것으로 간주합니다.
                </div>
                <div>1. 토큰 구매는 환불이 불가능하며, 이는 구매 시점부터 적용됩니다.</div>
                <div>
                    2. 사용자는 토큰 구매를 통해 본 웹사이트의 서비스를 이용하는 데 필요한 모든
                    조건을 충분히 이해하고, 이에 동의하는 것으로 간주합니다.
                </div>
            </div>
        </>
    )
}
