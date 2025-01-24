import React from 'react';
import ScoreTable from "../components/ScoreTable";
import {GetServerSideProps} from "next";
import path from "path";
import fs from "fs";
import {ScoreTableModel} from "../models/ScoreTableModel";

export const getServerSideProps: GetServerSideProps<{ gameData: ScoreTableModel | null }> = async () => {
    try {
        const filePath = path.resolve('current.json');

        if (!fs.existsSync(filePath)) {
            return {
                props: {
                    gameData: null, // Возвращаем объект с `gameData: null`
                },
            };
        }

        const gameData: ScoreTableModel = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        return {
            props: {
                gameData, // Возвращаем объект с `gameData`
            },
        };
    } catch (error) {
        console.error('Error reading game data:', error);
        return {
            props: {
                gameData: null, // В случае ошибки возвращаем объект с `gameData: null`
            },
        };
    }
};


interface Props {
    gameData: ScoreTableModel | null;
}

const ScorePage: React.FC<Props> = ({ gameData }) => {
    return (
        <ScoreTable gameData={gameData} />
    );
};

export default ScorePage;