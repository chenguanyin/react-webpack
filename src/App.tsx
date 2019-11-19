import React, { lazy, Suspense } from "react";
import { Route, Link, Switch } from "react-router-dom";
import logo from "./logo.svg";
import "./App.scss";

const Demo = lazy(() => import("./Demo"));
const HookTest = lazy(() => import("./HookTest"));
interface IProps {
  num: number;
}
interface IState {
  text: string;
}
class App extends React.Component<IProps, IState> {
  // public readonly state: Readonly<IState> = {
  //   text: "hello react11"
  // };
  private testDemo: React.Ref<HTMLElement> = React.createRef<HTMLElement>();
  private link: any;
  public constructor(props: IProps) {
    super(props);
    this.state = {
      text: "hello react11"
    };
  }

  public componentDidMount() {
    console.log(this.testDemo);
    console.log(this.link);
  }

  public render() {
    const { num } = this.props;
    const { text } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <header ref={this.testDemo}>
            <Link to="/">toHome</Link>&emsp;|&emsp;
            <Link
              to="/hookTest"
              ref={node => {
                this.link = node;
              }}
            >
              to HookTest
            </Link>
          </header>
          <main>
            <Suspense fallback={<div style={{ zIndex: 1000 }}>Loading...</div>}>
              <Switch>
                <Route path="/" exact component={Demo} />
                <Route path="/hookTest" exact component={HookTest} />
              </Switch>
            </Suspense>
          </main>
          {/* <img src={logo} className="App-logo" alt="logo" />
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
          </a> */}
        </header>
      </div>
    );
  }
}

export default App;
