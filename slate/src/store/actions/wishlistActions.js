export const addItemToWishlist = (product, state) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        firestore.collection('wishlist').add({
            ...product,
            wishlistAuthor: state.uid
        }).then(() => {
            dispatch({ type : 'ADD_PRODUCT_TO_WISHLIST', product})
        }).catch((err) => {
            dispatch({ type: 'ADD_PRODUCT_TO_WISHLIST_ERROR', err})
        })
    }
}