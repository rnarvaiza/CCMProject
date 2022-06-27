import {initializeApp} from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyAnfb_XVmiYHsB4dyd7berbQvOQQqv3b5o",
    authDomain: "ccmblog-4791c.firebaseapp.com",
    projectId: "ccmblog-4791c",
    storageBucket: "ccmblog-4791c.appspot.com",
    messagingSenderId: "207100216700",
    appId: "1:207100216700:web:9ae9f49eb52fb990eb50f9",
    measurementId: "G-WMFFQ75BJB"
};

const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
