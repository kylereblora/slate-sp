const initState = {}

const projectReducer = (state = initState, action) => {
    switch (action.type) {
        case 'ADD_PROJECT_TO_USER':
            console.log('added project to user', action.project);
            return state;
            
        case 'ADD_PROJECT_TO_USER_ERROR':
            console.log('added project to user error', action.err);
            return state;

        default: 
            return state;
    }
}

export default projectReducer