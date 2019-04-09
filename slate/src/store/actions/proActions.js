const uuidv1 = require('uuid/v1');

export const addProRating = (state) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        return new Promise((resolve, reject) => {
            const firestore = getFirestore();
            const firebase = getFirebase();
            
            firestore.collection('users').doc(state.proId).get().then((doc) => {
                if (doc.exists) {
                    let sub = doc.data()
                    let newRating = 0;

                    let incomingRating = {
                        content: state.content,
                        user: state.currentUser,
                        rating: state.rating, 
                        id: uuidv1()
                    }

                    let allRatings = sub.reviews.slice()

                    allRatings.push(incomingRating);

                    allRatings.forEach(element => {
                        newRating += element.rating
                    })

                    newRating = newRating / allRatings.length;

                    firestore.collection('users').doc(state.proId).update({
                        proRating: newRating,
                        reviews: allRatings
                    })

                }
            }).then(() => {
                dispatch({ type: 'REVIEW_PRO' });
            }).then(() => {
                resolve();
            }).catch((err) => {
                dispatch({ type: 'REVIEW_PRO_ERROR', err});
            });
        })
    }
}