import React from 'react';

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
  }

  updateSender = (index, sender) => {
    this.setState(prevState => {
      const updatedDialogData = prevState.dialogData.map((dialog, i) =>
        i === index ? { ...dialog, sender } : dialog
      );

      this.props.onUpdate({ name: 'dialogExample', value: updatedDialogData });

      return { dialogData: updatedDialogData };
    });
  };

  handleChange = (event, index) => {
    const { value } = event.target;

    this.setState(prevState => {
      const updatedDialogData = prevState.dialogData.map((dialog, i) =>
        i === index ? { ...dialog, message: value } : dialog
      );

      const transformedData = updatedDialogData.map(dialog => ({
        role: dialog.sender,
        content: dialog.message
      }));

      this.props.onUpdate({ name: 'dialogExample', value: transformedData });

      return { dialogData: updatedDialogData };
    });
  };

  addDialog = () => {
    this.dialogsCount += 1;
    const newDialog = {
      sender: "Открыть список",
      message: ""
    };

    this.setState(prevState => ({
      dialogData: [...prevState.dialogData, newDialog]
    }));
  };

  toggleDropdown = (index) => {
    document.getElementById(`dropdownContent-${index}`).classList.toggle("show");
  };

  renderDialog = (dialog, index) => (
    <div className="dialog" key={index}>
      <div className="sender">
        Отправитель
        <input
          type="button"
          value={dialog.sender}
          className="dropdownButton"
          onClick={() => this.toggleDropdown(index)}
        />
        <div id={`dropdownContent-${index}`} className="dropdown-content">
          <a onClick={() => this.updateSender(index, "ИИ агент")}>ИИ агент</a>
          <a onClick={() => this.updateSender(index, "Пользователь")}>Пользователь</a>
        </div>
      </div>
      <div className="message">
        Сообщение
        <input
          type="text"
          className="message-input"
          value={dialog.message}
          onChange={(e) => this.handleChange(e, index)}
        />
      </div>
    </div>
  );

  render() {
    return (
      <div className="dialogs">
        {this.state.dialogData.map((dialog, index) => this.renderDialog(dialog, index))}
        <button className="add-dialog" onClick={this.addDialog}>+ Добавить диалог</button>
      </div>
    );
  }
}

export default DialogExamples;