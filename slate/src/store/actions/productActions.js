export const createProduct = (product) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        // make async call to db
        const firestore = getFirestore();
        firestore.collection('products').add({
            ...product,
            itemRating: 0,
            createdAt: new Date()
        }).then(() => {
            dispatch({ type: 'CREATE_PRODUCT', product});
        }).catch((err) => {
            dispatch({ type: 'CREATE_PRODUCT_ERROR', err});
        });
    }
} 