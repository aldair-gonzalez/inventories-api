export function ParseTrimFromDto(dto: any) {
  function generatedTrim(value: any) {
    if (typeof value === 'string' || value instanceof String)
      if (
        value.trim() !== '' &&
        value.trim() !== null &&
        value.trim() !== undefined
      )
        return value.trim();
      else return value;
    else return value;
  }
  const keys = Object.keys(dto);
  Object.values(dto).map((value, i) => {
    dto[keys[i]] = generatedTrim(value);
  });
}
