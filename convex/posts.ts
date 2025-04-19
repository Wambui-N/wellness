import { v } from 'convex/values'
import { query, mutation, QueryCtx } from './_generated/server'
import { getCurrentUserOrThrow } from './users'
import { Id } from './_generated/dataModel'

// Helper function to calculate comment count
async function calculateCommentCount(ctx: QueryCtx, postId: Id<'posts'>): Promise<number> {
  // Get comment count for this post
  const comments = await ctx.db
    .query('comments')
    .withIndex('byPostId', q => q.eq('postId', postId))
    .collect();

  // Get replies to each comment and count them
  const repliesPromises = comments.map(comment =>
    ctx.db
      .query('comments')
      .withIndex('byParentId', q => q.eq('parentId', comment._id))
      .collect()
  );
  
  const replies = await Promise.all(repliesPromises);
  const totalReplies = replies.reduce((sum, replyArray) => sum + replyArray.length, 0);
  return comments.length + totalReplies;
}

export const generateUploadUrl = mutation(async ctx => {
  return await ctx.storage.generateUploadUrl()
})

export const getPosts = query({
  handler: async (ctx) => {
    const posts = await ctx.db
      .query("posts")
      .order("desc")
      .collect();

    return await Promise.all(
      posts.map(async (post) => {
        const author = await ctx.db.get(post.authorId);
        const tagDocs = await Promise.all(
          post.tags.map(tagId => ctx.db.get(tagId))
        );
        const tagNames = tagDocs.filter(Boolean).map(tag => tag!.name);

        // Calculate comment count using the helper function
        const commentCount = await calculateCommentCount(ctx, post._id);

        return {
          ...post,
          author,
          tagNames,
          savedBy: post.savedBy || [],
          likedBy: post.likedBy || [],
          likes: post.likes || 0,
          commentCount,
          ...(post.coverImageId
            ? {
                coverImageUrl:
                  (await ctx.storage.getUrl(post.coverImageId)) ?? ''
              }
            : {})
        };
      })
    );
  },
});

export const getRecentPosts = query({
  args: {},
  handler: async ctx => {
    const posts = await ctx.db.query('posts').order('desc').take(4)
    return Promise.all(
      posts.map(async post => {
        const author = await ctx.db.get(post.authorId)
        if (!author) return null;

        // Calculate comment count using the helper function
        const commentCount = await calculateCommentCount(ctx, post._id);

        return {
          ...post,
          author,
          commentCount
        }
      })
    ).then(posts => posts.filter((post): post is NonNullable<typeof post> => post !== null))
  }
})

export const getPostBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, { slug }) => {
    const post = await ctx.db
      .query('posts')
      .withIndex('bySlug', q => q.eq('slug', slug))
      .unique()

    if (!post) {
      return null
    }

    const author = await ctx.db.get(post.authorId)

    return {
      ...post,
      author,
      ...(post.coverImageId
        ? { coverImageUrl: (await ctx.storage.getUrl(post.coverImageId)) ?? '' }
        : {})
    }
  }
})

export const createPost = mutation({
  args: {
    title: v.string(),
    slug: v.string(),
    excerpt: v.string(),
    content: v.string(),
    coverImageId: v.optional(v.id('_storage')),
    tags: v.array(v.string())
  },
  handler: async (ctx, args) => {
    const user = await getCurrentUserOrThrow(ctx)

    // Get or create tags
    const tagIds = await Promise.all(
      args.tags.map(async (tagName) => {
        const existingTag = await ctx.db
          .query("tags")
          .filter((q) => q.eq(q.field("name"), tagName.toLowerCase()))
          .first();

        if (existingTag) {
          return existingTag._id;
        }

        const newTag = await ctx.db.insert("tags", { name: tagName.toLowerCase() });
        return newTag;
      })
    );

    const data = {
      ...args,
      authorId: user._id,
      likes: 0,
      tags: tagIds
    }

    await ctx.db.insert('posts', data)

    return data.slug
  }
})

export const getUserPosts = query({
  args: { userId: v.optional(v.id("users")) },
  handler: async (ctx, args) => {
    if (!args.userId) return [];
    
    const posts = await ctx.db
      .query("posts")
      .filter((q) => q.eq(q.field("authorId"), args.userId))
      .collect();

    // Get all posts with their complete data including savedBy
    const postsWithData = await Promise.all(
      posts.map(async (post) => {
        const author = await ctx.db.get(post.authorId);
        if (!author) return null;
        
        // Calculate comment count using the helper function
        const commentCount = await calculateCommentCount(ctx, post._id);
        
        return {
          ...post,
          author,
          savedBy: post.savedBy || [],
          likedBy: post.likedBy || [],
          commentCount
        };
      })
    );

    return postsWithData.filter((post): post is NonNullable<typeof post> => post !== null);
  },
});

export const getSavedPosts = query({
  args: { userId: v.optional(v.id("users")) },
  handler: async (ctx, args) => {
    if (!args.userId) return [];
    
    const user = await ctx.db.get(args.userId);
    if (!user?.savedArticles) return [];

    const posts = await Promise.all(
      user.savedArticles.map(async (postId) => {
        const post = await ctx.db.get(postId);
        if (!post) return null;
        const author = await ctx.db.get(post.authorId);
        const tagDocs = await Promise.all(
          post.tags.map(tagId => ctx.db.get(tagId))
        );
        const tagNames = tagDocs.filter(Boolean).map(tag => tag!.name);

        // Calculate comment count using the helper function
        const commentCount = await calculateCommentCount(ctx, post._id);

        return {
          ...post,
          author,
          tagNames,
          savedBy: post.savedBy || [],
          likedBy: post.likedBy || [],
          likes: post.likes || 0,
          commentCount,
          ...(post.coverImageId
            ? {
                coverImageUrl:
                  (await ctx.storage.getUrl(post.coverImageId)) ?? ''
              }
            : {})
        };
      })
    );

    return posts.filter((post): post is NonNullable<typeof post> => post !== null);
  },
});

export const getLikedPosts = query({
  args: { userId: v.optional(v.id("users")) },
  handler: async (ctx, args) => {
    if (!args.userId) return [];
    
    const user = await ctx.db.get(args.userId);
    if (!user?.likedArticles) return [];

    const posts = await Promise.all(
      user.likedArticles.map(async (postId) => {
        const post = await ctx.db.get(postId);
        if (!post) return null;
        const author = await ctx.db.get(post.authorId);
        const tagDocs = await Promise.all(
          post.tags.map(tagId => ctx.db.get(tagId))
        );
        const tagNames = tagDocs.filter(Boolean).map(tag => tag!.name);

        // Calculate comment count using the helper function
        const commentCount = await calculateCommentCount(ctx, post._id);

        return {
          ...post,
          author,
          tagNames,
          savedBy: post.savedBy || [],
          likedBy: post.likedBy || [],
          likes: post.likes || 0,
          commentCount,
          ...(post.coverImageId
            ? {
                coverImageUrl:
                  (await ctx.storage.getUrl(post.coverImageId)) ?? ''
              }
            : {})
        };
      })
    );

    return posts.filter((post): post is NonNullable<typeof post> => post !== null);
  },
});

export const savePost = mutation({
  args: { postId: v.id('posts') },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) throw new Error('Unauthorized')

    const user = await ctx.db
      .query('users')
      .filter((q) => q.eq(q.field('clerkUserId'), identity.subject))
      .first()
    
    if (!user) throw new Error('User not found')

    const post = await ctx.db.get(args.postId)
    if (!post) throw new Error('Post not found')

    // Update user's saved articles
    const savedArticles = user.savedArticles || []
    if (!savedArticles.includes(args.postId)) {
      await ctx.db.patch(user._id, {
        savedArticles: [...savedArticles, args.postId]
      })
    }

    // Update post's savedBy array
    const savedBy = post.savedBy || []
    if (!savedBy.includes(user._id)) {
      await ctx.db.patch(args.postId, {
        savedBy: [...savedBy, user._id]
      })
    }
  },
})

export const unsavePost = mutation({
  args: { postId: v.id('posts') },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) throw new Error('Unauthorized')

    const user = await ctx.db
      .query('users')
      .filter((q) => q.eq(q.field('clerkUserId'), identity.subject))
      .first()
    
    if (!user) throw new Error('User not found')

    const post = await ctx.db.get(args.postId)
    if (!post) throw new Error('Post not found')

    // Update user's saved articles
    const savedArticles = user.savedArticles || []
    await ctx.db.patch(user._id, {
      savedArticles: savedArticles.filter(id => id !== args.postId)
    })

    // Update post's savedBy array
    const savedBy = post.savedBy || []
    await ctx.db.patch(args.postId, {
      savedBy: savedBy.filter(id => id !== user._id)
    })
  },
})

export const likePost = mutation({
  args: { postId: v.id('posts') },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) throw new Error('Unauthorized')

    const user = await ctx.db
      .query('users')
      .filter((q) => q.eq(q.field('clerkUserId'), identity.subject))
      .first()
    
    if (!user) throw new Error('User not found')

    const post = await ctx.db.get(args.postId)
    if (!post) throw new Error('Post not found')

    // Update user's liked articles
    const likedArticles = user.likedArticles || []
    if (!likedArticles.includes(args.postId)) {
      await ctx.db.patch(user._id, {
        likedArticles: [...likedArticles, args.postId]
      })
    }

    // Update post's likedBy array and likes count
    const likedBy = post.likedBy || []
    if (!likedBy.includes(user._id)) {
      await ctx.db.patch(args.postId, {
        likedBy: [...likedBy, user._id],
        likes: (post.likes || 0) + 1
      })
    }
  },
})

export const unlikePost = mutation({
  args: { postId: v.id('posts') },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) throw new Error('Unauthorized')

    const user = await ctx.db
      .query('users')
      .filter((q) => q.eq(q.field('clerkUserId'), identity.subject))
      .first()
    
    if (!user) throw new Error('User not found')

    const post = await ctx.db.get(args.postId)
    if (!post) throw new Error('Post not found')

    // Update user's liked articles
    const likedArticles = user.likedArticles || []
    await ctx.db.patch(user._id, {
      likedArticles: likedArticles.filter(id => id !== args.postId)
    })

    // Update post's likedBy array and likes count
    const likedBy = post.likedBy || []
    if (likedBy.includes(user._id)) {
      await ctx.db.patch(args.postId, {
        likedBy: likedBy.filter(id => id !== user._id),
        likes: Math.max(0, (post.likes || 0) - 1)
      })
    }
  },
})

export const migratePostsStatus = mutation({
  args: {},
  handler: async (ctx) => {
    const posts = await ctx.db.query('posts').collect()
    
    for (const post of posts) {
      if (!post.status) {
        await ctx.db.patch(post._id, {
          status: 'published' // Default all existing posts to published
        })
      }
    }
    
    return posts.length
  }
})