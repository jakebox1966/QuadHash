import { IContactContainerProps } from '@/app/[locale]/(normal)/containers/ContactContainer'

/**
 *
 * Contact Us Post Mail
 *
 * @param parameter
 * @returns
 */
export const contactWithMail = async (parameter) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST_URL}/api/v1/utils/question`, {
        method: 'POST',
        body: JSON.stringify(parameter),
    })
    const result = await response.json()
    return result
}
