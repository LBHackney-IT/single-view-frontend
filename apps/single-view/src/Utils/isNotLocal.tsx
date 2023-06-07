export function isNotLocal() {
  return (
    process.env.APP_ENV &&
    ["production", "staging", "development"].includes(process.env.APP_ENV)
  );
}
