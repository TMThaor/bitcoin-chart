"use client";
// import Image from "next/image";
// import styles from "./page.module.css";
import DisplayChart from "@/components/app.chart";
import { GetCandles } from "@/lib/Binance_API";
import ChangeTimeFrame from "@/components/app.button";
import { useState } from "react";
import AppHeader from "@/components/app.header";
import { useTheme } from "@/components/ThemeContext";
import SideBar from "@/components/app.sidebar";
import { Container, Row, Col } from "react-bootstrap";

// Hàm xử lý khi nút bấm được chọn

export default function Home() {
  const [selectedButton, setSelectedButton] = useState<string>("1d");
  const handleButtonChange = (buttonId: string) => {
    setSelectedButton(buttonId);
  };

  const { theme } = useTheme(); // Nhận theme từ Context
  const data = GetCandles(selectedButton, "BTCUSDT", 500);
  return (
    <Container className="main">
      <AppHeader></AppHeader>
      <div className="content">
        <div className="changeTimeFrame">
          <ChangeTimeFrame
            selectedButton={selectedButton}
            onButtonClick={handleButtonChange}
          ></ChangeTimeFrame>
        </div>
        <Container>
          <Row>
            <Col md={5} xs={12} className="">
              <SideBar></SideBar>
            </Col>
            <Col md={7} xs={12} className="">
              <DisplayChart data={data} theme={theme} />
            </Col>
          </Row>
        </Container>
      </div>
    </Container>
  );
}
