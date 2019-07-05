import React from "react";

class Rank extends React.Component {
  constructor() {
    super();
    this.state = {
      emoji: ""
    };
  }

  componentDidMount() {
    this.generateEmoji(this.props.entries);
  }

  componentDidUpdate(prevProps, pervState) {
    if (
      prevProps.entries === this.props.entries &&
      prevProps.name === this.props.name
    ) {
      return null;
    }
    this.generateEmoji(this.props.entries);
  }

  generateEmoji = entries => {
    fetch(`AWS lambda endpoint `)
      .then(response => response.json())
      .then(data => this.setState({ emoji: data.input }))
      .catch(console.log);
  };

  render() {
    return (
      <div className="center">
        <h4 className="white-text">
          {`${this.props.name} your current entry count is ...`}
        </h4>
        <h4 className=" white-text">#{this.props.entries}</h4>
        <h4 className=" white-text">{` Rank Badge: ${this.state.emoji}`}</h4>
      </div>
    );
  }
}

export default Rank;
