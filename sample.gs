function questionCreate() {
  //今開いているシートを取得する
  const sheet = SpreadsheetApp.getActiveSheet();
  // 基準行
  const rowIndex = 1;
  // 基準列
  const colStartIndex = 1;
  // 行数
  const rowIndexNum = 1;
  // 列数
  const lastCol = 3;
  // key(id,tag,typeなど...)
  const keys = sheet.getSheetValues(rowIndex, colStartIndex, rowIndexNum, sheet.getLastColumn())[0];
  const data = sheet.getSheetValues(rowIndex+1, colStartIndex, sheet.getLastRow()-rowIndex, sheet.getLastColumn()).filter(String);
  
  var list = [];
  
  var certification = firestoreCertification();
  var firestore = FirestoreApp.getFirestore(certification.email, certification.key, certification.projectId);
  // firestore.deleteDocument('version/1/sampleData/2jrMKKfhv7mqUPo4tPdu');
  data.forEach(function(elm,index){
    var member = generate(elm, keys);
    list[index] = member;
    firestore.createDocument('version/1', member);
  });
  // firestore.createDocument('version/1/sampleData', list);
  // Browser.msgBox("更新が完了しました。\\n" + JSON.stringify(list));
}
function generate(elm, keys){
  var obj = {};
  obj['relation'] = [];
  elm = elm.filter(String);
  for(var i = 0; i < elm.length; i++){
    if(obj[keys[i]]) {
      obj[keys[i]].push(elm[i]);
    }else {
      obj[keys[i]] = elm[i];
    }
  }
  return obj;
}

// Firestoreへ認証する為のデータ情報を設定
function firestoreCertification() {
  var certification = {
    "email": "firebase-adminsdk-74fia@easychat-myself.iam.gserviceaccount.com",
    "key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC36Fa26wC0lhUs\nd/dg5TuAU1Op70UlECWerXCTaSmUjwgMpD5N3H0Ml28rO0ggMmKPLOIpYXsigBBE\nCOi0/wbhkLiNOlfqF/FBIEibgy0HgKpdDzWl3jW8+GNQ+crWmsVzauAMx1dqF58j\n1UG9uD3sVtk7X8YotSx27aBpqno1dxJQEOwe4c67UEGNbSKVi4ZSGJFVUVLjIkBw\novdpu8T/F7T9ahI1QrD60RfEd4/t814V4/Iw26PRtF1CK2jU4qCcMLhfMYTJc07C\nokLxRVbJtZKOqdBRP5bMtwz5zOjNMEnr//UL/Su5yYV8i60FSmyE77ABqQjiyPe7\nFnp8ljQDAgMBAAECggEAUBbeAJ3Z+krr4KhD8o4RugJPyo8ZSRk9kNtOTdv70Cbz\n5fF28piFWsDuGGEiOWdH1btBqKy7n5wuuTo6AWyYlg3c2SAh3h/cIDULebIIH57Q\nUmOHxPq+41M2iTKnO4s+VtOhy97Z+ilcVBIQpasBSJXP15QPa3Xu7cHxXGLyAqrf\nfIEsKSwlUvXyK0XQlPQ1XXgGfo9r3O50OrRBw57ZksHJtkSGLa5JXdYsMmEB0BuA\nJ/zvSioWOcUzFOhHTsGaaNq2guapRoawye39XujyNlk3QNuDccPxitTz6HgI5H8w\nlTxiKh6ifPd7+slzAQkXk4sjT3WNoKT/1UpZB66PrQKBgQD8xpRR3neLe/iI9LUx\n6XxIwVKo7dFDvEKQHs2MmV5whgBGHeF6JGTOHyHHQ0xRmff2bkZ5kabDMWyYW5m1\n3EHA9ij1VfqzFP5Fns20UEP9BmEEJ2IVVCvGVQ5bceINWK7PQXqngC0Ob01z3eEQ\ndvPlR+WJjhlQFF37Q8s2PFIrpwKBgQC6QOAhA5D52hFWzou/Z1AlnWPUMLbIuRc1\nthaWQoMXOO6010U1pNchrSiZHSjIt1h+op9m0zo84qS28Deh3+d6Kmd5bxvGHmz1\ny7NNwaODTt0egphVgdyLcWqEjZLFfhNiXQOFZWEpoeLAA/LVQhcSMQSwX49oPRXG\nLuXaKVoQRQKBgQDAyLcQJYqpIBiyY2faNEfsuTzQx+glL+zYPBXqmIIVca29zEZO\nQHl9VvMNJT+MsNAT65DmYPZ9wjEfliUKNX0UrOkaC8QTVvyCnpYmYl0oGfheEadV\nuwdT0UUM6zNLmIpiWX8xRqmWa773ko53XzGueYIPwgd+MrpmyxKuP50v2wKBgBrS\niPR4LQKuUtzrddikqjggiGXgdhJGBX+or2wIPBS2EDpe3gqxqIGjDDuwpVTygn4K\nMWZ/eN2XzhzCT2CyfAVt4eTtCVTowMxM/49tGX0peFKSgBmgUACM3sgkE0T5uRTr\nTDyDsxBpzdvVNb1cfTITeRdlS6O5WE9oJZXbaqr5AoGAIZ5vhq958mBqPTjKOeRq\n8jUA3lft6txpXwaF+wNKFgZsbERulZsJkMmqv3Plp0pEa4Q8enmqN11brP6MFmBf\nzVViih6xwXtTw2k7ZobPuUDqTtV1n7E2kzhIjqoAYuxFapUgXvQ1XuuHspjBhmvZ\nKUuy+ai4ZVxsfs4Nma6XpbI=\n-----END PRIVATE KEY-----\n",
    "projectId": "easychat-myself"
  }
  return certification;
}