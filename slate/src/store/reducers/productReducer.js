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
            console.log('created product', action.product);
            return state;
        
        case 'CREATE_PRODUCT_ERROR':
            console.log('create product error', action.err);
            return state;
        
        case 'DELETE_PRODUCT' :
            console.log('deleted product');
            return state;

        case 'DELETE_PRODUCT_ERROR' :
            console.log('delete product error', action.err);
            return state;

        case 'EDIT_PRODUCT' :
            console.log('edited product');
            return state;
            
        case 'EDIT_PRODUCT_ERROR' :
            console.log('edit product error', action.err);
            return state;

        default: 
            return state;
    }
}

export default productReducer