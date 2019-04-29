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

export const editItemQuantityInCart = (productId, user, qty) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        return new Promise((resolve, reject) => {
            const firestore = getFirestore();
            
            firestore.collection('users').doc(user).get().then((doc) => {
                if (doc.exists) {
                    let sub = doc.data();

                    let result = sub.cart.findIndex(getItemInCartWithSameId(productId))
                    
                    let newItemInCart = {
                        id : productId,
                        qty
                    }

                    sub.cart[result] = newItemInCart;

                    firestore.collection('users').doc(user).set({
                        contactNumber : sub.contactNumber,
                        cart: sub.cart,
                        firstName : sub.firstName,
                        lastName : sub.lastName,
                        initials : sub.initials,
                        occupation : sub.occupation,
                        proDescription : sub.proDescription,
                        proImageUrl : sub.proImageUrl,
                        proRating : sub.proRating,
                        projects: sub.projects,
                        province: sub.province,
                        reviews : sub.reviews,
                        wishlist: sub.wishlist
                    }).catch((err) => {
                        dispatch({ type: 'EDIT_ITEM_QUANTITY_IN_CART_ERROR', err});
                    })
                }
            }).then(() => {
                // dispatch to edit the project in firestore
                dispatch({ type: 'EDIT_ITEM_QUANTITY_IN_CART_SUCCESS'});
            }).then(() => {
                resolve();
            }).catch((err) => {
                dispatch({ type: 'EDIT_ITEM_QUANTITY_IN_CART_ERROR', err});
                
            })
        })
    }
}


export const checkout = (user, subtotal, orderList) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        return new Promise((resolve, reject) => {
            const firestore = getFirestore();
            
            firestore.collection('orders').add({
                id: uuidv1(),
                customer: user,
                orderList,
                subtotal
            }).then(() => {
                resolve();
            }).then(() => {
                firestore.collection('users').doc(user).update({
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

function getItemInCartWithSameId(id) {
    return function(obj) {
        return obj.id === id;
    }
}