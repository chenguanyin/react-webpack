import React, { useState, useEffect } from "react";
import "./App.scss";

interface IState {
  text: string;
}

class Demo extends React.Component<{}, IState> {
  public constructor(props: {}) {
    super(props);
    this.state = {
      text: "texttexttexttext11"
    };
  }

  public render() {
    return (
      <div>
        {this.state.text}
        会默认的保存state里面的东11西 s112211
      </div>
    );
  }
}

export default Demo;
