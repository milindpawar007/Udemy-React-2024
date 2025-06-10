// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useState } from "react";

import styles from "./Form.module.css";
import Button from "./Button";

import ButtonBack from "./ButtonBack";
import useURLPosition from "../hooks/useURLPosition";
import { useEffect } from "react";
import Spinner from './Spinner';
import Flag from './Flag';
import Message from "./Message";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {

  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [emoji, setEmoji] = useState("");
  const [notes, setNotes] = useState("");
  const [lat, lng] = useURLPosition();
  const [isLoadingGeocodingdata, setIsLoadingGeocodingdata] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  useEffect(() => {
    async function CityData() {
      if (!lat & !lng) return;
      try {
        setIsLoadingGeocodingdata(true);
        const res = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`)
        const data = await res.json();
        // if (data.countryCode) throw new Error("select correct cities")
        setCityName(data.city || data.locality || "")
        setCountry(data.countryName || "");
        setEmoji(data.countryCode || "");
        setIsLoadingGeocodingdata(false);

      } catch (er) {
        <Message message='Start by clicking on map' />
      } finally {
        setIsLoadingGeocodingdata(false)
      }

    }
    CityData();
  }, [lat, lng]);

  function handelSubmit(e) {
    e.preventDefault();
    if (!cityName || !startDate) return;
    const newCity = {
      cityName,
      country,
      emoji,
      startDate,
      notes,
      position: { lat, lng }

    }
    console.log(newCity)
    console.log(e.target)
  }
  if (isLoadingGeocodingdata) return <Spinner />
  if (!lat & !lng) return <Message message='Start by clicking on map' />
  return (
    <form className={styles.form} onSubmit={handelSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        {<span className={styles.flag}>{country && <Flag countryCode={emoji} />}</span>}
        {/* <span className={styles.flag}>{country}</span> */}
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker selected={startDate} dateFormat="dd/MM/yyyy" onChange={(date) => setStartDate(date)} />
        {/* <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <ButtonBack />
      </div>
    </form>
  );
}

export default Form;
