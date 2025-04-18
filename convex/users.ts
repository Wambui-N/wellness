import { UserJSON } from '@clerk/backend'
import { v, Validator } from 'convex/values'
import { internalMutation, query, mutation, QueryCtx } from './_generated/server'
import { Id } from './_generated/dataModel'

export const getUsers = query({
  args: {},
  handler: async ctx => {
    return await ctx.db.query('users').collect()
  }
})

export const getRecentUsers = query({
  args: {},
  handler: async ctx => {
    return await ctx.db.query('users').order('desc').take(5)
  }
})

export const current = query({
  args: {},
  handler: async ctx => {
    return await getCurrentUser(ctx)
  }
})

export const upsertFromClerk = internalMutation({
  args: { data: v.any() as Validator<UserJSON> },
  async handler(ctx, { data }) {
    const userAttributes = {
      email: data.email_addresses[0].email_address,
      clerkUserId: data.id,
      firstName: data.first_name ?? undefined,
      lastName: data.last_name ?? undefined,
      imageUrl: data.image_url ?? undefined
    }

    const user = await userByClerkUserId(ctx, data.id)

    if (user === null) {
      await ctx.db.insert('users', userAttributes)
    } else {
      await ctx.db.patch(user._id, userAttributes)
    }
  }
})

export const deleteFromClerk = internalMutation({
  args: { clerkUserId: v.string() },
  async handler(ctx, { clerkUserId }) {
    const user = await userByClerkUserId(ctx, clerkUserId)

    if (user !== null) {
      await ctx.db.delete(user._id)
    } else {
      console.warn(
        `Can't delete user, there is none for Clerk user ID: ${clerkUserId}`
      )
    }
  }
})

export const getCurrentUserOrThrow = async (ctx: any) => {
  const identity = await ctx.auth.getUserIdentity()
  if (!identity) throw new Error('Unauthorized')

  const user = await ctx.db
    .query('users')
    .withIndex('byClerkUserId', (q: { eq: (arg0: string, arg1: any) => any }) => q.eq('clerkUserId', identity.subject))
    .first()

  if (!user) throw new Error('User not found')
  return user
}

export async function getCurrentUser(ctx: QueryCtx) {
  const identity = await ctx.auth.getUserIdentity()
  if (identity === null) {
    return null
  }
  return await userByClerkUserId(ctx, identity.subject)
}

export async function userByClerkUserId(ctx: QueryCtx, clerkUserId: string) {
  return await ctx.db
    .query('users')
    .withIndex('byClerkUserId', q => q.eq('clerkUserId', clerkUserId))
    .unique()
}

export const getUserByUsername = query({
  args: { username: v.string() },
  handler: async (ctx, { username }) => {
    const [firstName, lastName] = username.split('-')
    if (!firstName || !lastName) return null

    const users = await ctx.db.query('users').collect()
    return users.find(user => 
      user.firstName?.toLowerCase() === firstName.toLowerCase() && 
      user.lastName?.toLowerCase() === lastName.toLowerCase()
    ) || null
  }
})

export const updateAvatar = mutation({
  args: { storageId: v.id('_storage') },
  handler: async (ctx, { storageId }) => {
    const user = await getCurrentUserOrThrow(ctx)
    const imageUrl = await ctx.storage.getUrl(storageId)
    if (!imageUrl) throw new Error('Failed to get image URL')
    await ctx.db.patch(user._id, { imageUrl })
  }
})