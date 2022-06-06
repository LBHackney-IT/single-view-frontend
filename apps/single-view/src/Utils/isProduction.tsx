export function isProduction() {
  console.log(`Application environment is : ${process.env.APP_ENV}`);
  return process.env.APP_ENV == "production";
}
