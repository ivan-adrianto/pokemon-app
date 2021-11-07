import { createContext, useReducer } from "react";

export const AppContext = createContext();

const ACTIONS = {
  CATCH: "catch",
  RELEASE: "release",
  MENU: "menu",
  ERROR: "error",
};

const AppContextReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.CATCH:
      return {
        ...state,
        showCatchModal: !state.showCatchModal,
      };
    case ACTIONS.RELEASE:
      return {
        ...state,
        releaseModal: action.payload,
      };
    case ACTIONS.MENU:
      return {
        ...state,
        showMenu: action.payload,
      };
    case ACTIONS.ERROR:
      return {
        ...state,
        errorModal: action.payload,
      };
    default:
      return state;
  }
};

export const AppProvider = ({ children }) => {
  const initialState = {
    showCatchModal: false,
    releaseModal: { show: false, pokemon: {}, onClose: () => {} },
    showMenu: false,
    errorModal: { show: false, message: "", onClose: () => {} },
  };

  const [state, dispatch] = useReducer(AppContextReducer, initialState);

  const toggleCatchModal = () => {
    dispatch({ type: ACTIONS.CATCH });
  };

  const setReleaseModal = (payload) => {
    dispatch({ type: ACTIONS.RELEASE, payload });
  };

  const setErrorModal = (payload) => {
    dispatch({ type: ACTIONS.ERROR, payload });
  };

  const setShowMenu = (payload) => {
    dispatch({ type: ACTIONS.MENU, payload });
  };

  const AppValue = {
    showCatchModal: state.showCatchModal,
    releaseModal: state.releaseModal,
    errorModal: state.errorModal,
    showMenu: state.showMenu,
    toggleCatchModal,
    setReleaseModal,
    setErrorModal,
    setShowMenu,
  };

  return <AppContext.Provider value={AppValue}>{children}</AppContext.Provider>;
};
