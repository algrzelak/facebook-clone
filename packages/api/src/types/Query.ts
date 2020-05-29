import { intArg, objectType } from "@nexus/schema";
import { requiredStringArg } from "./helpers";
import { trimAndCapitalizeSentence } from "../utils/helpers";

export const Query = objectType({
  name: "Query",
  definition(t) {
    t.field("me", {
      type: "User",
      nullable: true,
      resolve: async (_parent, _args, context) => {
        const id = context.req.userId || "";
        try {
          return await context.prisma.user.findOne({ where: { id } });
        } catch (error) {
          return null;
        }
      },
    });

    t.list.field("feed", {
      type: "PostConnection",
      args: { cursor: intArg({ nullable: true }) },
      resolve: async (_parent, { cursor }, context) => {
        const FIRST = 3;

        type After = {
          after?: {
            id: number;
          };
        };

        const after: After = cursor ? { after: { id: cursor } } : {};

        const posts = await context.prisma.post.findMany({
          orderBy: { createdAt: "desc" },
          first: FIRST,
          ...after,
        });

        const hasNextPage = posts.length > FIRST;
        const edges = hasNextPage ? posts.slice(0, -1) : posts;
        const endCursor = edges[edges.length - 1].id;

        console.log(edges);

        return {
          edges,
          pageInfo: {
            hasNextPage,
            endCursor,
          },
        };
      },
    });

    t.list.field("users", {
      type: "User",
      args: { filter: requiredStringArg({}) },
      resolve: async (_parent, { filter }, context) => {
        filter = trimAndCapitalizeSentence(filter);
        const [firstName, lastName] = filter.split(" ");
        return context.prisma.user.findMany({
          where: {
            OR: [
              {
                firstName: { contains: firstName },
                lastName: { contains: lastName },
              },
              {
                firstName: { contains: lastName },
                lastName: { contains: firstName },
              },
            ],
          },
        });
      },
    });

    t.crud.user();

    t.list.field("friends", {
      type: "User",
      nullable: true,
      args: { id: intArg({ nullable: true }) },
      resolve: async (_parent, { id }, context) => {
        const userId = id ?? context.req.userId;
        const filteredStatuses = await context.prisma.friendStatus.findMany({
          where: {
            statusId: 1,
            OR: [{ toUserId: userId }, { fromUserId: userId }],
          },
        });

        const friendsIds = filteredStatuses.map((status) =>
          status.fromUserId === userId ? status.toUserId : status.fromUserId
        );

        const objectIds = friendsIds.map((id) => ({ id }));

        const friends = await context.prisma.user.findMany({
          where: {
            OR: objectIds,
          },
        });

        return friends;
      },
    });

    t.list.field("friendRequests", {
      type: "FriendStatus",
      resolve: async (_parent, _args, context) => {
        const { userId } = context.req;
        return context.prisma.friendStatus.findMany({
          where: { toUserId: userId, statusId: 2 },
          include: { sender: true },
          orderBy: { sentTime: "desc" },
        });
      },
    });

    t.field("friendStatus", {
      type: "FriendStatus",
      nullable: true,
      args: { id: intArg({ nullable: false }) },
      resolve: async (_parent, { id }, context) => {
        const { userId } = context.req;

        // find many even though you can find only one because otherwise it throws an error because of OR

        try {
          const [status] = await context.prisma.friendStatus.findMany({
            where: {
              OR: [
                { fromUserId: userId, toUserId: id },
                { fromUserId: id, toUserId: userId },
              ],
            },
          });

          return status;
        } catch (error) {
          return new Error(error);
        }
      },
    });

    t.list.field("profileFeed", {
      type: "Post",
      nullable: false,
      args: { id: intArg({ nullable: false }) },
      resolve: async (_parent, { id }, context) => {
        try {
          const posts = await context.prisma.post.findMany({
            where: { authorId: id },
            orderBy: { createdAt: "desc" },
          });
          return posts;
        } catch (error) {
          return new Error(error);
        }
      },
    });
  },
});
