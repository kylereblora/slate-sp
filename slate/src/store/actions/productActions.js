export const createProduct = (product) => {
    return (dispatch, getState) => {
        // make async call to db
        dispatch({ type: 'CREATE_PRODUCT', product});
    }
} 