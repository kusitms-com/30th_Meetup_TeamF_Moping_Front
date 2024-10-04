// src/app/api/auth/_log/route.ts

import { NextApiRequest, NextApiResponse } from "next";
import winston from "winston";

// Winston 로거 설정
const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(), // 콘솔에 로그를 출력
    new winston.transports.File({ filename: "logs/error.log", level: "error" }),
    new winston.transports.File({ filename: "logs/combined.log" }),
  ],
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const logData = req.body; // JSON을 파싱하여 logData에 할당

    // Winston 로거를 사용하여 로그 데이터 기록
    logger.info("Log data received:", logData);

    // 성공적으로 로그가 기록되었음을 응답
    return res.status(200).json({ message: "Log recorded successfully" });
  } catch (error) {
    logger.error("Failed to record log:", error);
    return res.status(500).json({ error: "Failed to record log" });
  }
}
