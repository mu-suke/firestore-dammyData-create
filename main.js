const admin = require('firebase-admin');
const serviceAccount = require('./firebase/serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://sales-management-2041e.firebaseio.com',
});

const db = admin.firestore();
db.collection('stores/v1/store1').get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        console.log(doc.id, '=>', doc.data());
      });
    })
    .catch((err) => {
      console.log('Error getting documents', err);
    });

let store = db.collection('stores').doc();

const QUANTITY_CONST = {
  MIN: 5,
  MAX: 10,
};

const TIME_CONST = {
  MIN: 10,
  MAX: 17,
}

// TODO: ここを修正
// let setSf = store.set({
//   quantity: Math.floor(Math.random() * (QUANTITY_CONST.MAX + 1 - QUANTITY_CONST.MIN)) + QUANTITY_CONST.MIN,
//   createdAt: admin.firestore.Timestamp.fromDate(new Date(`2018/11/10 ${Math.floor(Math.random() * (TIME_CONST.MAX + 1 - TIME_CONST.MIN) + TIME_CONST.MIN)}:00:00`)),
// });

// TODO: 以下の名前に該当するコレクションのみにデータを追加
const storeList = [
  'hogehoge',
  'fugafuga',
  'piyopiyo',
];


// ここからstoreNameのクエリ
storeList.forEach(store => {
  db.collection('stores').where('storeName', '==', store).get()
      .then(snapshot => {
        if(snapshot.empty) {
          console.log('No matching documents.');
          return;
        }
        snapshot.forEach(doc => {
          console.log(doc.id, '=>', doc.data());
        });
      })
      .catch(err => {
        console.log('error getting documents', err);
      });
});

