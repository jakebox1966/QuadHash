export const sazaCategoryValidation = (ranking: number, category: string) => {
    console.log(ranking, category)

    switch (category) {
        case 'Background':
            if (ranking >= 61 && ranking <= 1000) {
                return {
                    availability: true,
                    pool: [
                        'Blue',
                        'Desert',
                        'Jungle',
                        'Lemon',
                        'Mint',
                        'Night',
                        'Pink',
                        'Red',
                        'Sky',
                        'Spots',
                        'Storm',
                    ],
                }
            } else if (ranking >= 1001 && ranking <= 5000) {
                return {
                    availability: true,
                    pool: [
                        'Blue',
                        'Desert',
                        'Dots',
                        'Jungle',
                        'Lemon',
                        'Mint',
                        'Night',
                        'Red',
                        'Sky',
                        'Stripes',
                        'Storm',
                    ],
                }
            } else if (5001 && ranking <= 10000) {
                return {
                    availability: true,
                    pool: [
                        'Blue',
                        'Desert',
                        'Jungle',
                        'Lemon',
                        'Mint',
                        'Night',
                        'Red',
                        'Sky',
                        'Grid',
                        'Stripes',
                        'Storm',
                    ],
                }
            }

        case 'Mane':
            console.log('mane 검사')
            if (ranking >= 61 && ranking <= 1000) {
                return {
                    availability: false,
                    pool: [],
                }
            }
            if (ranking >= 1001 && ranking <= 5000) {
                return {
                    availability: true,
                    pool: [
                        'Brown',
                        'Blue',
                        'Red',
                        'Trippy',
                        'Stripe',
                        'Rainbow',
                        'Charcoal',
                        'White',
                    ],
                }
            } else if (ranking >= 5001 && ranking <= 10000) {
                return {
                    availability: true,
                    pool: ['Brown', 'Blue', 'Red', 'Trippy', 'Stripe', 'Rainbow', 'Orange'],
                }
            }

        case 'Body':
            if (ranking >= 61 && ranking <= 180) {
                return {
                    availability: true,
                    pool: ['Robot-Nude', 'Robot-Tattoo', 'Robot-Wings'],
                }
            } else if (ranking >= 181 && ranking <= 300) {
                return {
                    availability: true,
                    pool: ['Spirit-Tattoo', 'Spirit-Wings'],
                }
            } else if (ranking >= 301 && ranking <= 650) {
                return {
                    availability: true,
                    pool: ['Zombie-Nude', 'Zombie-Tattoo', 'Zombie-Wings'],
                }
            } else if (ranking >= 651 && ranking <= 1000) {
                return {
                    availability: true,
                    pool: ['Gold-Nude', 'Gold-Tattoo', 'Gold-Wings'],
                }
            } else if (ranking >= 1001 && ranking <= 5000) {
                return {
                    availability: true,
                    pool: [
                        'Hash-Games',
                        'Bow-Tie',
                        'Camo-Shirt',
                        'QH-Sweater',
                        'Puffer',
                        'King',
                        'Superhero',
                        'Striped-Puffer',
                        'Striped-Sweater',
                        'Like-Lion-Sweater',
                        'School',
                        'Polka-Dot-Sweater',
                        'Hanbok',
                        'Neckerchief',
                        'Jogger',
                        'Tracksuit',
                        'Triangles-Sweater',
                        'Winter-Coat',
                        'Check-Shirt',
                        'Varsity',
                    ],
                }
            } else if (ranking >= 5001 && ranking <= 10000) {
                return {
                    availability: true,
                    pool: [
                        'QH-Hoodie',
                        'Nude',
                        'Wings',
                        'Tattoo',
                        'Dalgona',
                        'Quadhash-T-Shirt',
                        'Host',
                        'Sunset-Tank',
                        'Zebra-T-Shirt',
                        'Gold-Chain',
                        'Red-Light-Green-Light',
                        'Vest',
                        'Polka-Dot-Hoodie',
                        'Raincoat',
                        'Striped-Tank',
                        'Guayabera',
                        'Hash-Hoodie',
                        'Safari',
                        'Football',
                        'Paw-T-Shirt',
                        'Robe',
                        'Binoculars',
                        'Polo',
                        'Giraffe-Hoodie',
                        'Leather-Jacket',
                        'Baseball',
                        'Heart-Hoodie',
                        'Overalls',
                        'Suspenders',
                        'Trench',
                    ],
                }
            }

        case 'Extras':
            if (ranking >= 61 && ranking <= 180) {
                return {
                    availability: true,
                    pool: ['Whiskers', 'Bandage', 'Scar', 'None'],
                }
            } else if (ranking >= 181 && ranking <= 300) {
                return {
                    availability: true,
                    pool: ['Whiskers', 'Cheeks', 'None'],
                }
            } else if (ranking >= 301 && ranking <= 650) {
                return {
                    availability: true,
                    pool: ['Whiskers', 'Bandage', 'Scar', 'Earing', 'None'],
                }
            } else if (ranking >= 651 && ranking <= 1000) {
                return {
                    availability: false,
                    pool: [],
                }
            } else if (ranking >= 1001 && ranking <= 5000) {
                return {
                    availability: true,
                    pool: ['None', 'Bandage', 'Whiskers', 'Scar', 'Cheeks'],
                }
            } else if (ranking >= 5001 && ranking <= 10000) {
                return {
                    availability: true,
                    pool: ['None', 'Bandage', 'Whiskers', 'Scar', 'Muzzle', 'Earing'],
                }
            }

        case 'Eyes':
            if (ranking >= 61 && ranking <= 300) {
                return {
                    availability: true,
                    pool: [
                        'Bliss',
                        'Side-Eye',
                        'Hearts',
                        'Surprise',
                        'Cute',
                        'Worried',
                        'Sunglasses',
                        'Nonchalant',
                        'Shut',
                        'Wink',
                        'Xs',
                        'Lashes',
                        'Huh',
                        'Glasses',
                        'Red',
                        'Sleep',
                        'Scowl',
                        'Hashes',
                        'Lasers',
                    ],
                }
            } else if (ranking >= 301 && ranking <= 5000) {
                return {
                    availability: true,
                    pool: [
                        'Bliss',
                        'Side-Eye',
                        'Hearts',
                        'Surprise',
                        'Cute',
                        'Worried',
                        'Sunglasses',
                        'Nonchalant',
                        'Shut',
                        'Wink',
                        'Xs',
                        'Lashes',
                        'Huh',
                        'Glasses',
                        'Red',
                        'Sleep',
                        'Scowl',
                        'Hashes',
                        'Lasers',
                        '3D',
                    ],
                }
            } else if (ranking >= 5001 && ranking <= 10000) {
                return {
                    availability: true,
                    pool: [
                        'Bliss',
                        'Side-Eye',
                        'Hearts',
                        'Surprise',
                        'Cute',
                        'Worried',
                        'Sunglasses',
                        'Nonchalant',
                        'Shut',
                        'Wink',
                        'Xs',
                        'Lashes',
                        'Huh',
                        'Glasses',
                        'Red',
                        'Sleep',
                        'Scowl',
                        'Hashes',
                        '3D',
                    ],
                }
            }
        case 'Mouth':
            if (ranking >= 61 && ranking <= 180) {
                return {
                    availability: true,
                    pool: [
                        'Beaming',
                        'Hmm',
                        'Straight',
                        'Ooh',
                        'Smile',
                        'Tounge',
                        'Nonchalant',
                        'Cute',
                        'Wobbly',
                        'Bubble-Gum',
                        'Grr',
                        'Hunt',
                        'Teeth',
                    ],
                }
            } else if (ranking >= 181 && ranking <= 10000) {
                return {
                    availability: true,
                    pool: [
                        'Beaming',
                        'Hmm',
                        'Straight',
                        'Ooh',
                        'Smile',
                        'Tounge',
                        'Nonchalant',
                        'Cute',
                        'Wobbly',
                        'Bubble-Gum',
                        'Grr',
                        'Hunt',
                        'Teeth',
                        'Kiss',
                    ],
                }
            }

        case 'Headwear':
            if (ranking >= 61 && ranking <= 180) {
                return {
                    availability: false,
                    pool: [],
                }
            } else if (ranking >= 181 && ranking <= 300) {
                return {
                    availability: true,
                    pool: ['None', 'Bow', 'Devil', 'Tiara'],
                }
            } else if (ranking >= 301 && ranking <= 650) {
                return {
                    availability: true,
                    pool: ['None', 'Devil', 'Horns', 'Gat', 'Tiara', 'Golf'],
                }
            } else if (ranking >= 651 && ranking <= 1000) {
                return {
                    availability: true,
                    pool: ['None', 'Devil', 'Bow', 'Tiara', 'Golf', 'Halo'],
                }
            } else if (ranking >= 1001 && ranking <= 5000) {
                return {
                    availability: true,
                    pool: ['None', 'Devil', 'Bow', 'Horns', 'Binyeo', 'Party', 'Laurel', 'Friend'],
                }
            } else if (ranking >= 5001 && ranking <= 10000) {
                return {
                    availability: true,
                    pool: [
                        'None',
                        'Gat',
                        'Crown',
                        'Zebra-Bucket',
                        'Paisley-Bandana',
                        'Beret',
                        'Khaki-Cap',
                        'Orange-Beanie',
                        'Charcoal-Cap',
                        'Newsboy',
                        'Camo-Cap',
                        'Sheriff',
                        'Pom-Pom',
                        'Star-Cap',
                        'Naval',
                        'Witch',
                        'Safari',
                        'Safety',
                        'Blue-Beanie',
                        'Giraffe-Bucket',
                        'Hash-Cap',
                        'Striped-Bandana',
                    ],
                }
            }

        default:
            return {
                availability: false,
                pool: [],
            }
    }
}

export const gazaCategoryValidation = (
    ranking: number,
    category: string,
    metadata: { trait_type: string; value: string }[],
) => {
    console.log('staring validation')
    console.log(ranking, category, metadata)
    switch (category) {
        case 'Background':
            let backgroundValidationResult = gazaBackgroundValidation(ranking)

            if (metadata.find((item) => item.trait_type === 'Eyes').value === 'Lasers') {
                backgroundValidationResult.pool = backgroundValidationResult.pool.filter(
                    (item) => item !== 'Red',
                )
            }

            if (metadata.find((item) => item.trait_type === 'Headwear').value === 'Halo') {
                backgroundValidationResult.pool = backgroundValidationResult.pool.filter(
                    (item) => item !== 'Spots',
                )
            }
            return backgroundValidationResult

        case 'Top':
            console.log('Top validation start')
            let gazaTopValidationResult = gazaTopValidation(ranking, metadata)
            console.log('gazaTopValidationResult', gazaTopValidationResult)
            if (
                ['Turtle', 'Flag', 'Snail', 'Wings', 'Black-Wings'].includes(
                    metadata.find((item) => item.trait_type === 'Extras').value,
                )
            ) {
                gazaTopValidationResult.pool = gazaTopValidationResult.pool.filter(
                    (item) => item !== 'Pom-Poms',
                )
            }
            return gazaTopValidationResult

        case 'Bottoms':
            console.log('Bottom validation start')
            let gazaBottomsValidationResult = gazaBottomsValidation(ranking, metadata)
            console.log('gazaBottomsValidation', gazaBottomsValidationResult)

            if (metadata.find((item) => item.trait_type === 'Extras').value === 'Snail') {
                gazaBottomsValidationResult.pool = gazaBottomsValidationResult.pool.filter(
                    (item) =>
                        item !== 'Orange-Hoodie' &&
                        item !== 'Brown-Hoodie' &&
                        item !== 'Gold-Hoodie',
                )
            }

            if (
                ['Package', 'Buseoksa'].includes(
                    metadata.find((item) => item.trait_type === 'Extras').value,
                )
            ) {
                gazaBottomsValidationResult.pool = gazaBottomsValidationResult.pool.filter(
                    (item) => item !== 'Gold-Hoodie',
                )
            }
            return gazaBottomsValidationResult

        case 'Onesie':
            console.log('Onesie validation start')
            let gazaOnesieValidationResult = gazaOnesieValidation(ranking)
            return gazaOnesieValidationResult

        case 'Extras':
            console.log('Extras validation start')
            let gazaExtrasValidationResult = gazaExtrasValidation(ranking)

            if (metadata.find((item) => item.trait_type === 'Onesie').value === 'Gold-Spirit') {
                gazaExtrasValidationResult.pool = [
                    'None',
                    'Stars',
                    'Butterflies',
                    'Flowers',
                    'Wings',
                ]
            }

            if (
                ['Orange-Hoodie', 'Brown-Hoodie', 'Gold-Hoodie'].includes(
                    metadata.find((item) => item.trait_type === 'Bottoms').value,
                )
            ) {
                gazaExtrasValidationResult.pool = gazaExtrasValidationResult.pool.filter(
                    (item) => item !== 'Snail',
                )
            }
            if (metadata.find((item) => item.trait_type === 'Bottoms').value === 'Gold-Hoodie') {
                gazaExtrasValidationResult.pool = gazaExtrasValidationResult.pool.filter(
                    (item) => item !== 'Package' && item !== 'Buseoksa',
                )
            }

            if (metadata.find((item) => item.trait_type === 'Top').value === 'Pom-Poms') {
                gazaExtrasValidationResult.pool = gazaExtrasValidationResult.pool.filter(
                    (item) =>
                        item !== 'Turtle' &&
                        item !== 'Flag' &&
                        item !== 'Snail' &&
                        item !== 'Wings' &&
                        item !== 'Black-Wings',
                )
            }

            return gazaExtrasValidationResult

        case 'Eyes':
            console.log('Eyes validation start')
            let gazaEyesValidationResult = gazaEyesValidation()

            if (metadata.find((item) => item.trait_type === 'Background').value === 'Red') {
                gazaEyesValidationResult.pool = gazaEyesValidationResult.pool.filter(
                    (item) => item !== 'Lasers',
                )
            }

            return gazaEyesValidationResult

        case 'Mouth':
            console.log('Mouth validation start')
            let gazaMouthValidationResult = gazaMouthValidation()

            return gazaMouthValidationResult

        case 'Headwear':
            console.log('Headwear validation start')
            let gazaHeadwearValidationResult = gazaHeadwearValidation(ranking)

            if (metadata.find((item) => item.trait_type === 'Background').value === 'Spots') {
                gazaHeadwearValidationResult.pool = gazaHeadwearValidationResult.pool.filter(
                    (item) => item !== 'Halo',
                )
            }

            if (metadata.find((item) => item.trait_type === 'Eyes').value === 'Lasers') {
                gazaHeadwearValidationResult.pool = [
                    'Tiara',
                    'Poop',
                    'Halo',
                    'Fire',
                    'Flower',
                    'Bow',
                    'Party',
                    'Devil',
                    'Curl',
                    'Bunny-Ears',
                    'Antenna',
                    'Striped-Bandana',
                    'Gat',
                    'Doctor',
                    'Bandana',
                    'None',
                ]
            }

            if (
                ['Orange-Hoodie', 'Brown-Hoodie', 'Gold-Hoodie'].includes(
                    metadata.find((item) => item.trait_type === 'Bottoms').value,
                )
            ) {
                gazaHeadwearValidationResult.pool = [
                    'Antenna',
                    'Bow',
                    'Bunny-Ears',
                    'Curl',
                    'Devil',
                    'Doctor',
                    'Fire',
                    'Flower',
                    'Halo',
                    'Poop',
                    'Tiara',
                    'None',
                ]
            }
            if (metadata.find((item) => item.trait_type === 'Bottoms').value === 'Gold-Hoodie') {
                gazaHeadwearValidationResult.pool = [
                    'Antenna',
                    'Bunny-Ears',
                    'Curl',
                    'Devil',
                    'Doctor',
                    'Fire',
                    'Flower',
                    'Halo',
                    'Poop',
                    'Tiara',
                    'None',
                ]
            }

            return gazaHeadwearValidationResult

        default:
            return { availability: false, pool: [] }
    }
}

const gazaBackgroundValidation = (ranking: number) => {
    if (ranking >= 1 && ranking <= 500) {
        return {
            availability: true,
            pool: [
                'Blue',
                'Desert',
                'Jungle',
                'Lemon',
                'Mint',
                'Night',
                'Pink',
                'Red',
                'Sky',
                'Spots',
                'Storm',
            ],
        }
    }
    if (ranking >= 501 && ranking <= 1500) {
        return {
            availability: true,
            pool: [
                'Blue',
                'Desert',
                'Jungle',
                'Lemon',
                'Mint',
                'Night',
                'Pink',
                'Red',
                'Sky',
                'Storm',
                'Dots',
                'Stripes',
            ],
        }
    }
    if (ranking >= 1501 && ranking <= 10000) {
        return {
            availability: true,
            pool: [
                'Blue',
                'Desert',
                'Jungle',
                'Lemon',
                'Mint',
                'Night',
                'Pink',
                'Red',
                'Sky',
                'Storm',
                'Grid',
                'Stripes',
            ],
        }
    }
}

const gazaTopValidation = (ranking: number, metadata: { trait_type: string; value: string }[]) => {
    if (ranking >= 1 && ranking <= 500) {
        return {
            availability: false,
            pool: [],
        }
    } else if (ranking >= 501 && ranking <= 1500) {
        if (metadata.find((item) => item.trait_type === 'Bottoms').value === 'None') {
            console.log('except')
            return {
                availability: true,
                pool: [
                    'Blue',
                    'Brown',
                    'Dots',
                    'Finger',
                    'Giraffe',
                    'Grid',
                    'Leather-Jacket',
                    'Night-Sky',
                    'Night',
                    'None',
                    'Orange',
                    'Polka-Dots',
                    'Pom-Poms',
                    'Quadhash',
                    'Red',
                    'Shirt',
                    'Sky',
                    'Stars',
                    'Stripes',
                    'Tape',
                    'Yellow',
                    'Zebra',
                ],
            }
        }
    } else if (ranking >= 1501 && ranking <= 4000) {
        return {
            availability: false,
            pool: [],
        }
    } else if (ranking >= 4001 && ranking <= 10000) {
        return {
            availability: true,
            pool: [
                'Blue',
                'Brown',
                'Dots',
                'Finger',
                'Giraffe',
                'Grid',
                'Leather-Jacket',
                'Night-Sky',
                'Night',
                'Orange',
                'Polka-Dots',
                'Pom-Poms',
                'Quadhash',
                'Red',
                'Shirt',
                'Sky',
                'Stars',
                'Stripes',
                'Tape',
                'Yellow',
                'Zebra',
            ],
        }
    }
}

const gazaBottomsValidation = (
    ranking: number,
    metadata: { trait_type: string; value: string }[],
) => {
    if (ranking >= 1 && ranking <= 500) {
        return {
            availability: false,
            pool: [],
        }
    } else if (ranking >= 501 && ranking <= 1500) {
        if (metadata.find((item) => item.trait_type === 'Top').value === 'None') {
            return {
                availability: true,
                pool: [
                    'Bowtie',
                    'Chain',
                    'Charcoal-Sweater',
                    'Diagonal-Stripes',
                    'Green',
                    'Hanbok',
                    'Lemon-Shirt',
                    'Neckerchief',
                    'None',
                    'Paisley-Shirt',
                    'Pink-Vest',
                    'Polka-Dots',
                    'Purple-Vest',
                    'Red-Shirt',
                    'Red-Sweater',
                    'Robe',
                    'School',
                    'Sport',
                ],
            }
        }
    } else if (ranking >= 1501 && ranking <= 4000) {
        return {
            availability: false,
            pool: [],
        }
    } else if (ranking >= 4001 && ranking <= 10000) {
        return {
            availability: true,
            pool: [
                'Bowtie',
                'Brown-Hoodie',
                'Chain',
                'Charcoal-Sweater',
                'Diagonal-Stripes',
                'Gold-Hoodie',
                'Green',
                'Hanbok',
                'Lemon-Shirt',
                'Neckerchief',
                'Orange-Hoodie',
                'Paisley-Shirt',
                'Pink-Vest',
                'Polka-Dots',
                'Purple-Vest',
                'Red-Shirt',
                'Red-Sweater',
                'Robe',
                'School',
                'Sport',
            ],
        }
    }
}

const gazaOnesieValidation = (ranking: number) => {
    if (ranking >= 1501 && ranking <= 4000) {
        return {
            availability: true,
            pool: [
                'Zombie',
                'Robot',
                'Gold',
                'Spirit',
                'Camo',
                'Dots',
                'Racing',
                'Rainbow',
                'Stripes',
            ],
        }
    } else {
        return {
            availability: false,
            pool: [],
        }
    }
}

const gazaExtrasValidation = (ranking: number) => {
    if (ranking >= 1 && ranking <= 200) {
        return {
            availability: true,
            pool: [
                'Black-Wings',
                'Wings',
                'Stars',
                'Friend',
                'Flowers',
                'Butterflies',
                'Headphones',
                'Bird',
                'None',
            ],
        }
    } else if (ranking >= 201 && ranking <= 300) {
        return {
            availability: true,
            pool: [
                'Wings',
                'Stars',
                'Friend',
                'Flowers',
                'Butterflies',
                'Headphones',
                'Bird',
                'None',
            ],
        }
    } else if (ranking >= 301 && ranking <= 400) {
        return {
            availability: true,
            pool: [
                'Black-Wings',
                'Wings',
                'Stars',
                'Friend',
                'Flowers',
                'Butterflies',
                'Headphones',
                'Bird',
                'None',
            ],
        }
    } else if (ranking >= 401 && ranking <= 500) {
        return {
            availability: true,
            pool: [
                'Wings',
                'Stars',
                'Friend',
                'Flowers',
                'Butterflies',
                'Headphones',
                'Bird',
                'None',
            ],
        }
    } else if (ranking >= 501 && ranking <= 1500) {
        return {
            availability: true,
            pool: [
                'Black-Wings',
                'Wings',
                'Stars',
                'Friend',
                'Flowers',
                'Butterflies',
                'Headphones',
                'Bird',
                'None',
            ],
        }
    } else if (ranking >= 1501 && ranking <= 4000) {
        return {
            availability: true,
            pool: [
                'Bird',
                'Black-Wings',
                'Buseoksa',
                'Butterflies',
                'Crate',
                'Flag',
                'Flowers',
                'Friend',
                'Headphones',
                'None',
                'Package',
                'Snail',
                'Stars',
                'Turtle',
                'Wings',
            ],
        }
    } else if (ranking >= 4001 && ranking <= 10000) {
        return {
            availability: true,
            pool: [
                'Bird',
                'Buseoksa',
                'Butterflies',
                'Crate',
                'Flag',
                'Flowers',
                'Friend',
                'Headphones',
                'None',
                'Package',
                'Snail',
                'Stars',
                'Turtle',
            ],
        }
    }
}

const gazaEyesValidation = () => {
    return {
        availability: true,
        pool: [
            'Bliss',
            'Cross-Eyed',
            'Cute',
            'Cyclops',
            'Glare',
            'Hashes',
            'Hearts',
            'Huh',
            'Lasers',
            'Open',
            'Scowl',
            'Shut',
            'Sleep',
            'Straight',
            'Sunglasses',
            'Surprise',
            'Three',
            'Wide',
            'Wink',
            'Worry',
            'Xs',
        ],
    }
}

const gazaMouthValidation = () => {
    return {
        availability: true,
        pool: [
            'Bubble-Gum',
            'Hmm',
            'Kiss',
            'Nonchalant',
            'Ooh',
            'Smile',
            'Straight',
            'Tongue',
            'Wobbly',
        ],
    }
}
const gazaHeadwearValidation = (ranking: number) => {
    if (ranking >= 1 && ranking <= 1500) {
        return {
            availability: true,
            pool: ['Tiara', 'Poop', 'Halo', 'Fire', 'Flower', 'Bow', 'None'],
        }
    }

    if (ranking >= 1501 && ranking <= 10000) {
        return {
            availability: true,
            pool: [
                'Antenna',
                'Bandana',
                'Beret',
                'Blue-Bucket',
                'Bow',
                'Bunny-Ears',
                'Cap',
                'Chef',
                'Crown',
                'Curl',
                'Devil',
                'Doctor',
                'Fire',
                'Flower',
                'Gat',
                'Green-Beanie',
                'Halo',
                'Helmet',
                'None',
                'Orange-Cap',
                'Party',
                'Pom-Pom',
                'Poop',
                'Purple-Beanie',
                'Red-Cap',
                'Safari',
                'Sherrif',
                'Striped-Bandana',
                'Tiara',
                'Yellow-Bucket',
                'Yellow-Cap',
            ],
        }
    }
}
