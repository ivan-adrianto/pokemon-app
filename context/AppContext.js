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
        showReleaseModal: !state.showReleaseModal,
      };
    case ACTIONS.MENU:
      return {
        ...state,
        showMenu: action.payload,
      };
    case ACTIONS.ERROR:
      return {
        ...state,
        showErrorModal: action.payload,
      };
    default:
      return state;
  }
};

export const AppProvider = ({ children }) => {
  const initialState = {
    showCatchModal: false,
    showReleaseModal: false,
    showMenu: false,
    showErrorModal: false,
  };

  const [state, dispatch] = useReducer(AppContextReducer, initialState);

  const toggleCatchModal = () => {
    dispatch({ type: ACTIONS.CATCH });
  };

  const toggleReleaseModal = () => {
    dispatch({ type: ACTIONS.RELEASE });
  };

  const toggleErrorModal = (payload) => {
    dispatch({ type: ACTIONS.ERROR, payload });
  };

  const setShowMenu = (payload) => {
    dispatch({ type: ACTIONS.MENU, payload });
  };

  const AppValue = {
    showCatchModal: state.showCatchModal,
    showReleaseModal: state.showReleaseModal,
    showErrorModal: state.showErrorModal,
    showMenu: state.showMenu,
    toggleCatchModal,
    toggleReleaseModal,
    toggleErrorModal,
    setShowMenu,
  };

  return <AppContext.Provider value={AppValue}>{children}</AppContext.Provider>;
};
