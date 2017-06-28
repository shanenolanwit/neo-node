const env = process.env;

export const nodeEnv = env.NODE_ENV || 'development';
export const default_uri = "";
export const test_uri = "";

export const bansai_url = "";
export const api_ai_query_url = '';
export const api_ai_auth_code = '';

export const techradar_api_key = '';

export const firebase_api_key = '';
export const firebase_auth_domain = '';
export const firebase_database_url = '';
export const firebase_storage_bucket = '';
export const firebase_messaging_sender_id = '';

export const webdriver_app_url = "";
export const sauce_labs_username = "";
export const sauce_labs_access_key = "";

export const logStars = message => {
    console.info('**********');
    console.info(message);
    console.info('**********');
};

export default {
    port: env.PORT || 8080,
    host: env.HOST || 'localhost',
    get serverUrl(){
        return `http://${this.host}:${this.port}`;
    }
};
