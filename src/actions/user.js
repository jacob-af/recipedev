async function addFollow(context, userId, relationship) {
  let user = {};
  try {
    user = await context.prisma.follow.upsert({
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
  } catch (err) {
    console.log(err);
    return {
      status: {
        code: err.code,
        message: err.message
      }
    };
  }

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
  let unfriend = {};
  try {
    unfriend = await context.prisma.follow.delete({
      where: {
        followingId_followedById: {
          followedById: context.userId,
          followingId: userId
        }
      }
    });
  } catch {
    console.log(err);
    return {
      status: {
        code: err.code,
        message: err.message
      }
    };
  }

  console.log(unfriend);
  return {
    message: "You are no longer following",
    code: "Success"
  };
}

export { addFollow, unFollow };
