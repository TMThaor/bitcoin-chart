import { useEffect, useRef } from "react";
import {
  createChart,
  CandlestickData,
  CandlestickSeries,
  HistogramSeries,
} from "lightweight-charts";

interface CandleStickChartProps {
  data: CandlestickData[];
  theme: string; // Nhận theme từ props
}

function DisplayChart(props: CandleStickChartProps) {
  const chartContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;
    const backgroundColor = props.theme === "dark" ? "#1e1e1e" : "white";
    const textColor = props.theme === "dark" ? "white" : "black";
    // Khởi tạo biểu đồ
    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: chartContainerRef.current.clientHeight,
      layout: {
        textColor: textColor,
        background: { color: backgroundColor },
      },

      rightPriceScale: {
        borderColor: "#0ca63f",
      },
      leftPriceScale: {
        borderColor: "#ccc",
      },
      timeScale: {
        timeVisible: true,
        fixLeftEdge: true,
        fixRightEdge: true,
        lockVisibleTimeRangeOnResize: true,
      },
    });

    // Tạo Candle Stick Chart
    const candlestickSeries = chart.addSeries(CandlestickSeries, {
      upColor: "#26a69a",
      downColor: "#ef5350",
      borderVisible: false,
      wickUpColor: "#26a69a",
      wickDownColor: "#ef5350",
    });

    candlestickSeries.priceScale().applyOptions({
      scaleMargins: {
        top: 0.1,
        bottom: 0.3,
      },
    });
    candlestickSeries.setData(props.data);

    // Tạo Volume Chart
    const volumeSeries = chart.addSeries(HistogramSeries, {
      color: "#26a69a",
      priceFormat: {
        type: "volume",
      },
      priceScaleId: "",
    });
    volumeSeries.priceScale().applyOptions({
      scaleMargins: {
        top: 0.7, // highest point of the series will be 70% away from the top
        bottom: 0,
      },
    });
    volumeSeries.setData(props.data);

    // Cleanup khi component unmount
    return () => {
      chart.remove();
    };
  }, [props.data, props.theme]);

  return (
    <div
      ref={chartContainerRef}
      style={{ position: "relative", width: "100%", height: "400px" }}
    />
  );
}

export default DisplayChart;
