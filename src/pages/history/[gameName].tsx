// src/pages/history/[gameName].tsx
import React, { useEffect } from 'react';
import { useRouter } from 'next/router'; // Импортируем useRouter
import GameHistoryPage from '../../components/GameHistoryPage';

const GameHistoryPageComponent: React.FC = () => {
    const router = useRouter();
    const { gameName } = router.query; // Получаем параметр из маршрута

    useEffect(() => {
        // Если gameName не существует, редиректим на другую страницу
        if (!gameName) {
            router.push('/history'); // Переход на страницу /history
        }
    }, [gameName, router]); // Следим за изменением gameName

    // Если gameName еще не загружен, показываем загрузку
    if (!gameName) {
        return <div>Loading...</div>;
    }

    return <GameHistoryPage gameName={gameName as string} />;
};

export default GameHistoryPageComponent;