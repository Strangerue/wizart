import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DialogStages from '../components/DialogStages';
import DialogExamples from '../components/DialogExamples';
import Greetings from '../components/Greetings';
import PopupSaving from '../components/PopupSaving';
import { useKeycloak } from '@react-keycloak/web';

function NewEmployeePage() {
    const { keycloak } = useKeycloak();
    const userId = keycloak.tokenParsed?.sub; // sub - это стандартное поле для идентификатора пользователя

  const [state, setState] = useState({
    currentStep: 1,
    show: false,
    form: 0,
    fileUpload: false,
    wizartUserId: userId,
    employeeName: '',
    agentName: '',
    sex: 'Женский',
    role: '',
    behaviorSettings: '',
    pointOfDialog: '',
    companyName: '',
    business: '',
    companyValues: '',
    knowledgeBase: [],
    dialogStages: [],
    dialogExample: [],
    welcomeMessages: [],
  });

  const [infoSaved, setInfoSaved] = useState(false);

  const setForm = (n) => {
    setState(prevState => ({ ...prevState, form: n }));
  };

  const updateData = (event) => {
    const { name, value } = event?.target || event;
    setState(prevState => ({ ...prevState, [name]: value }));
  };

  const submitData = () => {
    const data = {
      userId: state.wizartUserId,
      employeeName: state.employeeName,
      agentName: state.agentName,
      sex: state.sex || 'Женский',
      role: state.role,
      behaviorSettings: state.behaviorSettings,
      pointOfDialog: state.pointOfDialog,
      companyName: state.companyName,
      business: state.business,
      companyValues: state.companyValues,
      knowledgeBase: state.knowledgeBase,
      dialogStages: state.dialogStages,
      dialogExample: state.dialogExample,
      welcomeMessages: state.welcomeMessages,
    };

    console.log(data);
    fetch(`http://${import.meta.env.VITE_CORE}:5000/subscription/90123`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Успех:', data);
    })
    .catch((error) => {
      console.error('Ошибка:', error);
    });
  };

  const GetForm = (n) => {
    switch (n) {
      case 1:
        return (
          <div>
            <input type="text" className="form-text-input" placeholder='Введите текст...' />
            <div className="save-clear-buttons">
              <button className="clear-button" onClick={() => { document.querySelector(".form-text-input").value = "" }}>Очистить</button>
              <button className="save-button">Сохранить</button>
            </div>
          </div>
        );
      case 2:
        return (
          <div>
            <div className="file-upload">
              <h3>Загрузка файлов</h3>
              <p>Форматы файла: pdf, html, doc,txt, xlv.Не более 10 МБ</p>
              <button>Прикрепить файл<img src="/public/Clip.svg" alt="" /></button>
              <input className="file-upload-input" type="file" />
            </div>
            <div className="save-clear-buttons">
              <button className="clear-button" onClick={() => { document.querySelector(".file-upload-input").value = "" }}>Очистить</button>
              <button className="save-button" onClick={() => { showModal(true) }}>Сохранить</button>
            </div>
          </div>
        );
      case 3:
        return (
          <div>
            <input type="text" className="form-link-input" placeholder='Вставить ссылку' />
            <div className="save-clear-buttons">
              <button className="clear-button" onClick={() => { document.querySelector(".form-link-input").value = "" }}>Очистить</button>
              <button className="save-button">Сохранить</button>
            </div>
          </div>
        );
      default:
        return <div className="kostil"></div>;
    }
  };

  const EmployeeCreation = () => {
    const first_step = (
      <div className="employee-creation">
        <h3>Информация о сотруднике</h3>
        <div className="info-extended">
          ИИ-сотрудник будет активно участвовать в беседах, обрабатывать сообщения пользователей,
          генерировать ответы и выполнять действия в соответствии с поставленной задачей
          и настройкой поведения.
        </div>
        <div className="inputFields">
          <div className="inputField">
            <div>Название сотрудника<img src="/Danger Circle.svg" alt="" className="input-describe" /></div> <br />
            <input type="text" name="employeeName" onChange={updateData} className="employeeInfo" />
          </div>
          <div className="inputField">
            <div>Имя агента<img src="/Danger Circle.svg" alt="" className="input-describe" /></div> <br />
            <input type="text" name="agentName" onChange={updateData} className="employeeInfo" />
          </div>
          <div className="inputField">
            <div>Пол<img src="/Danger Circle.svg" alt="" className="input-describe" /></div> <br />
            <div className="radio-sex">
              <button className="sex" id='male' onClick={() => {
                document.getElementById("female").classList.remove("choosen");
                document.getElementById("male").classList.add("choosen");
                setState(prevState => ({ ...prevState, sex: 'Мужской' }));
              }}>
                Мужской
              </button>
              <button className="sex choosen" id='female' onClick={() => {
                document.getElementById("male").classList.remove("choosen");
                document.getElementById("female").classList.add("choosen");
                setState(prevState => ({ ...prevState, sex: 'Женский' }));
              }}>
                Женский
              </button>
            </div>
          </div>
          <div className="inputField">
            <div>Роль сотрудника в компании<img src="/Danger Circle.svg" alt="" className="input-describe" /></div> <br />
            <input type="text" name="role" onChange={updateData} className="employeeInfo role" />
          </div>
          <div className="inputField">
            <div>Настройка поведения агента<img src="/Danger Circle.svg" alt="" className="input-describe" /></div><br />
            <input type="text" name="behaviorSettings" onChange={updateData} className="employeeInfo behavior-settings" />
          </div>
          <div className="inputField">
            <div>Цель диалога<img src="/Danger Circle.svg" alt="" className="input-describe" /></div> <br />
            <input type="text" name="pointOfDialog" onChange={updateData} className="employeeInfo point-of-dialog" />
          </div>
        </div>
      </div>
    );

    const second_step = (
      <div>
        <h3>Информация о компании</h3>
        <div className="info-extended">
          Используйте ИИ-сотрудников в диалогах с клиентами
        </div>
        <div className="inputFields">
          <div className="inputField">
            <div>Название компании<img src="/Danger Circle.svg" alt="" className="input-describe" /></div> <br />
            <input type="text" name="companyName" onChange={updateData} className="employeeInfo" />
          </div>
          <div className="inputField">
            <div>Бизнес компании<img src="/Danger Circle.svg" alt="" className="input-describe" /></div> <br />
            <input type="text" name="business" onChange={updateData} className="employeeInfo" />
          </div>
          <div className="inputField">
            <div>Ценности компании<img src="/Danger Circle.svg" alt="" className="input-describe" /></div> <br />
            <input type="text" name="companyValues" onChange={updateData} className="employeeInfo role" />
          </div>
          <div className="inputField">
            <div>Роль сотрудника в компании<img src="/Danger Circle.svg" alt="" className="input-describe" /></div><br />
            <input type="text" name="role" onChange={updateData} className="employeeInfo behavior-settings" />
          </div>
          <div className="inputField">
            <div>Настройка поведения агента<img src="/Danger Circle.svg" alt="" className="input-describe" /></div> <br />
            <input type="text" name="behaviorSettings" onChange={updateData} className="employeeInfo point-of-dialog" />
          </div>
        </div>
        <div className="knowledge-base">
          <div className="knowledge-text">
            <h3>База знаний</h3>
            <div className="info-extended">
              Источник знаний о вашей компании для ИИ-сотрудника. Это могут быть сведения о
              товарах и услугах, ответы на FAQ или любая информация, которой должен владеть
              ИИ-сотрудник при общении с клиентом
            </div>
          </div>
          <div>
            <h4>Загруженные знания {state.knowledgeBase.length} из 5</h4>
            <div className="second-step-button-div open-file">
              <button className="second-step-button-button open-file">
                Открыть файл
                <img className="icon-files" src="/public/OpenFile.svg" alt="" />
              </button>
            </div>
          </div>
          <div className='add-knowledge'>
            <h4>Добавить знания</h4>
            <div className="second-step-button-div formatted-text-button-div">
              <button id="formatted-text" className="second-step-button-button formatted-text-button"
                onClick={() => {
                  document.getElementById("formatted-text").classList.add("active-1");
                  document.getElementById("text-document").classList.remove("active-1");
                  document.getElementById("link-button").classList.remove("active-1");
                  setForm(1);
                }}>
                Форматированный текст
                <img className="icon-files" src="/public/Text.svg" alt="" />
              </button>
            </div>
            <div className="second-step-button-div text-document-button-div">
              <button id="text-document" className="second-step-button-button text-document-button"
                onClick={() => {
                  document.getElementById("formatted-text").classList.remove("active-1");
                  document.getElementById("text-document").classList.add("active-1");
                  document.getElementById("link-button").classList.remove("active-1");
                  setForm(2);
                }}>
                Текстовый документ
                <img className="icon-files" src="/public/Document.svg" alt="" />
              </button>
            </div>
            <div className="second-step-button-div link-button-div">
              <button id="link-button" className="second-step-button-button link-button"
                onClick={() => {
                  document.getElementById("formatted-text").classList.remove("active-1");
                  document.getElementById("text-document").classList.remove("active-1");
                  document.getElementById("link-button").classList.add("active-1");
                  setForm(3);
                }}>
                Ссылка на Google документ
                <img className="icon-files" src="/public/Link.svg" alt="" />
              </button>
            </div>
            <div id="knowledge-form" className="knowledge-form">
              {GetForm(state.form)}
            </div>
          </div>
        </div>
      </div>
    );

    const third_step = (
      <div className="third-step">
        <div className="stages-container">
          <h3>Настройка этапов диалога</h3>
          <div className="info-extended">
            Описание поведение ИИ — агента на каждом этапе диалога с клиентом
          </div>
          <Link className="how-to-fill">Как заполнить этап?</Link>
          <DialogStages onUpdate={updateData}></DialogStages>
        </div>
        <div className="dialog-examples-container">
          <h3>Пример диалога</h3>
          <div className="info-extended">
            Пример диалога из 10 — 15 сообщений для обучения ИИ агента
          </div>
          <Link className="examples-link">Посмотреть примеры диалогов</Link>
          <DialogExamples onUpdate={updateData}></DialogExamples>
        </div>
        <div className="greetings-messages-container">
          <h3>Варианты приветственных сообщений</h3>
          <div className="info-extended">
            Сообщения, с которых ИИ — агент начинает диалог. Используются в рассылках, отправляются в
            неизменном виде и чередуются от пользователя к пользователю.Рекомендуемое максимальное количество сообщений — 2
          </div>
          <Link className="greetings-examples-link">Посмотреть примеры приветственных сообщений</Link>
          <Greetings onUpdate={updateData} ></Greetings>
        </div>
      </div>
    );

    const fourth_step = <div>Интеграция</div>;
    const fifth_step = <div>Воронка</div>;
    const sixth_step = <div>Каналы</div>;

    switch (state.currentStep) {
      case 1:
        return first_step;
      case 2:
        return second_step;
      case 3:
        return third_step;
      case 4:
        return fourth_step;
      case 5:
        return fifth_step;
      case 6:
        return sixth_step;
      default:
        return null;
    }
  };

  const nextStep = () => {
    const prev_step_id = state.currentStep + "-step";
    const next_step_id = (state.currentStep + 1) + "-step";
    document.getElementById(prev_step_id).classList.remove("cur_step");
    document.getElementById(next_step_id).classList.add("cur_step");
    setState(prevState => ({ ...prevState, currentStep: state.currentStep + 1 }));
  };

  const showModal = (isFile = false) => {
    setInfoSaved(true);
    setState(prevState => ({ ...prevState, show: true, fileUpload: isFile }));
    document.getElementById("overlay").classList.toggle("faded");
  };

  const hideModal = () => {
    setState(prevState => ({ ...prevState, show: false, fileUpload: false }));
    document.getElementById("overlay").classList.toggle("faded");
  };

  const isLastStep = state.currentStep === 6;

  return (
    <div id="employee-creation">
      <ul className="search-and-buts-row">
        <li className="search-and-buts search">
          <input type="text" className="input" placeholder="type here..." />
        </li>
        <li className="search-and-buts buts">
          <button type="button" className="but notification"></button>
          <button type="button" className="but account"></button>
        </li>
      </ul>
      <div className="h_line"></div>
      <div className="links">
        <Link to="/employees" className='link'>
          Сотрудники
        </Link>
        <img src="/public/linkarrow.svg" alt="" />
        <Link to="/employees/new_employee" className='link currentPage'>
          Создать сотрудника
        </Link>
      </div>
      <ul className="card-row steps">
        <li id="1-step" className="card-column cur_step">
          <div className="step">
            1
            <br /><br />
            Настройки агента
          </div>
        </li>
        <li id="2-step" className="card-column">
          <div className="step">
            2
            <br /><br />
            База знаний
          </div>
        </li>
        <li id="3-step" className="card-column">
          <div className="step">
            3
            <br /><br />
            Этапы диалога
          </div>
        </li>
        <li id="4-step" className="card-column">
          <div className="step">
            4
            <br /><br />
            Интеграция
          </div>
        </li>
        <li id="5-step" className="card-column">
          <div className="step">
            5
            <br /><br />
            Воронка
          </div>
        </li>
        <li id="6-step" className="card-column">
          <div className="step">
            6
            <br /><br />
            Каналы
          </div>
        </li>
      </ul>
      <div className="info-container">
        {EmployeeCreation()}
        <div className="save-next-buttons">
          <button className="save" onClick={showModal}>Сохранить</button>
          {isLastStep ? (
            <button className="submit-data" onClick={submitData}>Создать сотрудника</button>
          ) : (
            <button className="next-step" onClick={nextStep}>Следующий шаг</button>
          )}
        </div>
      </div>
      <div id="overlay" className="overlay"></div>
      <PopupSaving show={state.show} status={infoSaved} onClose={hideModal} isFile={state.fileUpload} />
    </div>
  );
}

export default NewEmployeePage;