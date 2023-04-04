"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = void 0;
const graphql_subscriptions_1 = require("graphql-subscriptions");
const getUser = (parent, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
    // createPost(parent, args, { postController }) {
    //   // Datastore logic lives in postController
    //   pubsub.publish("POST_CREATED", { postCreated: args });
    //   return postController.createPost(args);
    // },
    const pubsub = new graphql_subscriptions_1.PubSub();
    pubsub.publish("USER_CREATED", { user: args });
    return { email: "luis@gmail.com" };
});
exports.getUser = getUser;
