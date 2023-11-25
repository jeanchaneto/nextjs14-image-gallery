import { cleanEnv, str } from "envalid";
//Adds type safety to environment variables
const env = cleanEnv(process.env, {
    PEXELS_API_KEY: str(),
})

export default env