import { TypedUseSelectorHook, useSelector } from "react-redux";

import { RootState } from "src/providers/store";

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export default useTypedSelector;
