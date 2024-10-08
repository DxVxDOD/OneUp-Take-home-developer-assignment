import { ChangeEvent, useState } from "react";

export function useForm(type: string) {
  const [value, setValue] = useState<string>("");

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }

  return { value, onChange, type };
}
