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
                    zIndex: 9998,
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
                    width: 'w-fit md:w-fit lg:w-[1300px]',
                    minWidth: 'min-w-fit md:min-w-fit lg:min-w-fit',
                    maxWidth: 'max-w-fit md:max-[700px] lg:max-w-[1300px] ',
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
export const customTheme1 = {
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
        },
    },
}

export const drawerTheme = {
    drawer: {
        defaultProps: {
            size: 'calc(100vh / 2 + 200px)',
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
                    height: '!h-screen',
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

export const dialogTheme = {
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
            sizes: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
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
                xs: {
                    width: 'w-full md:w-3/5 lg:w-2/5 2xl:w-1/4',
                    minWidth: 'min-w-[80%] md:min-w-[60%] lg:min-w-[40%] 2xl:min-w-[25%]',
                    maxWidth: 'max-w-[80%] md:max-w-[60%] lg:max-w-[40%] 2xl:max-w-[25%]',
                },
                sm: {
                    width: 'w-fit',
                    minWidth: 'min-w-[94%] md:min-w-[60%] lg:min-w-[429px]',
                    maxWidth: 'max-w-[94%] md:max-w-[60%] lg:max-w-[429px]',
                },
                md: {
                    width: 'w-full md:w-3/4 lg:w-3/5 2xl:w-2/5',
                    minWidth: 'min-w-[90%] md:min-w-[75%] lg:min-w-[60%] 2xl:min-w-[40%]',
                    maxWidth: 'max-w-[90%] md:max-w-[75%] lg:max-w-[60%] 2xl:max-w-[40%]',
                },
                lg: {
                    width: 'w-fit',
                    minWidth: 'min-w-fit',
                    maxWidth: 'max-w-fit',
                },
                xl: {
                    width: 'w-full md:w-5/6 2xl:w-3/4',
                    minWidth: 'min-w-[95%] md:min-w-[83.333333%] 2xl:min-w-[75%]',
                    maxWidth: 'max-w-[95%] md:max-w-[83.333333%] 2xl:max-w-[75%]',
                },
                xxl: {
                    display: 'flex',
                    flexDirection: 'flex-col',
                    width: 'w-screen',
                    minWidth: 'min-w-[100vw]',
                    maxWidth: 'max-w-[100vw]',
                    height: 'h-screen',
                    minHeight: 'min-h-[100vh]',
                    maxHeight: 'max-h-[100vh]',
                    m: 'm-0',
                    borderRadius: 'rounded-none',
                },
            },
        },
    },
}

export const tooltipTheme = {
    tooltip: {
        defaultProps: {
            interactive: false,
            placement: 'top',
            offset: 5,
            dismiss: {},
            animate: {
                unmount: {},
                mount: {},
            },
            className: '',
        },
        styles: {
            base: {
                bg: 'bg-black',
                py: 'py-1.5',
                px: 'px-3',
                borderRadius: 'rounded-lg',
                fontFamily: 'font-sans',
                fontSize: 'text-sm',
                fontWeight: 'font-normal',
                color: 'text-white',
                outline: 'focus:outline-none',
                overflowWrap: 'break-words',
                zIndex: 'z-[9999]',
                whiteSpace: 'whitespace-normal',
            },
        },
    },
}
