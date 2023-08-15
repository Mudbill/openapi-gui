import type { OpenAPIV3 } from "openapi-types";
import type { PropsWithChildren } from "react";
import { createContext, useContext } from "react";

export type OpenApiContextState = {
  apiDocument: OpenAPIV3.Document;
  originalDocument: OpenAPIV3.Document;
};

const OpenApiDataContext = createContext<OpenApiContextState>(null!);

export type OpenApiProviderProps = PropsWithChildren<OpenApiContextState>;

export const OpenApiV3Provider = (props: OpenApiProviderProps) => {
  const { children, ...rest } = props;
  console.log(rest.originalDocument);

  return (
    <OpenApiDataContext.Provider value={rest}>
      {children}
    </OpenApiDataContext.Provider>
  );
};

export const useOpenApiV3Data = () => {
  const context = useContext(OpenApiDataContext);
  if (!context) throw new Error("No provider found for OpenApi context.");
  return context;
};
