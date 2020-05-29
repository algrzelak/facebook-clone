import { allow, and, rule, shield } from "graphql-shield";
import {
  UserInputError,
  ForbiddenError,
  AuthenticationError,
} from "apollo-server-express";

const rules = {
  isAuthenticated: rule()((_parent, _args, context) => {
    return (
      Boolean(context.req.userId) ||
      new AuthenticationError("You are not authenticated")
    );
  }),
  isPostOwner: rule()(async (_parent, { id }, context) => {
    const userId = context.req.userId || "";
    const post = await context.prisma.post.findOne({
      where: {
        id: Number(id),
      },
    });

    const { author } = post;

    return (
      userId === author.id || new ForbiddenError("You are not the post owner")
    );
  }),
  isNotTheTarget: rule()(async (_parent, { id }, context) => {
    const userId = context.req.userId || "";
    return userId !== id || new UserInputError("You can't do that to yourself");
  }),
};

export const permissions = shield({
  Query: {
    "*": rules.isAuthenticated,
    me: allow,
  },
  Mutation: {
    "*": rules.isAuthenticated,
    signIn: allow,
    signOut: allow,
    signUp: allow,
    deletePost: and(rules.isPostOwner, rules.isAuthenticated),
    sendInvitation: and(rules.isAuthenticated, rules.isNotTheTarget),
  },
});