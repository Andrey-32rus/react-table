import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {ScoreTableModel} from "../models/ScoreTableModel";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {router} from "next/client";
import {Button, Container} from "react-bootstrap";
import GameTable from "../components/UI/GameTable";
import {setGameData} from "../store/slices/gameSlice";
import {GetServerSideProps} from "next";
import {getServerSession, Session} from "next-auth";
import {authOptions} from "./api/auth/[...nextauth]";
import {getUserSession} from "../lib/userSession";

interface Props {
  session: Session | null,
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  const session = await getUserSession(() => getServerSession(context.req as any, context.res as any, authOptions as any))
  return {
    props: {
      session,
    },
  };
};

const ScorePage: React.FC<Props> = ({session}) => {
  const dispatch = useAppDispatch();
  const gameData = useAppSelector((state) => state.game.data);

  const [removedRows, setRemovedRows] = useState<Set<number>>(new Set);
  const [savedRows, setSavedRows] = useState<Set<number>>(new Set);
  const [players, setPlayers] = useState<string[]>([]);
  const [rows, setRows] = useState<string[][]>([]);

  useEffect(() => {
    if (!gameData) {
      router.replace('/inputUsers')
    }
  }, []);

  useEffect(() => {
    if (gameData) {
      setPlayers(gameData.players);
      setRows(gameData.rows);
      setRemovedRows(new Set(gameData.removedRows));
      setSavedRows(new Set(gameData.savedRows));
    }
  }, [gameData]);

  useEffect(() => {
    if (players.length > 0 && rows.length > 0) {

      const currentData: ScoreTableModel = {
        players,
        rows,
        removedRows: Array.from(removedRows),
        savedRows: Array.from(savedRows),
      };

      if (JSON.stringify(gameData) !== JSON.stringify(currentData)) {
        dispatch(setGameData(currentData));
      }

    }
  }, [removedRows, savedRows]);

  const addRow = () => {
    if (savedRows.size !== rows.length) {
      alert('Есть несохранённая строка! Нельзя добавить больше одной несохранённой строки. Сохраните последнюю, потом добавляйте новую пустую');
      return;
    }

    let arr = players.map(p => '');
    setRows([...rows, arr]);
  }

  const changeInputText = (rowIndex: number, colIndex: number, text: string) => {
    const newRows = rows.map((row, index) => {
      if (index === rowIndex) {
        const newRow = [...row];
        newRow[colIndex] = text;
        return newRow;
      }
      return row;
    });

    setRows(newRows);  // Обновляем состояние с новым массивом
  };

  const removeRow = (index: number) => {
    if (removedRows.has(index))
      removedRows.delete(index)
    else
      removedRows.add(index);

    setRemovedRows(new Set(removedRows));
  }

  const saveRow = (index: number) => {
    savedRows.add(index);

    setSavedRows(new Set(savedRows));
  }


  type Save = {
    name: string;
    data: ScoreTableModel;
  };

  const saveGameHandler = async () => {
    const gameName = window.prompt('Введите название сохранения игры');
    if (gameName && players.length > 0 && rows.length > 0) {
      try {

        const save: Save = {
          name: gameName,
          data: {
            players,
            rows,
            removedRows: Array.from(removedRows),
            savedRows: Array.from(savedRows),
          }
        }

        const response = await axios.put('/api/saves', save);

        if (response.status === 200) {
          console.log('Game saved successfully');
        } else {
          console.log('Failed to save game');
        }
      } catch (error) {
        console.error('Error saving game:', error);
      }
    }
  }
  return (
    <Container fluid className="px-4 mt-4">
      {players.length > 0 &&
        <>
          <h3 className='mb-2'>Игровая таблица</h3>
          <GameTable
            players={players}
            rows={rows}
            removedRows={removedRows}
            savedRows={savedRows}
            funcs={{
              changeInputText: changeInputText,
              removeRow: removeRow,
              saveRow: saveRow,
            }}
          />
          <div>
            <div>
              <Button variant="primary" onClick={addRow}>+</Button>
            </div>
            {session &&
              <div className='d-flex flex-row-reverse mt-2'>
                <Button variant="success" onClick={saveGameHandler}>save game</Button>
              </div>
            }
          </div>
        </>
      }
    </Container>
  )
}

export default ScorePage;