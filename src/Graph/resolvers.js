import { AuthenticationError, ForbiddenError } from "apollo-server";
import bcrypt from "bcrypt";
import sha256 from "crypto-js/sha256";
import rand from "csprng";
import { Card } from "../database/cards.js";
import { User } from "../database/users.js";

const resolvers = {
    Query: {
        users: () => User.find(),
        users: async (_, __, { token }) => {
            if (!token) throw new AuthenticationError("Not Authenticated");
            const user = await User.findOne({ token });
            return user;
        },
        me: async (_, __, { token }) => {
            if (!token) throw new AuthenticationError("Not Authenticated");
            const user = await User.findOne({ token });
            console.log(user);
            return user;
        },
        mydata: async (_, __, { token }) => {
            if (!token) throw new AuthenticationError("Not Authenticated");
            const user = await User.findOne({ token });
            return user
        },
        allusers: () => User.find(),
        cards: () => Card.find(),
        findUser: async (_, { ID }) => { const user = await User.findOne({ ID }); return user; }
    },
    Mutation: {

        signup: async (_, { ID, name, password }) => {
            if (await User.findOne({ ID })) return false; // 중복 ID일 때

            bcrypt.hash(password, 10, async function (err, passwordHash) {
                const newUser = new User({
                    name,
                    ID,
                    passwordHash,
                    token: "",
                });
                try {
                    await newUser.save();
                    console.log(newUser.id)
                }
                catch (err) {
                    console.log(err)
                    return false;
                }

            });

            return true;
        },
        login: async (_, { ID, password }) => {
            const user = await User.findOne({ ID });
            console.log(user.id);
            if (!user) return null; // 해당 ID가 없을 때
            if (!bcrypt.compareSync(password, user.passwordHash)) return null; // 비밀번호가 일치하지 않을 때
            user.token = sha256(rand(160, 36) + ID + password).toString();
            user.save();
            return user;
        },

        logout: async (_, __, { token }) => {
            if (token) {
                // 로그인 상태라면(토큰이 존재하면)
                const logoutUser = await User.findOne({ token });
                console.log(logoutUser.id);
                if (!logoutUser) return false;
                logoutUser.token = "";
                return true;
            }

            throw new AuthenticationError("Not Authenticated"); // 로그인되어 있지 않거나 로그인 토큰이 없을 때
        },
        addCard: async (_, { name, store, img, cardNumber, isCutting, bgColor, color }, { token }) => {

            if (!token) return false; //로그인 안되어있을 경우
            const user = await User.findOne({ token });
            if (!user) return false;
            const newCard = new Card({
                name,
                store,
                img,
                cardNumber,
                isCutting,
                bgColor,
                color
            });
            try {

                await newCard.save();
                console.log(newCard.id);
                user.cards.push(newCard);
                await user.save();
            } catch (error) {
                console.log(error);
                return false;
            }
            return true;

        },
        addCustomCard: (_, { name, store, img, cardNumber, isCutting, color, bgColor }, { toekn }) => {
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