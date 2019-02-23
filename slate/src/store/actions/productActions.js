export const createProduct = (product) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        return new Promise((resolve, reject) => {
            // make async call to db
            const firestore = getFirestore();
            firestore.collection('products').add({
                ...product,
                itemRating: 0,
                createdAt: new Date()
            }).then(() => {
                dispatch({ type: 'CREATE_PRODUCT', product});
            }).then(() => {
                resolve();
            }).catch((err) => {
                dispatch({ type: 'CREATE_PRODUCT_ERROR', err});
            });
        })
    }
} 