// src/pages/_app.tsx
import '../styles/App.css'; // Импортируйте глобальные стили здесь
import '../styles/index.css';
import {AppProps} from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <div>
            <h1>Welcome to My Next.js App!</h1>
            {/* Здесь можно подключать компоненты */}
        </div>
    );
}

export default MyApp;