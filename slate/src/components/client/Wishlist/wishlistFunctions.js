export function getProductFromWishlist(productId) {
    return function(obj) {
        return obj.id === productId;
    }
}