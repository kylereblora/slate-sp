const initState = {
    wishlist : [
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
        case 'ADD_PRODUCT_TO_WISHLIST':
            console.log('added product to wishlist', action.productId);
            return state;
        
        case 'ADD_PRODUCT_TO_WISHLIST_ERROR':
            console.log('error adding product to wishlist', action.err);
            return state;
        
        case 'DELETE_PRODUCT_FROM_WISHLIST':
            console.log('deleted product from wishlist', action.productId);
            return state;
        
        case 'DELETE_PRODUCT_FROM_WISHLIST_ERROR':
            console.log('error deleting product from wishlist', action.err);
            return state;
            
        default: 
            return state;            
    }
}

export default wishlistReducer