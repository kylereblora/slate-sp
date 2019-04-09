const initState = {}

const proReducer = (state = initState, action) => {
    switch (action.type) {
        case 'REVIEW_PRO':
            console.log("Added review successfully");
            return state;
        
        case 'REVIEW_PRO_ERROR':
            console.log("Add review error", action.err);
            return state;

        default:
            return state;
    }
}

export default proReducer