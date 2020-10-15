import { AuthenticationError, ForbiddenError } from "apollo-server";
import bcrypt from "bcrypt";
import sha256 from "crypto-js/sha256";
import rand from "csprng";
import cards from "../database/cards.js";
import users from "../database/users.js";

const resolvers = {
    Query: {
        users: () => users,
        users: (_, __, { user }) => {
            if (!user) throw new AuthenticationError("Not Authenticated");
            if (!user.roles.includes("admin"))
                throw new ForbiddenError("Not Authorized");

            return users;
        },
        me: (_, __, { user }) => {
            if (!user) throw new AuthenticationError("Not Authenticated");

            return user;
        },
    },
    Mutation: {
        signup: (_, { name, ID, password }) => {
            if (users.find((user) => user.ID === ID)) return false; // 중복 ID일 때

            bcrypt.hash(password, 10, function (err, passwordHash) {
                const newUser = {
                    id: users.length + 1,
                    name,
                    ID,
                    passwordHash,
                    role: ["user"],
                    token: "",
                };
                users.push(newUser);
            });

            return true;
        },
        login: (_, { ID, password }) => {
            const user = users.find((user) => user.ID === ID);

            if (!user) return null; // 해당 ID가 없을 때
            if (!bcrypt.compareSync(password, user.passwordHash)) return null; // 비밀번호가 일치하지 않을 때

            user.token = sha256(rand(160, 36) + ID + password).toString();
            return user;
        },

        logout: (_, __, { user }) => {
            if (user.token) {
                // 로그인 상태라면(토큰이 존재하면)
                user.token = "";
                return true;
            }

            throw new AuthenticationError("Not Authenticated"); // 로그인되어 있지 않거나 로그인 토큰이 없을 때
        },
        addCard: (_, { name, store, img, cardNumber, isCutting }, { user }) => {
            if (!user) return null; //로그인 안되어있을 경우

            const newCard = {
                id: cards.length + 1,
                name,
                store,
                img: `../asset/logo/${img}.png`,
                cardNumber,
                isCutting,
            }

            cards.push(newCard);
            user.cards.push(id);
            return newCard;
        },
        addCustomCard: (_, { name, store, img, cardNumber, isCutting, color, bgColor }, { user }) => {
            if (!user) return null;
            const newCard = {
                id: cards.length + 1,
                name,
                store,
                cardNumber,
                isCutting,
                color,
                bgColor,
            }
        },
    },
};

export default resolvers;