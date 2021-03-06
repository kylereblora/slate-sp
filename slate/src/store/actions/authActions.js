export const signIn = (credentials) => {
    return (dispatch, getState, {getFirebase}) => {
        return new Promise((resolve, reject) => {
            const firebase = getFirebase();

            firebase.auth().signInWithEmailAndPassword(
                credentials.email,
                credentials.password,
            ).then(() => {
                dispatch({ type: 'LOGIN_SUCCESS' })
            }).then(() => {
                resolve();
            }).catch((err) => {
                dispatch({ type: 'LOGIN_ERROR', err})
            }).then(() => {
                resolve();
            });
        })
    }
}


export const signOut = () => {
    return (dispatch, getState, {getFirebase}) => {
        return new Promise((resolve, reject) => {
            const firebase = getFirebase();

            firebase.auth().signOut().then(() => {
                dispatch({ type: 'SIGNOUT_SUCCESS' });
            }).then(() => {
                resolve();
            })
        })
    }
}

export const signUp = (newUser) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        return new Promise((resolve, reject) => {
            const firebase = getFirebase();
            const firestore = getFirestore();

            firebase.auth().createUserWithEmailAndPassword(
                newUser.email,
                newUser.password
            ).then((response) => {
                return firestore.collection('users').doc(response.user.uid).set({
                    contactNumber: '',
                    firstName: newUser.firstName,
                    lastName: newUser.lastName,
                    initials: newUser.firstName[0] + newUser.lastName[0],
                    occupation: newUser.occupation,
                    email: newUser.email,
                    province : '',
                    proDescription: '',
                    proImageUrl: '',
                    proRating: 0,
                    wishlist: [],
                    cart: [],
                    projects: [],
                    reviews: []
                })
            }).then(() => {
                dispatch({ type: 'SIGNUP_SUCCESS' });
            }).then(() => {
                resolve();
            }).catch((err) => {
                dispatch({ type: 'SIGNUP_ERROR', err});
            }).then(() => {
                resolve();
            })
        })
    }
}


export const editUser = (user, state) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        return new Promise((resolve, reject) => {
            const firestore = getFirestore();
            firestore.collection('users').doc(user.id).set({
                firstName: state.firstName,
                lastName: state.lastName,
                initials: state.firstName[0] + state.lastName[0],
                province : state.province,
                email: user.email,
                contactNumber : state.contactNumber,
                proDescription: state.proDescription,
                proImageUrl: state.proImageUrl,
                proRating: user.proRating,
                wishlist: user.wishlist,
                cart: user.cart,
                projects: user.projects,
                reviews: user.reviews,
                occupation : user.occupation
            }).then(() => {
                dispatch({ type: 'EDIT_PROFILE_SUCCESS' });
            }).then(() => {
                resolve();
            }).catch((err) => {
                dispatch({ type: 'EDIT_PROFILE_ERROR', err});
            })
        })
    }    
}