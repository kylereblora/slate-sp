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
    ]
}

const productReducer = (state = initState, action) => {
    switch (action.type) {
        case 'CREATE_PRODUCT' : 
            return state;
        
        case 'CREATE_PRODUCT_ERROR':
            return state;
        
        case 'DELETE_PRODUCT' :
            return state;

        case 'DELETE_PRODUCT_ERROR' :
            return state;

        case 'EDIT_PRODUCT' :
            return state;
            
        case 'EDIT_PRODUCT_ERROR' :
            return state;

        case 'REVIEW_PRODUCT' :
            return state;

        case 'REVIEW_PRODUCT_ERROR' :
            return state;

        default: 
            return state;
    }
}

export default productReducer