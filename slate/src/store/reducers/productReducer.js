const initState = {
    products: [
        {
            id: '1',
            itemName: 'Rosetta Red Floor Tile',
            itemPrice: 'P120.00',
            itemQuantity: 80,
            itemDescription: 'A 60x60 Floor Tile made from solid granite.',
            itemCategory: 'Walls and Flooring',
        },

        {
            id: '2',
            itemName: 'Genoa Pink Floor Tile',
            itemPrice: 'P120.00',
            itemQuantity: 80,
            itemDescription: 'A 60x60 Floor Tile made from solid granite.',
            itemCategory: 'Walls and Flooring',
        },

        {
            id: '3',
            itemName: 'La Valle Floor Tile',
            itemPrice: 'P120.00',
            itemQuantity: 80,
            itemDescription: 'A 60x60 Floor Tile made from solid granite.',
            itemCategory: 'Walls and Flooring',
        },
    ]
}

const productReducer = (state = initState, action) => {
    return state
}

export default productReducer