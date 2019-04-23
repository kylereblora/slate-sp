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
                productId: review.productId,
                rating: review.rating,
                user: review.user, 
                userId: review.userId,
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
                    }).then(() => {
                        const notification = {
                            content: 'Your rating for '+ dat.itemName + ' has been approved.',
                            userId: review.userId,
                            time: admin.firestore.FieldValue.serverTimestamp(),
                            sender: 'Slate'
                        }
        
                        return createNotification(notification);
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

exports.approveProReview = functions.https.onRequest((req, res) => {
    return cors(req, res, () => {
        if (req.method !== 'POST') {
            return res.status(500).json({
                message: 'Not allowed'
            })
        }

        const review = req.body.review;

        return admin.firestore().collection('users').doc(review.proId).update({
            reviews: admin.firestore.FieldValue.arrayUnion({
                content: review.content,
                proId: review.proId,
                rating: review.rating,
                user: review.currentUser, 
                userId: review.userId,
                id: review.id 
            })
        })
        .then(() => {
            return admin.firestore().collection('users').doc(review.proId).get().then((docRef) => {
                    const dat = docRef.data()                    
                    let r = dat.reviews;
                    let newRating = 0;

                    r.forEach(element => {
                        newRating += element.rating
                    })

                    newRating = newRating/r.length;

                    admin.firestore().collection('users').doc(review.proId).update({
                        proRating: newRating
                    }).then(() => {
                        const notification = {
                            content: 'Your rating for '+ dat.firstName + ' ' + dat.lastName + ' has been approved.',
                            userId: review.userId,
                            time: admin.firestore.FieldValue.serverTimestamp(),
                            sender: 'Slate'
                        }
        
                        return createNotification(notification);
                    })
            })
        })
        .then(() => {
            let newContent = review.currentUser + ' has rated you, ' + review.rating + ' stars on your profile!' 
            let notification = {
                sender: review.currentUser,
                content: newContent,
                userId: review.proId,
                time: admin.firestore.FieldValue.serverTimestamp(),
            }

            return createNotification(notification)

        })
        .then(() => {
            return admin.firestore().collection('unapproved_reviews_pros').doc(review.id).delete().then(() => {
                res.status(200).send('Review approved.');
            }).catch((error) => {
                console.log('Error approving review', error);
            })

        }).catch((error) => {
            console.log('Error approving review', error);
        })
    })

})

exports.disapproveReview = functions.https.onRequest((req, res) => {
    return cors(req, res, () => {
        if (req.method !== 'POST') {
            return res.status(500).json({
                message: 'Not allowed'
            })
        }

        let disapproval = req.body.disapproval;
        let newContent = 'Your review for ' + disapproval.revieweeName + ' has been rejected due to ' + disapproval.content
        let review_collection  = req.body.disapproval.reviewCollection;

        disapproval = {
            content : newContent,
            sender: 'Slate',
            reviewId: disapproval.reviewId,
            revieweeName: disapproval.revieweeName,
            userId: disapproval.userId,            
            time: admin.firestore.FieldValue.serverTimestamp(),
        }

        return admin.firestore().collection('notifications').add(disapproval).then(() => {
            return admin.firestore().collection(review_collection).doc(disapproval.reviewId).delete().then(() => {
                res.status(200).send('Review disapproved.');
            }).catch((error) => {
                console.log('Error disapproving review', error);
            })
        }).catch((error) => {
            console.log('Error disapproving review', error);
        })
    })
})