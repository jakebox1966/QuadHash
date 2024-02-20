export const customTheme = {
    dialog: {
        defaultProps: {
            size: 'md',
            dismiss: {},
            animate: {
                unmount: {},
                mount: {},
            },
            className: '',
        },
        valid: {
            sizes: ['sm', 'md', 'lg', 'xl'],
        },
        styles: {
            base: {
                backdrop: {
                    display: 'grid',
                    placeItems: 'place-items-center',
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: 'w-screen',
                    height: 'h-screen',
                    backgroundColor: 'bg-black',
                    backgroundOpacity: 'bg-opacity-60',
                    backdropFilter: 'backdrop-blur-sm',
                },
                container: {
                    position: 'relative',
                    bg: 'bg-white',
                    m: 'm-4',
                    borderRadius: 'rounded-lg',
                    boxShadow: 'shadow-2xl',
                    color: 'text-blue-gray-500',
                    fontSmoothing: 'antialiased',
                    fontFamily: 'font-sans',
                    fontSize: 'text-base',
                    fontWeight: 'font-light',
                    lineHeight: 'leading-relaxed',
                },
            },
            sizes: {
                sm: {
                    width: 'w-fit md:w-2/3 lg:w-2/4',
                    minWidth: 'min-w-fit md:min-w-fit lg:min-w-[50%]',
                    maxWidth: 'max-w-fit md:max-w-fit lg:max-w-[1200px]',
                },
                md: {
                    width: 'w-fit md:w-3/4 lg:w-3/5',
                    minWidth: 'min-w-fit md:min-w-fit lg:min-w-[60%]',
                    maxWidth: 'max-w-fit md:max-w-fit lg:max-w-[1200px]',
                },
                lg: {
                    width: 'w-fit md:w-fit lg:w-[1200px]',
                    minWidth: 'min-w-fit md:min-w-fit lg:min-w-[1200px]',
                    maxWidth: 'max-w-fit md:max-[700px] lg:max-w-[1200px] ',
                },
                xl: {
                    width: 'w-fit w-screen lg:w-[700px]',
                    minWidth: 'min-w-fit min-w-screen min-w-[700px]',
                    maxWidth: 'max-w-fit max-w-screen',
                },
                // connect: {
                //     width: 'w-fit lg:w-screen',
                //     minWidth: 'min-w-fit lg:min-w-screen',
                //     maxWidth: 'max-w-fit lg:max-w-screen ',
                // },
            },
        },
    },
}

export const drawerTheme = {
    drawer: {
        defaultProps: {
            size: 3000,
            overlay: true,
            placement: 'left',
            overlayProps: undefined,
            className: '',
            dismiss: undefined,
            onClose: undefined,
            transition: {
                type: 'tween',
                duration: 0.3,
            },
        },
        styles: {
            base: {
                drawer: {
                    position: 'fixed',
                    zIndex: 'z-[9999]',
                    pointerEvents: 'pointer-events-auto',
                    backgroundColor: 'bg-white',
                    boxSizing: 'box-border',
                    width: 'w-full',
                    height: 'h-1/2',
                    boxShadow: 'shadow-2xl shadow-blue-gray-900/10',
                },
                overlay: {
                    position: 'absolute',
                    inset: 'inset-0',
                    width: 'w-full',
                    height: 'h-screen',
                    pointerEvents: 'pointer-events-auto',
                    zIndex: 'z-[9995]',
                    backgroundColor: 'bg-black',
                    backgroundOpacity: 'bg-opacity-60',
                    backdropBlur: 'backdrop-blur-sm',
                },
            },
        },
    },
}
