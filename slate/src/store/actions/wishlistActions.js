export const addItemToWishlist = (productId, product, state) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        return new Promise((resolve, reject) => {
            const firestore = getFirestore();
            const firebase = getFirebase();
            firestore.collection('users').doc(state.uid).update({
                wishlist: firebase.firestore.FieldValue.arrayUnion({id: productId})
            }).then(() => {
                dispatch({ type : 'ADD_PRODUCT_TO_WISHLIST', productId})
            }).then(() => {
                resolve();
            }).catch((err) => {
                dispatch({ type: 'ADD_PRODUCT_TO_WISHLIST_ERROR', err})
            })
        })
    }
}

export const deleteItemFromWishlist = (productId, product, state) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        const firebase = getFirebase();
        
        firestore.collection('users').doc(state).update({
            wishlist : firebase.firestore.FieldValue.arrayRemove({id: productId})
        }).then(() => {
            dispatch({ type: 'DELETE_PRODUCT_FROM_WISHLIST', productId })
        }).catch((err) => {
            dispatch({ type : 'DELETE_PRODUCT_FROM_WISHLIST_ERROR', err})
        })
    }
}