export const createProject = (project, state) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        return new Promise((resolve, reject) => {
        
            // make async call to db
            const firestore = getFirestore();
            const firebase = getFirebase();

            firestore.collection('users').doc(state).update({
                projects: firebase.firestore.FieldValue.arrayUnion({...project})
            }).then(() => {
                // dispatch to create the project in firestore
                dispatch({ type: 'ADD_PROJECT_TO_USER', project});
            }).then(() => {
                resolve();
            }).catch((err) => {
                dispatch({ type: 'ADD_PROJECT_TO_USER_ERROR', err});
            });
        })
    }
} 