export function ParseTrimFromDto(dto: any) {
  function generatedTrim(value: any): any {
    if (typeof value === 'string')
      return value.trim().toUpperCase() || value.toUpperCase();
    else return value;
  }
  const keys = Object.keys(dto);
  Object.values(dto).map((value, i) => {
    dto[keys[i]] = generatedTrim(value);
  });
}
