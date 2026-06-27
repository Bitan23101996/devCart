import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import App from './App';
import { store } from './store/store';
import './i18n';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import '@/assets/styles/index.scss';
import ThemeProvider from './app/providers/ThemeProvider';

ReactDOM.createRoot(
    document.getElementById('root')!
).render(
    <Provider store={store}>
        <ThemeProvider>
            <BrowserRouter>
                <App />
                <ToastContainer
                    position="bottom-right"
                    autoClose={2000}
                />
            </BrowserRouter>
        </ThemeProvider>
    </Provider>
);

