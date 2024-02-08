export const getMetadata = async ({ nftType, tokenId }) => {
    console.log('now refetch Data')
    let jsonUrl = ''
    if (nftType === 'saza') {
        jsonUrl = `${process.env.NEXT_PUBLIC_SAZA_METADATA_URL}/${tokenId}.json`
    } else {
        jsonUrl = `${process.env.NEXT_PUBLIC_GAZA_METADATA_URL}/${tokenId}.json`
    }

    const result = await fetch(jsonUrl)

    return await result.json()
}

export const getCollectionList = async (queryParam) => {
    console.log(queryParam)

    const result = await fetch(
        `${process.env.NEXT_PUBLIC_HOST_URL}/api/v1/collectables/images?${queryParam}`,
    )

    return await result.json()
}
