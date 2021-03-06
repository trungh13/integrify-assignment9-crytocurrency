import React,{PureComponent} from 'react'
import styles from "./index.css";

export class Ticker extends PureComponent {  
  render(){
    const data=this.props.data;
    const dataIconSrc = "https://s2.coinmarketcap.com/static/img/coins/32x32/";
    const dataLink="https://coinmarketcap.com/currencies/"
    return (
    <div className={[styles.Ticker,styles[this.props.displayType]].join(" ")}>
      <div className={[styles.TickerHeader,styles[this.props.displayType]].join(" ")}>
        <div className={[styles.TickerHeaderName,styles[this.props.displayType]].join(" ")}>
          <img className={styles.TickerHeaderNameIcon} src={`${dataIconSrc}${data.id}.png`} alt=""/>
          <a className={styles.TickerHeaderNameSymbol} href={`${dataLink}${data.name}`}>{data.symbol}</a>
          <p className={styles.TickerHeaderNameName}>({data.name})</p>
        </div>
        <div className={styles.TickerHeaderRank}>{data.rank}</div>
      </div>
      <div className={[styles.TickerContent,styles[this.props.displayType]].join(" ")}>
        <div className={styles.TickerContentPriceUSD}>{`USD : ${data.quotes.USD.price}`}</div>
        <div className={styles.TickerContentPriceBTC}>{`BTC : ${data.quotes.BTC.price}`}</div>
        <div className={styles.TickerContentChange1h}>{`Change in 1h : ${data.quotes.USD.percent_change_1h}% `}
        {data.quotes.USD.percent_change_1h>=0?<i className={["fas fa-caret-up",styles["up"]].join(" ")}></i>: <i className={["fas fa-caret-down",styles["down"]].join(" ")}></i>}
        </div>
        <div className={styles.TickerContentChange24h}>{`Change in 24h : ${data.quotes.USD.percent_change_24h}% `} 
        {data.quotes.USD.percent_change_24h>=0?<i className={["fas fa-caret-up",styles["up"]].join(" ")}></i>: <i className={["fas fa-caret-down",styles["down"]].join(" ")}></i>}
        </div>
      </div>
    </div>
  )}
}

export default Ticker

