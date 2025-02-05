import {getServerSession, Session} from "next-auth";
import {GetServerSideProps} from "next";
import {getUserSession} from "../lib/userSession";
import {authOptions} from "./api/auth/[...nextauth]";
import React from "react";

interface Props {
  session: Session | null,
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  const session = await getUserSession(() => getServerSession(context.req, context.res, authOptions))
  return {
    props: {
      session,
    },
  };
};

const Index: React.FC<Props> = ({session}) => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-8 mx-auto text-center">
          <h1 className="display-4 fw-bold mb-4">Результаты игр и актуальная статистика</h1>
          <p className="lead mb-4">
            Добро пожаловать на сайт, где вы найдете самые актуальные результаты игр, таблицы и статистику для всех
            популярных игр. Мы предоставляем удобный и понятный интерфейс для отслеживания результатов матчей, рейтингов
            и другой важной информации.
          </p>
          <p className="mb-4">
            Наш сайт регулярно обновляется, чтобы вы всегда были в курсе последних событий. Используйте наши таблицы для
            анализа игр, сравнения команд и игроков, а также для планирования своих стратегий.
          </p>
          <a href="/score" className="btn btn-primary btn-lg">Перейти к игре</a>
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-lg-8 mx-auto">
          <h2 className="h3 mb-4">Почему выбирают наш сайт?</h2>
          <ul className="list-unstyled">
            <li className="mb-3"><strong>Актуальные данные:</strong> Мы оперативно обновляем результаты игр, чтобы вы
              всегда были в курсе последних событий.
            </li>
            <li className="mb-3"><strong>Удобный интерфейс:</strong> Наш сайт разработан с учетом удобства
              пользователей. Все таблицы и статистика доступны в несколько кликов.
            </li>
            <li className="mb-3"><strong>Широкий охват игр:</strong> Мы предоставляем данные для множества игр, включая
              футбол, баскетбол, киберспорт и другие.
            </li>
            <li className="mb-3"><strong>Бесплатный доступ:</strong> Вся информация на сайте доступна абсолютно
              бесплатно.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Index;