'use client'

import * as React from 'react'

export default function useBodyScrollLock() {
    let scrollPosition = 0
    const lockScroll = React.useCallback(() => {
        // for IOS safari
        scrollPosition = window.pageYOffset
        document.body.style.overflow = 'hidden'
        document.body.style.position = 'fixed'
        document.body.style.top = `-${scrollPosition}px`
        document.body.style.width = '100%'
    }, [])

    const openScroll = React.useCallback(() => {
        // for IOS safari
        document.body.style.removeProperty('overflow')
        document.body.style.removeProperty('position')
        document.body.style.removeProperty('top')
        document.body.style.removeProperty('width')
        window.scrollTo(0, scrollPosition)
    }, [])

    return { lockScroll, openScroll }
}
