// src/pages/index.tsx
import React, { useEffect } from 'react';

import ScoreTable from "../components/ScoreTable";

const IndexPage: React.FC = () => {
    useEffect(() => {
        // Этот код будет выполнен только на клиенте
    }, []);

    return (
        <ScoreTable />
    );
};

export default IndexPage;