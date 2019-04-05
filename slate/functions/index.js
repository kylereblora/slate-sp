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
                const notification = {
                    content: 'Welcome to Slate!',
                    user: `${newUser.firstName} ${newUser.lastName}`,
                    userId: `${newUser.uid}`,
                    time: admin.firestore.FieldValue.serverTimestamp()
                }

                return createNotification(notification);
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