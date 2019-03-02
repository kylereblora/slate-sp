export function getProductFromWishlist(id) {
    return function(obj) {
        return obj.id === id;
    }
}