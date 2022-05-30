export function isProduction() {
  return process.env.SV_API_V1 == "production";
}
