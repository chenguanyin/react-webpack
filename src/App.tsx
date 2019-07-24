import React from "react";
import logo from "./logo.svg";
import Demo from "./Demo";
import "./App.css";
interface IProps {
  num: number;
}
interface IState {
  text: string;
}
class App extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  public readonly state: Readonly<IState> = {
    text: "hello react11"
  };

  render() {
    const { num } = this.props;
    const { text } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            {text}
            {num}
          </a>
          <Demo />
        </header>
      </div>
    );
  }
}

export default App;
