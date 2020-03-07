// 目的: FireStoreのダミーデータを自動で入れる

function run() {
  const Certification = firestoreCertification();
  const Firestore = FirestoreApp.getFirestore(Certification.email, Certification.key, Certification.projectId);
  const BaseUrl = "stores/v1/store1/";
  const dammyDatas = {
    "quantity": Math.floor(Math.random()*5),
    "date": new Date('2018/11/10 10:00:00')
  }
  Firestore.createDocument(BaseUrl, dammyDatas);
}

// Firestoreへ認証する為のデータ情報を設定
function firestoreCertification() {
  const EMAIL = PropertiesService.getScriptProperties().getProperty('FIRESTORE_EMAIL');
  const KEY = PropertiesService.getScriptProperties().getProperty('FIRESTORE_KEY');
  const PROJECT_ID = PropertiesService.getScriptProperties().getProperty('FIRESTORE_PROJECT_ID');
  Logger.log("key is "+KEY);
  
  const Certification = {
    "email": EMAIL,
    "key": "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQCaQEFDzFFnVGP0\n/fIn/hOsbENvUbBZqDwi1UuBqoDCiUoJmroEWbLdOA79HCPayWKpUtMNPaTXUHzQ\nxYYdQfyVEwJPJ9wRlcNFPvKeT0DBO+v4X4I++RMQA5jNmPGImifiWAq9bLblxaB/\nCdf6B2ENVSvt6AY+0SNSebKAAfNs9SfG1fq5msU9Pw7A6JkuIL8zY29/shiLbJXn\n6Qb3mCsZgDcAYSrrIHC81ovyhCe9UUKS90KCMStZ0K4ioe2TZrYCThtJ20/Hi5Gg\nPQbCx3RvQAvT50z5cQiXsDOb7w7nl94rdB3JopnW9ippMqHetuTxdHKRL0c0FmTO\nlhBgBdL/AgMBAAECggEAD71xy3jMb7ZZUtUdAj63hDcx9GiKDcQQit9oCo27AN7g\nirVauPnsOg2v3d0ivX8iTbPxbF73dK82ZVlak565pv6fFDO1jafSGr1PJZ9htLYo\nIJqiYEmrS82KKKSsNOvCGSMxyV2QFkdB1uTKwK1DFoiz6F1uUbemmpJniA9q5xm+\niu1k1ZSyooQM+AxfNHTJU1zfC7/yzNNB9/IAEbsCngwCrEqBw9grxb5ty+kNbfL8\ndz5lDixpQPkIFzvEENVM7F0r4lbZdEsb6nEvm/kju8E/yKoB9sILwIyqCW+wEk0D\nYnZZqTl93S1EiFjVPyySzth3aqWEgT2KuaJaOnXKjQKBgQDKZ3rmI5tuXb7W3Kkh\ncHxr5ySmEIZEczyvt40DPsJIbZZwjjCNGDEmR3stQiqiL6bK76pMZMIptgF8NPjJ\n/EyNyl3hObDGz+SfUYBOL21Oz+Em6F/8pnXXdSZm5PK9++TS/IV0QvaMJ7LYRxau\nRLm5R18b+qLqaSWieZfFSWMLYwKBgQDDGJPqsGP4XqlBZoWqDDtZjQvgoKYYFs6K\newHiAd8UG8N3nX9MtqrInVopmaLVsXr72XkCucqEt2D7wGFoxznJOC7/Q5slB/Ah\nbcJxI2kqAnqvLX5e0n4mEXfrX58GyoubmNNwrUWhhFh7W1fu7li85znKTimhsAIo\nqvfURfgCtQKBgQCG16vD2KL7Qw8Zu8Ydlf/+Lu52h/m7bn5WnlUefVgXwpKAB+qG\nhUBxPRvtye/3PwHCnyp4XIQSH8QbiHrarfAeYlxq6PFBckzgav6sl+IdqFZagmM4\nQXmugciEsjCZq1AF09/g1Z/FPcljVvDgRr7olYjibfbNbiF5fcJD2CFY+wKBgQC+\nZHzt2ugk2ZSJ25h0A+3jjc9ajsyo05EK+dIzkqn2gMW4NP6nidiPYWg9Es8jhknE\nAE6lB1WJQUCnTu6BB3PwWCEdQgflEqMYrHnGWc1mjvbVgCtENF2hnwiNrkqOoRmv\nZmxqGN7MKlEDSXg+F2KIL4tpT/A294KT1412HjZTxQKBgQDFhB6+9Q9/1ebCGBOM\nZUSIM4DaaOafCT4aTX4KdIjV7YXouLYrmh+72VlcsnWt3aY1kxFVC1r5KWEIRger\n7XHBFEnvtbGM0GrnjKjvAV4AVz75tBmXmFXoI3D09A+UNJzTk8GycwFRKYTJtz+d\nBlZvpaqdYw5Ni6BvY3oSyk1bJA==\n-----END PRIVATE KEY-----\n",
    "projectId": PROJECT_ID
  }
  return Certification;
}