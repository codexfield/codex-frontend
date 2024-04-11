import useCountdown from '@bradgarropy/use-countdown';
import { Box } from '@chakra-ui/react';
import dayjs from 'dayjs';

interface IProps {
  /**
   * ms
   */
  now: string;
}

export const Countdown = (props: IProps) => {
  const { now } = props;

  const nowTmp = dayjs(Number(now)).valueOf();
  const todayEndTime = dayjs().endOf('day').valueOf();
  const todayRemaining = Math.floor((todayEndTime - nowTmp) / 1000);

  const hours = Math.floor(todayRemaining / (60 * 60));

  const count = useCountdown({
    seconds: todayRemaining,
    autoStart: true,
    format: "mm'M' ss",
  });

  return (
    <Box textAlign="right" fontSize="12px">
      Count Down: {hours}H: {count.formatted}
    </Box>
  );
};
