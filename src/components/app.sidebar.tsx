import { GetCandles, useLiveCandle } from "@/lib/Binance_API";
import { useEffect, useState } from "react";

const SideBar = () => {
  const [timeFrame] = useState("1m");
  const [coin] = useState("BTCUSDT");
  const historicalData = GetCandles("1m", "BTCUSDT", 1);
  const previousData = historicalData[0];
  console.log(previousData);
  // Lấy dữ liệu realtime
  const liveCandle = useLiveCandle(timeFrame, coin);

  useEffect(() => {
    if (liveCandle) {
      console.log("Live Candle:", liveCandle);
    }
  }, [liveCandle]);

  return (
    <div>
      <h2 className="bold">BTC/USDT</h2>
      <h4 className="d-flex">
        <p className="d-inliner">Giá thời gian thực: </p>
        <p className="d-inliner text-info">${liveCandle?.close}</p>
      </h4>
      <h4 className="d-flex">
        <p className="d-inliner">Giá 1 phút trước: </p>
        <p className="d-inliner text-info">${previousData?.close}</p>
      </h4>
    </div>
  );
};

export default SideBar;
