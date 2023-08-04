import classNames from "classnames";
import { OpenAPIV3 } from "openapi-types";
import { useState } from "react";
import { isRef } from "../../../../utils/parse";
import { useOpenAPIContext } from "../../context";
import { useDereferencedSchema } from "../../hooks/useDeref";
import { Link } from "react-router-dom";

interface Props {
  schema: OpenAPIV3.SchemaObject | OpenAPIV3.ReferenceObject;
  excludeWriteOnly?: boolean;
  excludeReadOnly?: boolean;
}

export default function Schema(props: Props) {
  const [isCollapsed, setCollapsed] = useState(false);
  const { originalDocument } = useOpenAPIContext();
  let isComponent = false;

  const { schema } = useDereferencedSchema(props.schema);
  if (!schema) return null;

  if (schema.readOnly && props.excludeReadOnly) return null;
  if (schema.writeOnly && props.excludeWriteOnly) return null;

  if (schema.type === "object") {
    if (!schema.properties) return null;
    const properties = Object.keys(schema.properties);
    return (
      <>
        {isComponent && "REF"}
        <span
          className={classNames(
            "hover:outline hover:outline-1 hover:outline-gray-400 rounded-sm cursor-pointer",
          )}
          onClick={() => setCollapsed((x) => !x)}
        >
          {"{"}
          {isCollapsed ? " … " : "   "}
        </span>
        <div
          className={classNames(
            "pl-[2ch] border-l border-slate-300",
            isCollapsed && "hidden",
          )}
        >
          {properties.map((prop) => {
            if (isRef(schema)) return null;
            if (schema.properties === undefined) return null;

            let subProperty = schema.properties[prop];
            let ref = false;
            let refName = "";

            if (isRef(subProperty)) {
              const refPath = subProperty.$ref.split("/");
              if (
                refPath[0] === "#" &&
                refPath[1] === "components" &&
                refPath[2] === "schemas"
              ) {
                refName = refPath[3];
                const schema = originalDocument.components?.schemas?.[refName];
                if (schema) {
                  subProperty = schema;
                  ref = true;
                }
              }
            }

            if (isRef(subProperty)) return null;

            if (subProperty.readOnly && props.excludeReadOnly) return null;
            if (subProperty.writeOnly && props.excludeWriteOnly) return null;

            return (
              <div
                key={prop}
                className={classNames(
                  "flex mr-2 items-center",
                  !["object", "array"].includes(subProperty.type ?? "") &&
                    "hover:bg-slate-300",
                )}
              >
                <div className="min-w-[350px] pr-2 w-fit">
                  {/* {subProperty.readOnly && (
                    <span className="text-orange-600">readonly </span>
                  )} */}
                  <span>{prop}</span>
                  <span className="text-orange-600">
                    {schema.required?.includes(prop) ? "" : "?"}
                  </span>
                  :{" "}
                  {ref && (
                    <>
                      <Link
                        to={`/schemas/${refName}`}
                        className="text-blue-500 underline"
                      >
                        {refName}
                      </Link>
                      &lt;
                    </>
                  )}
                  <span>
                    <Schema
                      schema={subProperty}
                      excludeReadOnly={props.excludeReadOnly}
                      excludeWriteOnly={props.excludeWriteOnly}
                    />
                  </span>
                  {ref && <span>&gt;</span>}
                </div>
                <Constraints schema={subProperty} isComponent={ref} />
              </div>
            );
          })}
        </div>
        {"}"}
      </>
    );
  }

  if (schema.type === "array") {
    if (!schema.items) return null;

    let refName = "";
    let subProperty = schema.items;
    let isComponent = false;

    if (isRef(schema.items)) {
      const refPath = schema.items.$ref.split("/");
      if (
        refPath[0] === "#" &&
        refPath[1] === "components" &&
        refPath[2] === "schemas"
      ) {
        refName = refPath[3];
        const schema = originalDocument.components?.schemas?.[refName];
        if (schema) {
          subProperty = schema;
          isComponent = true;
        }
      }
    }

    if (isRef(subProperty)) return null;

    return (
      <span>
        [
        {isComponent && (
          <Link to={`/schemas/${refName}`} className="text-blue-500 underline">
            {refName}&lt;
          </Link>
        )}
        <Schema
          schema={subProperty}
          excludeReadOnly={props.excludeReadOnly}
          excludeWriteOnly={props.excludeWriteOnly}
        />
        {isComponent && <>&gt;</>}]
      </span>
    );
  }

  return (
    <span className="text-sky-600">
      {schema.enum ? (
        <span className="text-fuchsia-600">"{schema.enum.join(`" | "`)}"</span>
      ) : (
        <>
          {schema.type === "string" ? (
            <span className="text-green-600">string</span>
          ) : schema.type === "boolean" ? (
            <span className="text-orange-600">{schema.type}</span>
          ) : (
            schema.type
          )}
        </>
      )}
      {schema.nullable ? " | null" : null}
    </span>
  );
}

function Constraints({
  schema,
  isComponent,
}: {
  schema: OpenAPIV3.SchemaObject;
  isComponent: boolean;
}) {
  return (
    <div className="flex gap-1 font-sans text-xs text-gray-500">
      <div className="flex gap-1">
        {isComponent && <span>REF</span>}
        {schema.readOnly && <span>Read-only</span>}
        {schema.description}
        {schema.deprecated && <span>Deprecated</span>}
        {schema.type === "integer" && <span>integer</span>}
        {/* {schema.enum?.length ? (
          <span>
            Allowed: <code>["{schema.enum.join('" | "')}"]</code>
          </span>
        ) : null} */}
        {schema.maxLength !== undefined ? (
          <span>Max {schema.maxLength} chars</span>
        ) : null}
        {schema.minLength !== undefined ? (
          <span>Min {schema.minLength} chars</span>
        ) : null}
        {schema.minimum !== undefined ? (
          <span>Min {schema.minimum}</span>
        ) : null}
        {schema.maximum !== undefined ? (
          <span>Max {schema.maximum}</span>
        ) : null}
        {schema.writeOnly && <span>Write-only</span>}
        {schema.default !== undefined ? (
          <span>Default: {`${schema.default}`}</span>
        ) : null}
      </div>
    </div>
  );
}
