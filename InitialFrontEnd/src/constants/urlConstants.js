const BASE_URL = "http://localhost:3000";
const API_VERSION = "api/v1";
const URL_CONSTANTS = {
    PRODUCT_LIST : `${BASE_URL}/${API_VERSION}/product`,
    GET_PRODUCT_BY_ID: `${BASE_URL}/${API_VERSION}/product`,
    GET_PRODUCT_BY_CAT: `${BASE_URL}/${API_VERSION}/product/category`,
    GET_CATEGORIES : `${BASE_URL}/${API_VERSION}/product/categories/product_categories`,
    POST_LOGIN: `${BASE_URL}/${API_VERSION}/auth/login`
}

export default URL_CONSTANTS;