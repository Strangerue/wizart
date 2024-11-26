import React from 'react';

class DialogStages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      container: [
        <div className="stage" key={1}>
          Этап 1
          <input
            type="text"
            id={"stage-input-" + 1}
            className="stage-input"
            onChange={this.handleChange}
            data-step={1}
          />
        </div>
      ],
      stageData: [
        {
          step: 1,
          value: ""
        }
      ]
    };
    this.stagesCount = 1;
    this.addStage = this.addStage.bind(this);
    this.clearStages = this.clearStages.bind(this);
  }

  handleChange = (event) => {
    const { value } = event.target;
    const step = parseInt(event.target.getAttribute('data-step'), 10);

    this.setState(prevState => {
      const updatedStageData = prevState.stageData.map(stage =>
        stage.step === step ? { ...stage, value } : stage
      );
      this.props.onUpdate({ name: 'dialogStages', value: updatedStageData });
      return { stageData: updatedStageData };
    });
  };

  addStage() {
    this.stagesCount += 1;
    const n = this.stagesCount;

    const newStageElement = (
      <div className="stage" key={n}>
        Этап {n}
        <input
          type="text"
          id={"stage-input-" + n}
          className="stage-input"
          onChange={this.handleChange}
          data-step={n}
        />
      </div>
    );

    const newStageData = {
      step: n,
      value: ""
    };

    this.setState(prevState => ({
      stageData: prevState.stageData.concat(newStageData),
      container: prevState.container.concat(newStageElement)
    }));
  }

  clearStages() {
    this.stagesCount = 1;
    this.setState({
      container: [
        <div className="stage" key={1}>
          Этап 1
          <input
            type="text"
            id={"stage-input-" + 1}
            className="stage-input"
            onChange={this.handleChange}
            data-step={1}
          />
        </div>
      ],
      stageData: [
        {
          step: 1,
          value: ""
        }
      ]
    });
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

export default DialogStages;