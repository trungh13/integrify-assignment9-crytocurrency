import React from "react";
import styles from "./index.css";

import Ticker from "./Ticker";

const ComponentMain = props => {
  const renderList = data =>
    data.map((element) => <Ticker data={element} key={element.id} displayType={props.displayType}/>);

  return (
    <div
      className={[styles.ComponentMain, styles[props.displayType],styles[props.fixedHeader]].join(" ")}>
      {renderList(props.renderData)}
    </div>
  );
};

export default ComponentMain;
