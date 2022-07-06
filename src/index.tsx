/* @refresh reload */
import { render } from 'solid-js/web';
import { FirebaseProvider } from 'solid-firebase'
import './index.css';
import App from './App';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_APP_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    // databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID,
}

render(
    () => (
        <FirebaseProvider config={firebaseConfig}>
            <App />
        </FirebaseProvider>
    ),
    document.getElementById('root') as HTMLElement,
)
