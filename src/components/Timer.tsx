import useTimer from "../hooks/useTimer";
import timezones from "../../config/timezones.json";
import { useMemo } from "react";
interface Props {
  interval?: number;
  city: string;
}
const Timer: React.FC<Props> = ({ interval = 1000, city }) => {
  const timeZone = useMemo(() => getTimeZone(city),[city]);
  const { hour, minute, second } = useTimer(
    new Date(new Date().toLocaleString(undefined, { timeZone })),
    interval
  );

  
    function getTimeZone(city: string): string | undefined {
      let res;
      console.log("getTimeZone")
      const timeZoneObj = timezones.find((obj) =>
        JSON.stringify(obj).includes(city)
      );
      timeZoneObj && (res = timeZoneObj.utc[0]);
      return res;
    }

  return (
    <div>
      <div className="timer">
        {hour}:{minute}:{second}
      </div>
      <div>
        {city} {!timeZone && "(not found)"}
      </div>
    </div>
  );
};

export default Timer;
