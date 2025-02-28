import { GetCandles, useLiveCandle } from "@/lib/Binance_API";
import { useEffect, useState } from "react";

const ChartComponent = () => {
  const [timeFrame, setTimeFrame] = useState("1m");
  const [coin, setCoin] = useState("BTCUSDT");
  const historicalData = GetCandles("1m", "BTCUSDT", 1);
  const previousData = historicalData[0];

  // Lấy dữ liệu realtime
  const liveCandle = useLiveCandle(timeFrame, coin);

  useEffect(() => {
    if (liveCandle) {
      console.log("Live Candle:", liveCandle);
    }
  }, [liveCandle]);

  return (
    <div>
      <h2 className="bold">BTC/USDT Chart</h2>
      <h4 className="d-flex">
        <p className="d-inliner">Real-time price: </p>
        <p className="d-inliner text-info">${liveCandle?.close}</p>
      </h4>
      <h4 className="d-flex">
        <p className="d-inliner">Price 1min before: </p>
        <p className="d-inliner text-info">${previousData?.close}</p>
      </h4>
    </div>
  );
};

export default ChartComponent;
