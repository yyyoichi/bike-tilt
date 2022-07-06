/* @refresh reload */
import { render } from 'solid-js/web';
import { FirebaseProvider } from 'solid-firebase'
import './index.css';
import App from './App';
const {
    REACT_APP_APP_KEY,
    REACT_APP_AUTH_DOMAIN,
    // REACT_APP_DATABASE_URL,
    REACT_APP_PROJECT_ID,
    REACT_APP_STORAGEBUCKET,
    REACT_APP_MESSAGING_SENDER_ID,
    REACT_APP_APP_ID,
    REACT_APP_MEASUREMENT_ID,
} = import.meta.env
const firebaseConfig = {
    apiKey: REACT_APP_APP_KEY,
    authDomain: REACT_APP_AUTH_DOMAIN,
    // databaseURL: REACT_APP_DATABASE_URL,
    projectId: REACT_APP_PROJECT_ID,
    storageBucket: REACT_APP_STORAGEBUCKET,
    messagingSenderId: REACT_APP_MESSAGING_SENDER_ID,
    appId: REACT_APP_APP_ID,
    measurementId: REACT_APP_MEASUREMENT_ID,
}
render(
    () => (
        <FirebaseProvider config={firebaseConfig}>
            <App />
        </FirebaseProvider>
    ),
    document.getElementById('root') as HTMLElement,
)
