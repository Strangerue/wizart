import React from 'react';
import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css'

let visitors = 1234;
let leads = 123;
let proccessedLeads = 45;
let clicks = 45;
let conversion = 67;
let denies = 10;

class Employee {
  name = ""
  type = ""
  status = ""
  isActive = ""
  avatar = ""
}

function selection(id) {
  try {
    for (let [key, value] of Object.entries(document.getElementsByClassName("menu-button"))) {
      value.className = "menu-button";
      console.log(value);
    }
    if (!document.getElementById(id).classList.contains("active"))
      document.getElementById(id).className += " active";
  } catch {

  }
}

function HomePage() {
  selection("home");

  return (
    <div>
      <div>
        <ul className="stat-and-date-row">
          <li className="stat-and-date header"><h2>Statistics</h2></li>
          <li className="stat-and-date date">Date</li>
        </ul>
        <ul className="card-row">
          <li className="card-column">
            <div className="card-text">Visits</div>
            <div className="card-content">{visitors}</div>
          </li>
          <li className="card-column">
            <div className="card-text">Leads</div>
            <div className="card-content">{leads}</div>
          </li>
          <li className="card-column">
            <div className="card-text">Proccessed leads</div>
            <div className="card-content">{proccessedLeads}</div>
          </li>
          <li className="card-column">
            <div className="card-text">Clicks</div>
            <div className="card-content">{clicks}</div>
          </li>
          <li className="card-column">
            <div className="card-text">Conversion</div>
            <div className="card-content">{conversion}</div>
          </li>
          <li className="card-column">
            <div className="card-text">Denies</div>
            <div className="card-content">{denies}</div>
          </li>
        </ul>
      </div>
    </div>
  )
}

function ProjectsPage() {
  selection("projects");
  return <div>Страница "Projects"</div>;
}


function EmployeeTable() {


  return (
    <div className="employees">
      <ul>

      </ul>
    </div>
  );
}


function EmployeesPage() {
  selection("employees");
  return (
    <div>
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
      <div className="employ-header">
        Welcome, Name
        <Link to="/employees/new_employee">
          <button type="button" className="add-employee">
            <img src="/public/Usersgroup.svg" align="absmiddle" className="icon" />
            Add an employee
          </button>
        </Link>
      </div>
      <EmployeeTable></EmployeeTable>
    </div>
  )
}

function PopupSaving({ show, status, onClose, isFile = false }) {
  let a = <div></div>
  if (status) {
    if (isFile == true) {
      a = <div>
        <img className="modal-success" src="/FileUploaded.svg" alt="" />
        <button className="modal-confirm" onClick={onClose}>
          Продолжить
        </button>
      </div>
    } else {
      a = <div>
        <img className="modal-success" src="/SavingSuccess.svg" alt="" />
        <button className="modal-confirm" onClick={onClose}>
          Продолжить
        </button>
      </div>
    }
  } else {
    if (isFile == true) {
      a = <div>
        <img className="modal-fail" src="/UploadingFailed.svg" alt="" />
        <button className="modal-close-1" onClick={onClose}>
          Вернуться
        </button>
        <button className="modal-close" onClick={onClose}>
          Продолжить
        </button>
      </div>
    } else {
      a = <div>
        <img className="modal-fail" src="/SavingFail.svg" alt="" />
        <button className="modal-close" onClick={onClose}>
          Закрыть
        </button>
      </div>
    }

  }
  if (show) {
    return (
      <div className="modal-save">
        <div className="modal-content">
          {a}
        </div>
      </div>
    )
  }
}

function getKnowledge() {
  return [1, 2] //here we can get loaded files from place where we keep them
}

class DialogStages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      container:
        [
          <div className="stage" key={1}>
            Этап 1
            <input type="text" id={"stage-input-" + 1} className="stage-input" onChange={this.handleChange} data-step={1} />
          </div>
        ],
      stageData: [
        {
          step: 1,
          value: ""
        }
      ]
    }
    this.stagesCount = 1;
    this.addStage = this.addStage.bind(this);
    this.clearStages = this.clearStages.bind(this);
   // this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (event) => {
    const value = event.target.value;
    const step = parseInt(event.target.getAttribute('data-step'));

    this.setState(prevState => {
      const updatedStageData = prevState.stageData.map(stage => 
        stage.step === step ? { ...stage, value: value } : stage
      );
      this.props.onUpdate({name: 'dialogStages', value: updatedStageData});
      return { stageData: updatedStageData };
    });
  }
  
  addStage() {
    this.stagesCount += 1;
    let n = this.stagesCount;
    let elem = [
      <div className="stage" key={n}>
        Этап {n}
        <input type="text" id={"stage-input-" + n} className="stage-input" onChange={this.handleChange} data-step={n} />
      </div>
      
    ]
    const newStage = [
      {
        step: n,
        value: ""
      }
    ]

    this.setState(prevState => ({
      ...prevState,
      stageData: prevState.stageData.concat(newStage),
      container: prevState.container.concat(elem)
    }));  }

  clearStages() {
    this.stagesCount = 0;
    this.state.container = [];
    this.addStage()
  }

  render() {
    return (
      <div>
        <div className="button-row">
          <button className="generate">
            Сгенерировать с ИИ
          </button>
          <button className="clear" onClick={this.clearStages}>
            Очистить<img src="/CloseCircle.svg" alt="" />
          </button>
        </div>
        <div className="stages">
          {this.state.container}
          <button className="add-stage" onClick={this.addStage}>+ Добавить этап</button>
        </div>
      </div>
    );
  }
}

class DialogExamples extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogData: [
        {
          sender: "Открыть список",
          message: ""
        }
      ]
    };

    this.dialogsCount = 1;
    this.addDialog = this.addDialog.bind(this);
    this.updateSender = this.updateSender.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  updateSender(step, sender) {
    this.setState(prevState => {
      const updatedDialogData = prevState.dialogData.map((dialog, index) =>
        index === step - 1 ? { ...dialog, sender: sender } : dialog
      );
  
      this.props.onUpdate({ name: 'dialogExample', value: updatedDialogData });
  
      console.log(updatedDialogData)
      return { dialogData: updatedDialogData };
    });
  }


  handleChange(event, step) {
    const value = event.target.value;
  
    this.setState(prevState => {
      const updatedDialogData = prevState.dialogData.map((dialog, index) =>
        index === step - 1 ? { ...dialog, message: value } : dialog
      );
      const transformedData = updatedDialogData.map(dialog => ({
        role: dialog.sender,
        content: dialog.message
      }));

      this.props.onUpdate({ name: 'dialogExample', value: transformedData });
  
      return { dialogData: updatedDialogData };
    });
  }


  addDialog() {
    this.dialogsCount += 1;
    const newDialog = {
      sender: "Открыть список",
      message: ""
    };

    this.setState(prevState => ({
      dialogData: prevState.dialogData.concat(newDialog)
    }));
  }

  render() {
    return (
      <div className="dialogs">
        {this.state.dialogData.map((dialog, index) => (
          <div className="dialog" key={index + 1}>
            <div className="sender">
              Отправитель
              <input value={dialog.sender} type="button" id={"dropdownButton-" + (index + 1)} className="dropdownButton" onClick={() => {
                document.getElementById("dropdownContent-" + (index + 1)).classList.toggle("show");
              }} />
              <div id={"dropdownContent-" + (index + 1)} className="dropdown-content">
                <a onClick={() => this.updateSender(index + 1, "ИИ агент")}>ИИ агент</a>
                <a onClick={() => this.updateSender(index + 1, "Пользователь")}>Пользователь</a>
              </div>
            </div>
            <div className="message">
              Сообщение
              <input type="text" className="message-input" value={dialog.message} onChange={(e) => this.handleChange(e, index + 1)} />
            </div>
          </div>
        ))}
        <button className="add-dialog" onClick={this.addDialog}>+ Добавить диалог</button>
      </div>
    );
  }
}

class Greetings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        welcomeMessages: [
          "Привет. Меня зовут Владимир, я из агентства  <<Нева>>..."
        ]
    }
    this.GreetsCount = 1;
    this.addGreet = this.addGreet.bind(this);
  }

  handleChange(event, step) {
    const value = event.target.value;
  
    this.setState(prevState => {
      const updateWelcomeMessages = prevState.welcomeMessages.map((message, index) =>
        index === step  ? value : message
      );
  
      this.props.onUpdate({ name: 'welcomeMessages', value: updateWelcomeMessages });
  
      return { welcomeMessages: updateWelcomeMessages };
    });
  }

  addGreet() {
    this.GreetsCount += 1;
    const newWelcomeMessage = "Привет!"

    this.setState(prevState => ({
      welcomeMessages: prevState.welcomeMessages.concat(newWelcomeMessage)
    }));
  }

  render() {
    return (
      <div className="greetings">
        {this.state.welcomeMessages.map((message,index) => (
                <div className="greeting" key={index}>
                <div className="type">
                  Тип
                  <input value="Открыть список" type="button" id={"dropdownButton-greet-" + index} className="dropdownButton" onClick={() => {
                    document.getElementById("dropdownContent-greet-" + index).classList.toggle("show");
                  }} />
                  <div id={"dropdownContent-greet-" + index} className="dropdown-content">
                    <a onClick={() => {
                      document.getElementById("dropdownButton-greet-" + index).value = "ИИ агент";
                    }}>ИИ агент</a>
                    <a onClick={() => {
                      document.getElementById("dropdownButton-greet-" + index).value = "Пользователь";
                    }}>Пользователь</a>
                  </div>
                </div>
                <div className="message">
                  Сообщение
                  <input type="text" placeholder={message} onChange={(e) => this.handleChange(e,index)} className="message-input" />
                </div>
              </div>
        ))}
        <button className="add-greetings" onClick={this.addGreet}>+ Добавить сообщение</button>
      </div>
    );
  }
}

class NewEmployeePage extends React.Component {
  state = {
    currentStep: 1,
    show: false,
    form: 0,
    fileUpload: false,
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
    welcomeMessages: []
  };
  
  constructor(props) {
    super(props);
    this.state = { currentStep: 1, show: false, form: 0, fileUpload: false };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.nextStep = this.nextStep.bind(this);
    this.setForm = this.setForm.bind(this);
    this.GetForm = this.GetForm.bind(this);
    this.submitData = this.submitData.bind(this);
    this.updateData = this.updateData.bind(this);
    this.infoSaved = false;
  }

  setForm(n) {
    this.setState(prevState => ({ ...prevState, form: n }));
  }

  updateData(event) {
    if (event?.target) {
      const { name, value } = event.target;
      this.setState({ [name]: value });  
    } else {
      const { name, value } = event;
      this.setState({ [name]: value });
    }
  }

  submitData() {
    const data = {
      employeeName: this.state.employeeName,
      agentName: this.state.agentName,
      sex: this.state.sex || 'Женский',
      role: this.state.role,
      behaviorSettings: this.state.behaviorSettings,
      pointOfDialog: this.state.pointOfDialog,
      companyName: this.state.companyName,
      business: this.state.business,
      companyValues: this.state.companyValues,
      knowledgeBase: this.state.knowledgeBase,
      dialogStages: this.state.dialogStages,
      dialogExample: this.state.dialogExample,
      welcomeMessages: this.state.welcomeMessages,
    };

    console.log(data)
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
  }

  GetForm(n) {
    if (n == 1) {
      return (
        <div>
          <input type="text" className="form-text-input" placeholder='Введите текст...' />
          <div className="save-clear-buttons">
            <button className="clear-button" onClick={() => { document.querySelector(".form-text-input").value = "" }}>Очистить</button>
            <button className="save-button">Сохранить</button>
          </div>
        </div>
      )
    } else if (n == 2) {
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
            <button className="save-button" onClick={() => { this.showModal(true) }}>Сохранить</button>
          </div>
        </div>
      )
    } else if (n == 3) {
      return (
        <div>
          <input type="text" className="form-link-input" placeholder='Вставить ссылку' />
          <div className="save-clear-buttons">
            <button className="clear-button" onClick={() => { document.querySelector(".form-link-input").value = "" }}>Очистить</button>
            <button className="save-button">Сохранить</button>
          </div>
        </div>
      )
    }
    return <div className="kostil"></div>
  }

  EmployeeCreation() {
    let first_step =
      <div className="employee-creation">
        <h3>Информация о сотруднике</h3>
        <div className="info-extended">
          ИИ-сотрудник будет активно участвовать в беседах, обрабатывать сообщения пользователей,
          генерировать ответы и выполнять действия в соответствии с поставленной задачей
          и настройкой поведения.
        </div>
        <div className="inputFields">
          <div className="inputField">
            <div>Название сотрудника<img src="/Danger Circle.svg" alt="" className="input-describe" /></div> <br />
            <input type="text" name="employeeName" onChange={this.updateData} className="employeeInfo" />
          </div>
          <div className="inputField">
            <div>Имя агента<img src="/Danger Circle.svg" alt="" className="input-describe" /></div> <br />
            <input type="text"name="agentName" onChange={this.updateData}  className="employeeInfo" />
          </div>
          <div className="inputField">
            <div>Пол<img src="/Danger Circle.svg" alt="" className="input-describe" /></div> <br />
            <div className="radio-sex">
              <button className="sex" id='male' onClick={() => {
                document.getElementById("female").classList.remove("choosen");
                document.getElementById("male").classList.add("choosen");
                this.setState({sex: 'Мужской'})
              }}>
                Мужской
              </button>
              <button className="sex choosen" id='female' onClick={() => {
                document.getElementById("male").classList.remove("choosen");
                document.getElementById("female").classList.add("choosen");
                this.setState({sex: 'Женский'})
              }}>
                Женский
              </button>
            </div>
          </div>
          <div className="inputField">
            <div>Роль сотрудника в компании<img src="/Danger Circle.svg" alt="" className="input-describe" /></div> <br />
            <input type="text" name="role" onChange={this.updateData} className="employeeInfo role" />
          </div>
          <div className="inputField">
            <div>Настройка поведения агента<img src="/Danger Circle.svg" alt="" className="input-describe" /></div><br />
            <input type="text" name="behavior" onChange={this.updateData} className="employeeInfo behavior-settings" />
          </div>
          <div className="inputField">
            <div>Цель диалога<img src="/Danger Circle.svg" alt="" className="input-describe" /></div> <br />
            <input type="text" name="pointOfDialog" onChange={this.updateData} className="employeeInfo point-of-dialog" />
          </div>
        </div>
      </div>

    let second_step =
      <div>
        <h3>Информация о компании</h3>
        <div className="info-extended">
          Используйте ИИ-сотрудников в диалогах с клиентами
        </div>
        <div className="inputFields">
          <div className="inputField">
            <div>Название компании<img src="/Danger Circle.svg" alt="" className="input-describe" /></div> <br />
            <input type="text"name="companyName" onChange={this.updateData}  className="employeeInfo" />
          </div>
          <div className="inputField">
            <div>Бизнес компании<img src="/Danger Circle.svg" alt="" className="input-describe" /></div> <br />
            <input type="text" name="business" onChange={this.updateData} className="employeeInfo" />
          </div>
          <div className="inputField">
            <div>Ценности компании<img src="/Danger Circle.svg" alt="" className="input-describe" /></div> <br />
            <input type="text" name="companyValues" onChange={this.updateData} className="employeeInfo role" />
          </div>
          <div className="inputField">
            <div>Роль сотрудника в компании<img src="/Danger Circle.svg" alt="" className="input-describe" /></div><br />
            <input type="text" name="role" onChange={this.updateData} className="employeeInfo behavior-settings" />
          </div>
          <div className="inputField">
            <div>Настройка поведения агента<img src="/Danger Circle.svg" alt="" className="input-describe" /></div> <br />
            <input type="text" name="behavior" onChange={this.updateData} className="employeeInfo point-of-dialog" />
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
            <h4>Загруженные знания {getKnowledge().length} из 5</h4>
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
                  this.setForm(1)
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
                  this.setForm(2)
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
                  this.setForm(3);
                }}>
                Ссылка на Google документ
                <img className="icon-files" src="/public/Link.svg" alt="" />
              </button>
            </div>
            <div id="knowledge-form" className="knowledge-form">
              {this.GetForm(this.state.form)}
              {/* <GetForm n={this.state.form}/> */}
            </div>
          </div>
        </div>
      </div>

    let third_step =
      <div className="third-step">
        <div className="stages-container">
          <h3>Настройка этапов диалога</h3>
          <div className="info-extended">
            Описание поведение ИИ — агента на каждом этапе диалога с клиентом
          </div>
          <Link className="how-to-fill">Как заполнить этап?</Link>
          <DialogStages onUpdate={this.updateData}></DialogStages>
        </div>
        <div className="dialog-examples-container">
          <h3>Пример диалога</h3>
          <div className="info-extended">
            Пример диалога из 10 — 15 сообщений для обучения ИИ агента
          </div>
          <Link className="examples-link">Посмотреть примеры диалогов</Link>
          <DialogExamples onUpdate={this.updateData}></DialogExamples>

        </div>
        <div className="greetings-messages-container">
          <h3>Варианты приветственных сообщений</h3>
          <div className="info-extended">
            Сообщения, с которых ИИ — агент начинает диалог. Используются в рассылках, отправляются в
            неизменном виде и чередуются от пользователя к пользователю.Рекомендуемое максимальное количество сообщений — 2
          </div>
          <Link className="greetings-examples-link">Посмотреть примеры приветственных сообщений</Link>
          <Greetings onUpdate={this.updateData} ></Greetings>
        </div>
      </div>

    let fourth_step =
      <div>

      </div>

    let fifth_step =
      <div>

      </div>

    let sixth_step =
      <div>

      </div>

    switch (this.state.currentStep) {
      case 1:
        return first_step
      case 2:
        return second_step
      case 3:
        return third_step
      case 4:
        return fourth_step
      case 5:
        return fifth_step
      case 6:
        return sixth_step
      default:
        break;
    }
  }

  nextStep() {
    let prev_step_id = this.state.currentStep + "-step";
    this.state.currentStep += 1;
    this.setState(prevState => ({ ...prevState, currentStep: this.state.currentStep }))
    let next_step_id = this.state.currentStep + "-step";
    document.getElementById(prev_step_id).classList.remove("cur_step");
    document.getElementById(next_step_id).classList.add("cur_step");
  }

  showModal(isFile = false) {
    // save info function
    //this.infoSaved = true;
    this.setState(prevState => ({ ...prevState, show: true, fileUpload: isFile }))
    document.getElementById("overlay").classList.toggle("faded");
  }
  hideModal() {
    this.setState(prevState => ({ ...prevState, show: false, fileUpload: false }))
    document.getElementById("overlay").classList.toggle("faded");
  }

  render() {
    const isLastStep = this.state.currentStep === 6;
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
          {this.EmployeeCreation()}
          <div className="save-next-buttons">
            <button className="save" onClick={this.showModal}>Сохранить</button>
            {isLastStep ? (
            <button className="submit-data" onClick={this.submitData}>Создать сотрудника</button>
            ) : (
              <button className="next-step" onClick={this.nextStep}>Следующий шаг</button>
            )}
          </div>
        </div>
        <div id="overlay" className="overlay"></div>
        <PopupSaving show={this.state.show} status={this.infoSaved} onClose={this.hideModal} isFile={this.state.fileUpload} />
      </div>
    )
  }
};

function MailsPage() {
  selection("mails");
  return <div>Страница "Mails"</div>;
}

function BillingPage() {
  selection("billing");
  return <div>Страница "Billing"</div>;
}

function PersPage() {
  selection("digitalpers");
  return <div>Страница "Digital pers"</div>;
}

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <div className="sidebar">
          <img src="" alt="" />
          <h1>LOGO HERE</h1>
          <ul className="menu">
            <li><Link to="/">
              <button type="button" id="home" className="menu-button">
                <img src="/public/Home.svg" align="absmiddle" className="icon" />
                Главная
              </button>
            </Link></li>
            <li><Link to="/projects">
              <button type="button" id="projects" className="menu-button">
                <img src="/public/Category.svg" align="absmiddle" className="icon" />
                Проекты
              </button>
            </Link></li>
            <li><Link to="/employees">
              <button type="button" id="employees" className="menu-button">
                <img src="/public/Usersgroup.svg" align="absmiddle" className="icon" />
                Сотрудники
              </button>
            </Link></li>
            <li><Link to="/mails">
              <button type="button" id="mails" className="menu-button">
                <img src="/public/Send.svg" align="absmiddle" className="icon" />
                Рассылки
              </button>
            </Link></li>
            <li><Link to="/billing">
              <button type="button" id="billing" className="menu-button">
                <img src="/public/Wallet.svg" align="absmiddle" className="icon" />
                Биллинг
              </button>
            </Link></li>
            <li><Link to="/pers">
              <button type="button" id="digitalpers" className="menu-button">
                <img src="/public/authentication.svg" align="absmiddle" className="icon" />
                Цифровые персонажи
              </button>
            </Link></li>
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
        <div id="content" className="content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/employees" element={<EmployeesPage />} />
            <Route path="/employees/new_employee" element={<NewEmployeePage />} />
            <Route path="/mails" element={<MailsPage />} />
            <Route path="/billing" element={<BillingPage />} />
            <Route path="/pers" element={<PersPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

window.onclick = function (event) {
  if (!event.target.matches('.dropdownButton')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    for (var i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

export default App

