export const addProRating = (state) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        return new Promise((resolve, reject) => {
            const firestore = getFirestore();
            firestore.collection('unapproved_reviews_pros').add({
                ...state,
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
