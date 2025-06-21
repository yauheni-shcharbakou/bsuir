import { useRouter } from 'next/router';
import { EndPoint } from '../constants/enums';

export default function useNavigation() {
  const { route } = useRouter();
  const isAuthPages = () => route === EndPoint.LOGIN || route === EndPoint.REGISTER;

  return { isAuthPages };
}
