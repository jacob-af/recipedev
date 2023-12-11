async function addFollow(context, userId, relationship) {
  console.log("ding");
  const user = await context.prisma.follow.upsert({
    where: {
      followingId_followedById: {
        followedById: context.userId,
        followingId: userId
      }
    },
    update: {
      relationship
    },
    create: {
      followedById: context.userId,
      followingId: userId,
      relationship
    }
  });
  console.log(user);
  return {
    following: user.followingId,
    relationship: user.relationship,
    status: {
      code: "Success",
      message: "You are now following guy"
    }
  };
}

async function unFollow(context, userId) {
  const unfriend = await context.prisma.follow.delete({
    where: {
      followingId_followedById: {
        followedById: context.userId,
        followingId: userId
      }
    }
  });
  console.log(unfriend);
  return {
    message: "You are no longer following",
    code: "Success"
  };
}

export { addFollow, unFollow };
