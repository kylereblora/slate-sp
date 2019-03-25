const uuidv1 = require('uuid/v1');

export const createProject = (project, state) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        return new Promise((resolve, reject) => {
        
            // make async call to db
            const firestore = getFirestore();
            const firebase = getFirebase();

            firestore.collection('users').doc(state).update({
                projects: firebase.firestore.FieldValue.arrayUnion({...project, id: uuidv1()})
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

export const deleteProject = (id, project) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        return new Promise((resolve, reject) => {
            const firestore = getFirestore();
            const firebase = getFirebase();

            firestore.collection('users').doc(id).update({
                projects: firebase.firestore.FieldValue.arrayRemove({id: project.id, ...project})
            }).then(() => {
                // dispatch to create the project in firestore
                dispatch({ type: 'DELETE_PROJECT_FROM_USER', project});
            }).then(() => {
                resolve();
            }).catch((err) => {
                dispatch({ type: 'DELETE_PROJECT_FROM_USER_ERROR', err});
            });
        })
    }
}

export const editProject = (project, state, id) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        return new Promise((resolve, reject) => {
            const firestore = getFirestore();
            const firebase = getFirebase();

            firestore.collection('users').doc(id).get().then((doc) => {
                if(doc.exists) {
                    // get the user document first
                    let sub = doc.data()
                    
                    // find the index where the project id matches the user's project.id
                    let result = sub.projects.findIndex(getProjectWithSameId(project.id))

                    // create a new project which contains the edited fields in EditProject.jsx
                    let newProject = {
                        projectName : state.projectName,
                        projectCost: state.projectCost,
                        projectLocation: state.projectLocation,
                        projectYear: state.projectYear,
                        projectDescription: state.projectDescription,
                        projectImageUrl : state.projectImageUrl,
                        id : project.id,
                    }

                    // modify the projects array with the new project
                    sub.projects[result] = newProject;

                    // modify firestore collection
                    firestore.collection('users').doc(id).set({
                        contactNumber : sub.contactNumber,
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
                        dispatch({ type: 'EDIT_PROJECT_IN_USER_ERROR', err});
                    })
                } else {
                    dispatch({ type: 'NO_USER_DOC_FOUND' });
                    
                }
                
            }).then(() => {
                // dispatch to edit the project in firestore
                dispatch({ type: 'EDIT_PROJECT_IN_USER_SUCCESS', project});
            }).catch((err) => {
                dispatch({ type: 'EDIT_PROJECT_IN_USER_ERROR', err});
                
            })
        })
    }
}

function getProjectWithSameId(id) {
    return function(obj) {
        return obj.id === id;
    }
}