import React from 'react';

class Greetings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      welcomeMessages: [
        "Привет. Меня зовут Владимир, я из агентства <<Нева>>..."
      ]
    };
    this.GreetsCount = 1;
  }

  handleChange = (event, index) => {
    const { value } = event.target;

    this.setState(prevState => {
      const updatedWelcomeMessages = prevState.welcomeMessages.map((message, i) =>
        i === index ? value : message
      );

      this.props.onUpdate({ name: 'welcomeMessages', value: updatedWelcomeMessages });

      return { welcomeMessages: updatedWelcomeMessages };
    });
  };

  addGreet = () => {
    this.GreetsCount += 1;
    const newWelcomeMessage = "Привет!";

    this.setState(prevState => ({
      welcomeMessages: [...prevState.welcomeMessages, newWelcomeMessage]
    }));
  };

  toggleDropdown = (index) => {
    document.getElementById(`dropdownContent-greet-${index}`).classList.toggle("show");
  };

  updateDropdownValue = (index, value) => {
    document.getElementById(`dropdownButton-greet-${index}`).value = value;
  };

  renderGreeting = (message, index) => (
    <div className="greeting" key={index}>
      <div className="type">
        Тип
        <input
          type="button"
          value="Открыть список"
          className="dropdownButton"
          onClick={() => this.toggleDropdown(index)}
        />
        <div id={`dropdownContent-greet-${index}`} className="dropdown-content">
          <a onClick={() => this.updateDropdownValue(index, "ИИ агент")}>ИИ агент</a>
          <a onClick={() => this.updateDropdownValue(index, "Пользователь")}>Пользователь</a>
        </div>
      </div>
      <div className="message">
        Сообщение
        <input
          type="text"
          placeholder={message}
          onChange={(e) => this.handleChange(e, index)}
          className="message-input"
        />
      </div>
    </div>
  );

  render() {
    return (
      <div className="greetings">
        {this.state.welcomeMessages.map(this.renderGreeting)}
        <button className="add-greetings" onClick={this.addGreet}>+ Добавить сообщение</button>
      </div>
    );
  }
}

export default Greetings;