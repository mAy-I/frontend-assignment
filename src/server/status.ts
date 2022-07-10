import { Status } from "./types";

// 약 10%의 확률로 에러 또는 지연 중인 상태를 리턴
const status = Array<Status>(10).fill("SUCCESS");
status[0] = "ERROR";
status[1] = "IN_PROGRESS";

export const getStatus = (): Status => {
  const index = Math.round(Math.random() * status.length);
  return status[index];
};
