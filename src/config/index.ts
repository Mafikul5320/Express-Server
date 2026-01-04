import dotenv from "dotenv";

dotenv.config();

const config = {
    connectric_srt: process.env.CNT_STD,
    port: process.env.PORT,
    secret_key: process.env.SECRTE_KEY
};


export default config;