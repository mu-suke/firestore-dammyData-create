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

// ランダムに生成する売り上げ個数の範囲
const QUANTITY_CONST = {
  MIN: 5,
  MAX: 10,
};
// ランダムに生成する時間の範囲
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
const storeAndQuantityDataList = [
  {
    name: 'hogehoge',
    quantity: 3,
  },
  {
    name: 'fugafuga',
    quantity: 3,
  },
  {
    name: 'piyopiyo',
    quantity: 3,
  },
];

const store = db.collection('stores');

// ここからstoreNameのクエリ
// TODO: 該当クエリにダミーデータを挿入
storeAndQuantityDataList.forEach((storeData) => {
  store.where('storeName', '==', storeData.name).get()
      .then(snapshot => {
        if(snapshot.empty) {
          console.log('No matching documents.');
          return;
        }
        snapshot.forEach(doc => {
          console.log(doc.id, '=>', doc.data());
          store.doc(doc.id).listCollections()
            .then(collections => {
              if(collections.empty) {
                console.log('No matching collections.');
                return;
              }
              collections.forEach(collection => {
                console.log('Found subcollection with id:', collection.id);
                // TODO: async awaitを実装する
                // db.collection(`stores/${doc.id}/${collection.id}`).set({
                //   quantity: Math.floor(Math.random() * (QUANTITY_CONST.MAX + 1 - QUANTITY_CONST.MIN)) + QUANTITY_CONST.MIN,
                //   createdAt: admin.firestore.Timestamp.fromDate(new Date(`2018/11/10 ${Math.floor(Math.random() * (TIME_CONST.MAX + 1 - TIME_CONST.MIN) + TIME_CONST.MIN)}:00:00`)),
                // });
                // db.collection(`stores/${doc.id}/${collection.id}`).get().then(target => {console.log('target is '+JSON.stringify(target.data))});
              })
            })
            .catch(err => {
              console.log('error getting collection', err);
            });
        });
      })
      .catch(err => {
        console.log('error getting documents', err);
      });
});
