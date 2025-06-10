import { useSearchParams } from 'react-router-dom';
function useURLPosition() {
  const [searchParam] = useSearchParams();
  const lat = Number(searchParam.get('lat'));
  const lng = Number(searchParam.get('lng'));

  return [lat, lng];
}

export default useURLPosition;
