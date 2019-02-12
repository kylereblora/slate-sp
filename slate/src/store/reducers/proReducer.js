const initState = {
    pros : [
        {id: '1', proName: 'John Wick', proLocation: 'Sta. Cruz, Laguna', proDescription: 'I don\'t like people killing my dog.', contactNumber: '0920921212'},
        {id: '2', proName: 'Alaska Young', proLocation: 'Los Banos, Laguna', proDescription: 'I don\'t like people killing my dog.', contactNumber: '0920921212'},
        {id: '3', proName: 'Mang Lie', proLocation: 'Quezon City', proDescription: 'I don\'t like people killing my dog.', contactNumber: '0920921212'},
        {id: '4', proName: 'Ray Ann Bloo', proLocation: 'Davao City', proDescription: 'I don\'t like people killing my dog.', contactNumber: '0920921212'},
        {id: '5', proName: 'Pink Green', proLocation: 'Lancaster City, Cavite', proDescription: 'I don\'t like people killing my dog.', contactNumber: '0920921212'},
        
    ]
}

const proReducer = (state = initState, action) => {
    return state
}

export default proReducer