import { OpenAPIV3 } from "openapi-types";
import { createContext, PropsWithChildren, useContext } from "react";

type State = {
  spec: OpenAPIV3.Document;
  originalDocument: OpenAPIV3.Document;
};

const defaultState: State = {
  spec: null!,
  originalDocument: null!,
};

const context = createContext(defaultState);

const OpenAPIv3ContextProvider = ({
  children,
  spec,
  originalDocument,
}: PropsWithChildren<State>) => {
  const value: State = {
    spec,
    originalDocument,
  };
  return <context.Provider value={value}>{children}</context.Provider>;
};

const useOpenAPIContext = () => useContext(context);

export { OpenAPIv3ContextProvider, useOpenAPIContext };
