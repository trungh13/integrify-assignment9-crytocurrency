import React from 'react'
import styles from "./index.css";

const dataIconSrc = "https://s2.coinmarketcap.com/static/img/coins/16x16/";
const dataLink="https://coinmarketcap.com/currencies/"

const Ticker = (props) => {
  const data=props.data
  return (
    <div className={styles.Ticker}>
      <div className={styles.TickerHeader}>
        <div className={styles.TickerHeaderName}>
          <img className={styles.TickerHeaderNameIcon} src={`${dataIconSrc}${data.id}.png`} alt=""/>
          <a className={styles.TickerHeaderNameSymbol} href={`${dataLink}${data.name}`}>{data.symbol}</a>
          <p className={styles.TickerHeaderNameName}>({data.name})</p>
        </div>
        <div className={styles.TickerHeaderRank}>{data.rank}</div>
      </div>
      <div className={styles.TickerContent}>
        <div className={styles.TickerContentPriceUSD}>{`USD : ${data.quotes.USD.price}`}</div>
        <div className={styles.TickerContentPriceBTC}>{`BTC : ${data.quotes.BTC.price}`}</div>
        <div className={styles.TickerContentVolume24h}>{`Volume in 24h : ${data.quotes.USD.volume_24h}`}</div>
        <div className={styles.TickerContentChange24h}>{`Change in 24h : ${data.quotes.USD.percent_change_24h}%`}</div>
      </div>
      
    </div>
  )
}

export default Ticker