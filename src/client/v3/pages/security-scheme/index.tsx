import { OpenAPIV3 } from "openapi-types";
import JsonHighlight from "../../../../components/JsonHighlight";

interface Props {
  scheme: OpenAPIV3.SecuritySchemeObject;
  name: string;
}

export default function SecuritySchemePage(props: Props) {
  return (
    <div className="p-2 m-2 bg-slate-100">
      <h1 className="text-xl font-bold">SECURITY SCHEMES</h1>
      <hr />
      <p className="py-4 px-2">
        Defines a security scheme that can be used by the operations. Supported
        schemes are HTTP authentication, an API key (either as a header, a
        cookie parameter or as a query parameter), OAuth2's common
        flows(implicit, password, client credentials and authorization code) as
        defined in RFC6749, and OpenID Connect Discovery
      </p>
      <hr />
      <h2 className="text-xl font-bold">{props.name}</h2>

      <div className="prose max-w-full">
        <JsonHighlight json={props.scheme} />
      </div>
    </div>
  );
}
