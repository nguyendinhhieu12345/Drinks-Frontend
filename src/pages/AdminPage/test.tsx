import axios from "axios";
import React, { useState } from "react";

const Test = () => {
  const [address, setAddress] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const handleAddressChange = (event: any) => {
    setAddress(event.target.value);
  };

  const handleTest = () => {
    if (address.trim() !== "") {
      axios
        .get("https://nominatim.openstreetmap.org/search", {
          params: {
            format: "json",
            q: "thành phố hồ chí minh",
            addressdetails: 1,
          },
        })
        .then((response) => {
          if (response.data.length > 0) {
            const { lat, lon } = response.data[0];
            console.log("Kinh độ:", lon);
            console.log("Vĩ độ:", lat);
          } else {
            console.log("Không tìm thấy địa chỉ.");
          }
        })
        .catch((error) => {
          console.error("Lỗi:", error);
        });
    } else {
      alert("Vui lòng nhập địa chỉ!");
    }
  };

  return (
    <div>
      <h2>Nhập địa chỉ để lấy kinh độ và vĩ độ:</h2>
      <input type="text" value={address} onChange={handleAddressChange} />
      <button onClick={handleTest}>Lấy kinh độ và vĩ độ</button>
      {latitude && longitude && (
        <div>
          <h3>Kinh độ: {latitude}</h3>
          <h3>Vĩ độ: {longitude}</h3>
        </div>
      )}
    </div>
  );
};

export default Test;
