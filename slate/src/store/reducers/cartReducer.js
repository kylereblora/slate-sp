const initState = {
    cart : [
        {
            id: '1',
            itemName: 'Rosetta Red Floor Tile',
            itemPrice: 'P120.00',
            itemQuantity: 80,
            itemDescription: 'A 60x60 Floor Tile made from solid granite.',
            itemCategory: 'Walls and Flooring',
        }
    ]
}

const wishlistReducer = (state = initState, action) => {
    switch (action.type) {
        case 'ADD_PRODUCT_TO_CART':
            return state;
        
        case 'ADD_PRODUCT_TO_CART_ERROR':
            console.log('error adding product to cart', action.err);
            return state;
        
        case 'DELETE_PRODUCT_FROM_CART':
            return state;
        
        case 'DELETE_PRODUCT_FROM_CART_ERROR':
            console.log('error deleting product from cart', action.err);
            return state;
            
        case 'CLEAR_CART':
            return state;
        
        case 'CLEAR_CART_ERROR':
            console.log('error clearing cart', action.err);
            return state;

        default: 
            return state;            
    }
}

export default cartReducer