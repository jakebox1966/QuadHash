'use client'

import { useMetaMask } from '@/app/hooks/useMetaMask'
import { formatAddress } from '@/app/utils/ethUtils'
import {
    Button,
    ButtonGroup,
    Dialog,
    DialogBody,
    DialogFooter,
    DialogHeader,
    IconButton,
    Input,
    Menu,
    MenuHandler,
    MenuItem,
    MenuList,
    Popover,
    PopoverContent,
    PopoverHandler,
    Typography,
} from '@material-tailwind/react'
import { signOut, useSession } from 'next-auth/react'
import { useLocale, useTranslations } from 'next-intl'

import * as React from 'react'
import { SignInModal } from './SignInModal'
import { useSignInModal } from '@/app/hooks/useSignInModal'
import { ILocale } from '@/app/interfaces/locale/interface'
import { localeNames, locales } from '@/i18nconfig'
import { createSharedPathnamesNavigation } from 'next-intl/navigation'
import useLocaleNames from '@/app/hooks/useLocaleNames'

export interface IConnectProps {}

const { Link, useRouter, usePathname } = createSharedPathnamesNavigation({ locales })
export default function Connect(props: IConnectProps) {
    const localeNames = useLocaleNames()
    const locale = useLocale()
    const router = useRouter()
    const headerColorRef = React.useRef<HTMLInputElement>(null)
    const { data: session } = useSession()
    const pathName = usePathname()

    const { wallet, hasProvider, isConnecting, connectMetaMask } = useMetaMask()
    const t = useTranslations('Layout.header.connect')
    const { handleSignInModalOpen } = useSignInModal()

    const [userOpen, setUserOpen] = React.useState(false)

    const handleUserOpen = () => setUserOpen(!userOpen)

    const switchLocale = (key: string | undefined) => {
        router.push(pathName, { locale: key as string | undefined })
    }

    const moveToPage = (isLoginRequired: boolean, path: string) => {
        if (isLoginRequired && !session) {
            handleSignInModalOpen()
            return
        }
        router.push(`/${path}`)
    }

    const handleScroll = () => {
        if (window && window.scrollY > 80) {
            headerColorRef.current!.className = 'text-black transition duration-700'
        } else {
            headerColorRef.current!.className = `text-white transition duration-700`
        }
    }

    const disconnect = async () => {
        await window.ethereum.request({
            method: 'wallet_revokePermissions',
            params: [
                {
                    eth_accounts: wallet.accounts[0],
                },
            ],
        })
        signOut({ redirect: true, callbackUrl: '/' })
    }
    // useEffect(() => {
    //     window.addEventListener('scroll', handleScroll)
    //     return () => {
    //         window.removeEventListener('scroll', handleScroll) //clean up
    //     }
    // }, [])

    // useEffect(() => {
    //     console.log(session)
    // }, [session])

    return (
        <>
            {(hasProvider && wallet.accounts.length < 1) || !session ? (
                <Button
                    className="rounded-full min-w-[170px] bg-[#F46221] shadow-lg text-white"
                    disabled={isConnecting}
                    onClick={handleSignInModalOpen}
                    placeholder={undefined}>
                    Connect Wallet
                </Button>
            ) : (
                <>
                    <div className="bg-[#F46221] rounded-full divide-x-2 shadow-lg overflow-hidden flex flex-row justify-center items-center text-[#FFFFFF]">
                        <div
                            onClick={handleUserOpen}
                            className="px-2 py-2 w-full min-w-[85px] cursor-pointer h-full hover:opacity-80 text-center">
                            10 QH
                        </div>

                        <Dialog open={userOpen} handler={handleUserOpen} placeholder={undefined}>
                            <DialogHeader placeholder={undefined}>
                                Its a simple dialog.
                            </DialogHeader>
                            <DialogBody placeholder={undefined}>
                                The key to more success is to have a lot of pillows. Put it this
                                way, it took me twenty five years to get these plants, twenty five
                                years of blood sweat and tears, and I&apos;m never giving up,
                                I&apos;m just getting started. I&apos;m up to something. Fan luv.
                            </DialogBody>
                            <DialogFooter placeholder={undefined}>
                                <Button
                                    variant="text"
                                    color="red"
                                    onClick={handleUserOpen}
                                    className="mr-1"
                                    placeholder={undefined}>
                                    <span>Cancel</span>
                                </Button>
                                <Button
                                    variant="gradient"
                                    color="green"
                                    onClick={handleUserOpen}
                                    placeholder={undefined}>
                                    <span>Confirm</span>
                                </Button>
                            </DialogFooter>
                        </Dialog>
                        <div className="px-2 py-2 w-full min-w-[85px] cursor-pointer h-full hover:opacity-80 text-center">
                            0X0000
                        </div>
                    </div>
                </>

                // <Menu allowHover placement="bottom-end">
                //     <MenuHandler>
                //         <Button
                //             className="rounded-full bg-[#F46221] min-w-[170px] shadow-lg text-white"
                //             disabled={isConnecting}
                //             onClick={handleSignInModalOpen}
                //             placeholder={undefined}>
                //             {formatAddress(wallet.accounts[0])}
                //         </Button>
                //     </MenuHandler>
                //     <MenuList className="p-5 min-w-[300px] shadow-lg" placeholder={undefined}>
                //         <MenuItem
                //             className="flex flex-row items-center justify-between"
                //             onClick={() =>
                //                 moveToPage(
                //                     true,
                //                     `/collector/${wallet.accounts[0] ? wallet.accounts[0] : ''}`,
                //                 )
                //             }
                //             placeholder={undefined}>
                //             <svg
                //                 xmlns="http://www.w3.org/2000/svg"
                //                 fill="none"
                //                 viewBox="0 0 24 24"
                //                 strokeWidth={1.5}
                //                 stroke="currentColor"
                //                 className="w-6 h-6">
                //                 <path
                //                     strokeLinecap="round"
                //                     strokeLinejoin="round"
                //                     d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                //                 />
                //             </svg>
                //             My Profile
                //         </MenuItem>

                //         <MenuItem
                //             className="flex flex-row items-center justify-between"
                //             onClick={() => moveToPage(true, '/report')}
                //             placeholder={undefined}>
                //             <svg
                //                 xmlns="http://www.w3.org/2000/svg"
                //                 fill="none"
                //                 viewBox="0 0 24 24"
                //                 strokeWidth={1.5}
                //                 stroke="currentColor"
                //                 className="w-6 h-6">
                //                 <path
                //                     strokeLinecap="round"
                //                     strokeLinejoin="round"
                //                     d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                //                 />
                //             </svg>
                //             해킹신고센터
                //         </MenuItem>

                //         <hr className="my-3" />
                //         {/* <MenuItem
                //         className="flex flex-row items-center justify-between"
                //         placeholder={undefined}>
                //         <svg
                //             xmlns="http://www.w3.org/2000/svg"
                //             fill="none"
                //             viewBox="0 0 24 24"
                //             strokeWidth={1.5}
                //             stroke="currentColor"
                //             className="w-6 h-6">
                //             <path
                //                 strokeLinecap="round"
                //                 strokeLinejoin="round"
                //                 d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                //             />
                //         </svg>
                //         <ThemeSwitcher />
                //         Dark Mode
                //     </MenuItem> */}
                //         <Menu placement="right-start" allowHover offset={15}>
                //             <MenuHandler className="flex items-center justify-between">
                //                 <MenuItem placeholder={undefined}>
                //                     <svg
                //                         xmlns="http://www.w3.org/2000/svg"
                //                         fill="none"
                //                         viewBox="0 0 24 24"
                //                         strokeWidth={1.5}
                //                         stroke="currentColor"
                //                         className="w-6 h-6">
                //                         <path
                //                             strokeLinecap="round"
                //                             strokeLinejoin="round"
                //                             d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802"
                //                         />
                //                     </svg>
                //                     {localeNames[locale as ILocale['locale']]}
                //                 </MenuItem>
                //             </MenuHandler>
                //             <MenuList placeholder={undefined}>
                //                 {locales.map((locale) => (
                //                     <MenuItem
                //                         key={locale}
                //                         onClick={() => switchLocale(locale)}
                //                         placeholder={undefined}>
                //                         {localeNames[locale]}
                //                     </MenuItem>
                //                 ))}
                //             </MenuList>
                //         </Menu>
                //         {session && (
                //             <>
                //                 <hr className="my-3" />
                //                 <MenuItem
                //                     className="flex flex-row items-center justify-between"
                //                     onClick={disconnect}
                //                     placeholder={undefined}>
                //                     <svg
                //                         xmlns="http://www.w3.org/2000/svg"
                //                         fill="none"
                //                         viewBox="0 0 24 24"
                //                         strokeWidth={1.5}
                //                         stroke="currentColor"
                //                         className="w-6 h-6">
                //                         <path
                //                             strokeLinecap="round"
                //                             strokeLinejoin="round"
                //                             d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                //                         />
                //                     </svg>
                //                     <span>Sign Out</span>
                //                 </MenuItem>
                //             </>
                //         )}
                //     </MenuList>
                // </Menu>
            )}
        </>
    )
}
