export const signIn = (credentials) => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();

        firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password,
        ).then(() => {
            dispatch({ type: 'LOGIN_SUCCESS' })
        }).catch((err) => {
            dispatch({ type: 'LOGIN_ERROR', err})
        });

        
    }
}


export const signOut = () => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();

        firebase.auth().signOut().then(() => {
            dispatch({ type: 'SIGNOUT_SUCCESS' });
        })
    }
}

export const signUp = (newUser) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        const firestore = getFirestore();

        firebase.auth().createUserWithEmailAndPassword(
            newUser.email,
            newUser.password
        ).then((response) => {
            return firestore.collection('users').doc(response.user.uid).set({
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                initials: newUser.firstName[0] + newUser.lastName[0],
                occupation: newUser.occupation,
                province : '',
                proDescription: '',
                proImageUrl: '',
                proRating: 0,
                wishlist: [],
                projects: [],
                reviews: []
            })
        }).then(() => {
            dispatch({ type: 'SIGNUP_SUCCESS' });
        }).catch((err) => {
            dispatch({ type: 'SIGNUP_ERROR', err});
        })
    }
}


export const editUser = (user, state) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        firestore.collection('users').doc(user.id).set({
            firstName: state.firstName,
            lastName: state.lastName,
            initials: state.firstName[0] + state.lastName[0],
            province : state.province,
            contactNumber : state.contactNumber,
            proDescription: state.proDescription,
            proImageUrl: state.proImageUrl,
            proRating: user.proRating,
            wishlist: user.wishlist,
            projects: user.projects,
            reviews: user.reviews,
            occupation : user.occupation
        }).then(() => {
            dispatch({ type: 'EDIT_PROFILE_SUCCESS' });
        }).catch((err) => {
            dispatch({ type: 'EDIT_PROFILE_ERROR', err});
        })
    }    
}