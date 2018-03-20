import * as firebase from 'firebase';

const prodConfig = {
    apiKey: "AIzaSyDsq4gWHFygPCbS1Qn0JDOqzzodbdRrizY",
    authDomain: "quickmark-3fcd1.firebaseapp.com",
    databaseURL: "https://quickmark-3fcd1.firebaseio.com",
    projectId: "quickmark-3fcd1",
    storageBucket: "quickmark-3fcd1.appspot.com",
    messagingSenderId: "501274760433"
};

const devConfig = {
    apiKey: "AIzaSyAcSSefSb1MWd-be0v13Anj0psLRAIA41k",
    authDomain: "quickmark-dev.firebaseapp.com",
    databaseURL: "https://quickmark-dev.firebaseio.com",
    projectId: "quickmark-dev",
    storageBucket: "quickmark-dev.appspot.com",
    messagingSenderId: "322472727948"
};

const config = process.env.NODE_ENV === 'production'
  ? prodConfig
  : devConfig;

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const auth = firebase.auth();

export {
  auth,
};