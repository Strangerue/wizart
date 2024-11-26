import React, {useEffect} from 'react';
import { Link, useLocation } from 'react-router-dom';

function Sidebar() {
  const location = useLocation(); // Получаем текущий location
  const getMenuClass = (path) => {
    return location.pathname === path ? 'menu-button active' : 'menu-button';
  };

  return (
    <div className="sidebar">
      <img src="" alt="" />
      <h1>LOGO HERE</h1>
      <ul className="menu">
        <li>
          <Link to="/">
            <button type="button" id="home" className={getMenuClass('/')}>
              <img src="/public/Home.svg" align="absmiddle" className="icon" />
              Главная
            </button>
          </Link>
        </li>
        <li>
          <Link to="/projects">
            <button type="button" id="projects" className={getMenuClass('/projects')}>
              <img src="/public/Category.svg" align="absmiddle" className="icon" />
              Проекты
            </button>
          </Link>
        </li>
        <li>
          <Link to="/employees">
            <button type="button" id="employees" className={getMenuClass('/employees')}>
              <img src="/public/Usersgroup.svg" align="absmiddle" className="icon" />
              Сотрудники
            </button>
          </Link>
        </li>
        <li>
          <Link to="/mails">
            <button type="button" id="mails" className={getMenuClass('/mails')}>
              <img src="/public/Send.svg" align="absmiddle" className="icon" />
              Рассылки
            </button>
          </Link>
        </li>
        <li>
          <Link to="/billing">
            <button type="button" id="billing" className={getMenuClass('/billing')}>
              <img src="/public/Wallet.svg" align="absmiddle" className="icon" />
              Биллинг
            </button>
          </Link>
        </li>
        <li>
          <Link to="/pers">
            <button type="button" id="digitalpers" className={getMenuClass('/pers')}>
              <img src="/public/authentication.svg" align="absmiddle" className="icon" />
              Цифровые персонажи
            </button>
          </Link>
        </li>
      </ul>
      <ul className="menu-soon">
        <div className="soon-text soon">Soon</div>
        <li>
          <button type="button" className="menu-button soon">
            <img src="/public/Chat.svg" align="absmiddle" className="icon" />
            Диалоги
          </button>
        </li>
        <li>
          <button type="button" className="menu-button soon">
            <img src="/public/2 User.svg" align="absmiddle" className="icon" />
            CRM
          </button>
        </li>
        <li>
          <button type="button" className="menu-button soon">
            <img src="/public/Help.svg" align="absmiddle" className="icon" />
            Хелпдеск
          </button>
        </li>
      </ul>
      <ul className="menu-service">
        <li>
          <button type="button" className="menu-button">
            <img src="/public/quit.svg" align="absmiddle" className="icon" />
            Свернуть меню
          </button>
        </li>
        <li>
          <button type="button" className="menu-button">
            <img src="/public/Siderbar.svg" align="absmiddle" className="icon" />
            Заказать внедрение
          </button>
        </li>
        <li>
          <button type="button" className="menu-button">
            <img src="/public/question.svg" align="absmiddle" className="icon" />
            Нужна помощь
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
