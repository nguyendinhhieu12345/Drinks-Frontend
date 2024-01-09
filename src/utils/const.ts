export const formatCurrency = (value: number): string => {
  return value.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
};

export const convertTime = (value: number): string => {
  return value / 60 / 60 < 1
    ? `${value / 60} phút`
    : `${Math.floor(value / 60 / 60)} giờ ${
        value / 60 - Math.floor(value / 60) * 60
      } phút`;
};

export const convertTimeToTemplate = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  let formattedTime: string;
  if (hours === 0) {
    formattedTime = `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  } else {
    formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  }
  return formattedTime;
};

export const formatTimeStamp = (utcTimestamp: string): string => {
  const date = new Date(utcTimestamp);
  const localDateString = date.toLocaleString("en-US", {
    timeZone: "Asia/Ho_Chi_Minh",
  });
  return localDateString;
};

export const formatBirthDay = (utcTimestamp: string): string => {
  const date = new Date(utcTimestamp);
  const localDateString = date.toLocaleString("en-US", {
    timeZone: "Asia/Ho_Chi_Minh",
  });
  return localDateString.split(",")[0];
};
