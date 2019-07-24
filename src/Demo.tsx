import React from "react";
import "./App.css";

interface IState {
  text: string;
}

class Demo extends React.Component<{}, IState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      text: "texttexttexttext11"
    };
  }

  render() {
    return <div>
    {this.state.text}
      会默认的保存state里面的东 111西 s112211
    </div>;
  }
}

export default Demo;
