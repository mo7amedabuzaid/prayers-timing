import React, { useEffect } from "react";
import Grid from "@mui/material/Grid";
import Divider, { dividerClasses } from "@mui/material/Divider";
import { Stack } from "@mui/material";
import Pray from "./Pray";
import { display, flexbox, justifyContent, width } from "@mui/system";
import img1 from "../assets/images (1).jpg";
import img2 from "../assets/images (2).jpg";
import img3 from "../assets/images (3).jpg";
import img4 from "../assets/images.jpg";
import img5 from "../assets/prayer-and-getting-closer-to-thumbnail-205902.webp";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import { useState } from "react";
import moment from "moment";
import "moment/dist/locale/ar";
import { internal_createExtendSxProp } from "@mui/material/zero-styled";
moment.locale();
const avilableCity = [
  {
    displayname: "القاهرة",
    apiName: "Cairo",
  },
  {
    displayname: "الاسكندريه",
    apiName: "Alexandria",
  },
  {
    displayname: "الجيزة",
    apiName: "Giza",
  },
];
export default function MainContent() {
  const [timer, settimer] = useState("");
  const [timeNowis,settimeNowis]=useState("")
  const [prayerNext, setprayerNext] = useState("");
  let prayerArry = [
    { key: "Fajr", displayname: "الفجر" },
    { key: "Dhuhr", displayname: "الظهر" },
    { key: "Asr", displayname: "العصر" },
    { key: "Sunset", displayname: "المغرب" },
    { key: "Isha", displayname: "العشاء" },
  ];
  async function getData() {
    let res = await axios.get(
      `https://api.aladhan.com/v1/timingsByCity?city=${citySelcted.apiName}&country=Egypt%20Arabia`
    );
    console.log(res.data.data.timings);
    setTimings(res.data.data.timings);
  }
  const [Timings, setTimings] = useState(null);
  const [citySelcted, setCitySelcted] = useState(avilableCity[0]);

  const [timeNow, setTimeNow] = useState("");
  useEffect(() => {
    getData();
  }, [citySelcted]);

  useEffect(() => {
    let interval = setInterval(() => {
      const t = moment();
      setTimeNow(t.format("MMMM Do YYYY, h:mm:ss a"));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  function getDiffTime() {
    if (!Timings) return;
    const momentNow = moment();
    let nextPrayer = null;

    if (
      momentNow.isAfter(moment(Timings["Fajr"], "HH:mm")) &&
      momentNow.isBefore(moment(Timings["Dhuhr"], "HH:mm"))
    ) {
      nextPrayer=1
    } else if (
      momentNow.isAfter(moment(Timings["Dhuhr"], "HH:mm")) &&
      momentNow.isBefore(moment(Timings["Asr"], "HH:mm"))
    ) {
            nextPrayer=2

    } else if (
      momentNow.isAfter(moment(Timings["Asr"], "HH:mm")) &&
      momentNow.isBefore(moment(Timings["Sunset"], "HH:mm"))
    ) {
            nextPrayer=3

    } else if (
      momentNow.isAfter(moment(Timings["Sunset"], "HH:mm")) &&
      momentNow.isBefore(moment(Timings["Isha"], "HH:mm"))
    ) {

      nextPrayer=4

    } else {
            nextPrayer=0
    }
    setprayerNext(nextPrayer)
  
    const nextPrayerObject = prayerArry[nextPrayer];
  const timeTheNextPrayer = Timings[nextPrayerObject.key];
  let nextPrayerMoment = moment(timeTheNextPrayer, "HH:mm");
  const reminingTime = moment(timeTheNextPrayer,"HH:mm").diff(momentNow)
  const duration = moment.duration(reminingTime);
     if(nextPrayer==0&&momentNow.isAfter(moment(Timings["Isha"],"HH:mm"))){
    nextPrayerMoment.add(1,"day")
     }
     const hour = duration.hours()
     const min = duration.minutes()
     const sec = duration.seconds()
     settimeNowis(`${hour}:${min}:${sec}`)
  }

  useEffect(() => {
    let interval = setInterval(() => {
      getDiffTime();
    }, 1000);
    return () => clearInterval(interval);
  }, [Timings]);

  const handleCityChange = (event) => {
    console.log(event.target.value);
    const cityObject = avilableCity.find((city) => {
      return city.apiName == event.target.value;
    });
    setCitySelcted(cityObject);
  };
  return (
    <>
      <Grid container spacing={2}>
        <Grid size={6}>
          <div>
            <h2>{timeNow}</h2>
            <h1>{citySelcted.displayname}</h1>
          </div>
        </Grid>
        <Grid size={6}>
          <div>
            <h2>متبقي حتى {prayerArry[prayerNext]?.displayname}</h2>
            <h1>{timeNowis}</h1>
          </div>
        </Grid>
      </Grid>
      <Divider
        style={{ borderColor: "white", opacity: ".1" }}
        variant="middle"
      />
      <Stack
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-around",
          marginTop: "50px",
        }}
        direction={"row"}
      >
        <Pray img={img1} time={Timings?.Fajr} name="الفجر" />
        <Pray img={img2} time={Timings?.Dhuhr} name="الضهر" />
        <Pray img={img3} time={Timings?.Asr} name="العصر" />
        <Pray img={img4} time={Timings?.Sunset} name="المغرب" />
        <Pray img={img5} time={Timings?.Isha} name="العشاء" />
      </Stack>
      <Stack
        direction={"row"}
        sx={{ justifyContent: "center", marginTop: "45px" }}
      >
        <FormControl style={{ width: "20%" }}>
          <InputLabel
            sx={{
              color: "white",
              "&.Mui-focused": { color: "white" },
            }}
            id="demo-simple-select-label"
          >
            المدينه
          </InputLabel>
          <Select
            sx={{
              color: "white",
              ".MuiOutlinedInput-notchedOutline": {
                borderColor: "white",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "white",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "white",
              },
              ".MuiSelect-icon": {
                color: "white",
              },
            }}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Age"
            value={citySelcted.apiName}
            onChange={handleCityChange}
          >
            {avilableCity.map((city) => {
              return (
                <MenuItem key={city.apiName} value={city.apiName}>
                  {city.displayname}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Stack>
    </>
  );
}
