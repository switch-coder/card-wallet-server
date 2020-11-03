import { User } from '../database/users.js';

const context = async ({ req }) => {
    const token = req.headers.authorization || '';

    // 로그인되어 있지 않거나 로그인 토큰이 없을 때
    if (token.length != 64) { return { token } }

    console.log(token)
    return { token };

};

export default context;