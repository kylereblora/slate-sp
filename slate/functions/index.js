const functions = require('firebase-functions');
const admin = require('firebase-admin');
let serviceAccount = require('./service-account.json');
const cors = require('cors')({ origin: true });


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://slate-sp2.firebase.io'
});

exports.helloWorld = functions.https.onRequest((request, response) => {
    response.send("Hello from Slate!");
});

const createNotification = (notification => {
    return admin.firestore().collection('notifications')
        .add(notification)
        .then(doc => console.log('notification added', doc));
})

exports.userJoined = functions.auth.user()
    .onCreate(user => {
        console.log(user);
        

        return admin.firestore().collection('users')
            .doc(user.uid)
            .get()
            .then(doc => {
                const newUser = doc.data();
                console.log(newUser);
                
                const notification = {
                    content: 'Welcome to Slate!',
                    user: `${newUser.firstName} ${newUser.lastName}`,
                    userId: `${user.uid}`,
                    time: admin.firestore.FieldValue.serverTimestamp(),
                    sender: 'Slate'
                }

                return createNotification(notification);
        })
})

exports.createSeller = functions.https.onRequest((req, res) => {
    
    return cors(req, res, () => {
        if (req.method !== 'POST') {
            return res.status(500).json({
                message: 'Not allowed'
            })
        }

        const seller = req.body.seller;

        return admin.auth().createUser({
            email: seller.email,
            password: seller.password,
            displayName: seller.firstName + ' ' + seller.lastName,
            disabled: false
        }).then((userRecord) => {
            return admin.firestore().collection('users').doc(userRecord.uid).set({
                firstName: seller.firstName,
                lastName: seller.lastName,
                initials: seller.firstName[0] + seller.lastName[0],
                occupation: 'Seller',
                province : '',
                proDescription: '',
                proImageUrl: '',
            }).then(() => {
                res.status(200).send('Seller created successfully.');
            }).catch((error) => {
                console.log('Error creating seller', error);
            })
        }).catch((error) => {
            console.log('Error creating seller', error);
            
        })
    })
})

exports.removeUser = functions.https.onRequest((req, res) => {

    return cors(req, res, () => {
        if (req.method !== 'DELETE') {
            return res.status(500).json({
                message: 'Not allowed'
            })
        }

        return admin.firestore().collection('users') 
            .doc(req.query.uid)
            .delete()
            .then(() => {
                return removeSpecificUser(req.query.uid);
            })
            .then(() => {
                res.status(200).send('User deleted successfully.');
            })
    })

})

function removeSpecificUser(uid) {
    return admin.auth().deleteUser(uid).then(() => {
        console.log('Deleted user account', uid);
    }).catch((error) => {
        console.log('Deletion of inactive user account failed', error);
    });
}

exports.approveReview = functions.https.onRequest((req, res) => {
    return cors(req, res, () => {
        if (req.method !== 'POST') {
            return res.status(500).json({
                message: 'Not allowed'
            })
        }

        const review = req.body.review;


        return admin.firestore().collection('products').doc(review.productId).update({
            itemReviews: admin.firestore.FieldValue.arrayUnion({
                content: review.content,
                maxRating: review.maxRating,
                createdAt: review.createdAt,
                productId: review.productId,
                rating: review.rating,
                user: review.user, 
                id: review.id 
            })
        })
        .then(() => {
            return admin.firestore().collection('products').doc(review.productId).get().then((docRef) => {
                    const dat = docRef.data()                    
                    let r = dat.itemReviews;
                    let newRating = 0;

                    r.forEach(element => {
                        newRating += element.rating
                    })

                    newRating = newRating/r.length;

                    admin.firestore().collection('products').doc(review.productId).update({
                        itemRating: newRating
                    })
            })

        })
        .then(() => {
            return admin.firestore().collection('unapproved_reviews').doc(review.id).delete().then(() => {
                res.status(200).send('Review approved.');
            }).catch((error) => {
                console.log('Error approving review', error);
            })

        }).catch((error) => {
            console.log('Error approving review', error);
        })
    })
})