'use client'
import * as React from 'react'
import {
    Drawer,
    Button,
    Typography,
    IconButton,
    List,
    ListItem,
    ListItemPrefix,
    ListItemSuffix,
    Chip,
} from '@material-tailwind/react'
import { createSharedPathnamesNavigation } from 'next-intl/navigation'
import { useTranslations } from 'next-intl'
import { locales } from '@/i18nconfig'
import LocaleSwitcher from './LocaleSwitcher'

export interface IMobileNavMenuProps {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const { Link } = createSharedPathnamesNavigation({ locales })
export default function MobileNavMenu({ open, setOpen }: IMobileNavMenuProps) {
    const t = useTranslations('Layout.header.nav_bar')
    const menuList = [
        'about',
        'collectable',
        'saza&gaza',
        'qh_token',
        'dynamicNFT',
        'fractionalInvest',
    ]

    const closeDrawer = () => setOpen(false)

    return (
        <React.Fragment>
            <Drawer open={open} onClose={closeDrawer} placeholder={undefined}>
                <div className="mb-2 flex items-center justify-between p-4">
                    <Typography variant="h5" color="blue-gray" placeholder={undefined}>
                        QUADHASH MENU
                    </Typography>
                    <IconButton
                        variant="text"
                        color="blue-gray"
                        onClick={closeDrawer}
                        placeholder={undefined}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="h-5 w-5">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </IconButton>
                </div>
                <List placeholder={undefined}>
                    {menuList.map((item) => (
                        <Link key={item} href={`/${item}`}>
                            <ListItem placeholder={undefined}>{t(item)}</ListItem>
                        </Link>
                    ))}
                    <hr />

                    <Link href={'/user'}>
                        <ListItem placeholder={undefined}>{t('mypage')}</ListItem>
                    </Link>

                    <Link href={'/report'}>
                        <ListItem placeholder={undefined}>{t('report')}</ListItem>
                    </Link>
                    <hr />

                    <ListItem
                        placeholder={undefined}
                        className="flex flex-row justify-between items-center">
                        {t('language')}
                        <LocaleSwitcher />
                    </ListItem>
                </List>
            </Drawer>
        </React.Fragment>
    )
}
