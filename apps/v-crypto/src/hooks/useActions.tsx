import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

import { clearStore, updateUser } from 'src/providers/store/actions';
import { setUser } from 'src/providers/store/slices';

const useActions = () => {
  const dispatch = useDispatch();

  return bindActionCreators({ updateUser, setUser, clearStore }, dispatch);
};

export default useActions;
