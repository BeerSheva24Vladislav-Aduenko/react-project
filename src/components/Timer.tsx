import useTimer from "../hooks/useTimer";
interface Props {
    interval: number
}
const Timer: React.FC<Props> = ({interval}) => {
   const {hour, minute, second} = useTimer(interval);

  return (
    <div>
      {hour}:{minute}:{second}
    </div>
  );
};

export default Timer;
