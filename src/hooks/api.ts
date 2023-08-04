import { useEffect, useState } from "react";

export const getSpecification = () =>
  fetch("/docs/openapi.json").then((r) => r.json());

export function useSpec() {
  const [spec, setSpec] = useState<any>();

  useEffect(() => {
    let mounted = true;
    getSpecification()
      .then((res) => {
        if (!mounted) return;
        setSpec(res);
      })
      .catch((e) => {
        console.error(e);
      });
    return () => {
      mounted = false;
    };
  }, []);

  return spec;
}
