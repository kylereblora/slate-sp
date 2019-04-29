const uuidv1 = require('uuid/v1');

export const addItemToCart = (productId, qty, state) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        return new Promise((resolve, reject) => {
            const firestore = getFirestore();
            const firebase = getFirebase();
            firestore.collection('users').doc(state).update({
                cart: firebase.firestore.FieldValue.arrayUnion({id: productId, qty: qty})
            }).then(() => {
                dispatch({ type : 'ADD_PRODUCT_TO_CART', productId})
            }).then(() => {
                resolve();
            }).catch((err) => {
                dispatch({ type: 'ADD_PRODUCT_TO_CART_ERROR', err})
            })
        })
    }
}

export const deleteItemFromCart = (productId, qty, state) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        const firebase = getFirebase();
        
        firestore.collection('users').doc(state).update({
            cart : firebase.firestore.FieldValue.arrayRemove({id: productId, qty: qty})
        }).then(() => {
            dispatch({ type: 'DELETE_PRODUCT_FROM_CART', productId })
        }).catch((err) => {
            dispatch({ type : 'DELETE_PRODUCT_FROM_CART_ERROR', err})
        })
    }
}


export const checkout = (state) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        return new Promise((resolve, reject) => {
            const firestore = getFirestore();
            
            firestore.collection('orders').add({
                id: uuidv1(),
                customer: state,
            }).then(() => {
                resolve();
            }).then(() => {
                firestore.collection('users').doc(state).update({
                    cart: []
                }).catch((err) => {
                    dispatch({ type : 'CLEAR_CART_ERROR', err})
                })

            }).then(() => {
                dispatch({ type: 'CLEAR_CART' })
            }).catch((err) => {
                dispatch({ type : 'CLEAR_CART_ERROR', err})
            })
        })

    }
}