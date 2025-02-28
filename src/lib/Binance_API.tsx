import useSWR from "swr";
import { useState, useEffect } from "react";
export type ICandleStick = {
  openTime: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  closeTime: number;
  baseAssetVolume: number;
  numberOfTrades: number;
  takerBuyVolume: number;
  takerBuyBaseAssetVolume: number;
  ignore: number;
};

/**
 * Fetch candlestick data from Binance API
 * @param currentTimeFrame Time interval (e.g., 1m, 5m, 30m)
 * @param currentCoin Cryptocurrency symbol (e.g., BTCUSDT)
 * @returns Array of candlestick data
 */
export const GetCandles = (
  currentTimeFrame: string,
  currentCoin: string,
  limit: number
) => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, isLoading } = useSWR(
    `https://api.binance.com/api/v3/klines?symbol=${currentCoin}&interval=${currentTimeFrame}&limit=${limit}`,
    fetcher
  );
  if (!data || isLoading) return [];
  return data?.map((item: string) => ({
    time: parseFloat(item[0]) / 1000,
    open: parseFloat(item[1]),
    high: parseFloat(item[2]),
    low: parseFloat(item[3]),
    close: parseFloat(item[4]),
    value: parseFloat(item[5]),
    closeTime: item[6],
    baseAssetVolume: parseFloat(item[7]),
    numberOfTrades: item[8],
    takerBuyVolume: parseFloat(item[9]),
    takerBuyBaseAssetVolume: parseFloat(item[10]),
    ignore: parseFloat(item[11]),
  }));
};

/**
 * Get live candlestick data from Binance WebSocket
 * @param currentTimeFrame Time interval (e.g., 1m, 5m, 30m)
 * @param currentCoin Cryptocurrency symbol (e.g., BTCUSDT)
 * @returns WebSocket URL
 */
export const GetLiveCandleLink = (
  currentTimeFrame: string,
  currentCoin: string
) => {
  return `wss://stream.binance.com:9443/ws/${currentCoin.toLowerCase()}@kline_${currentTimeFrame}`;
};
export const useLiveCandle = (
  currentTimeFrame: string,
  currentCoin: string
) => {
  const [liveCandle, setLiveCandle] = useState<ICandleStick | null>(null);

  useEffect(() => {
    const ws = new WebSocket(
      `wss://stream.binance.com:9443/ws/${currentCoin.toLowerCase()}@kline_${currentTimeFrame}`
    );

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      const k = message.k; // Kline data từ Binance WebSocket
      const newCandle: ICandleStick = {
        openTime: k.t,
        open: parseFloat(k.o),
        high: parseFloat(k.h),
        low: parseFloat(k.l),
        close: parseFloat(k.c),
        volume: parseFloat(k.v),
        closeTime: k.T,
        baseAssetVolume: parseFloat(k.q),
        numberOfTrades: k.n,
        takerBuyVolume: parseFloat(k.V),
        takerBuyBaseAssetVolume: parseFloat(k.Q),
        ignore: 0,
      };
      setLiveCandle(newCandle);
    };

    return () => {
      ws.close();
    };
  }, [currentTimeFrame, currentCoin]);

  return liveCandle;
};

/**
 * Convert Unix timestamp to human-readable date
 * @param unix Unix timestamp (milliseconds)
 * @returns Formatted date string
 */
export const unixToDate = (unix: number) => {
  return new Date(unix).toLocaleString();
};
