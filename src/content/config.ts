import { defineCollection, z } from 'astro:content';

// ============== 阵营 ==============
const factions = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),                    // 中文名：地牢
    nameEn: z.string(),                  // 英文名：Dungeon
    summary: z.string(),                 // 一句话简介
    strengths: z.array(z.string()),      // 优势点
    weaknesses: z.array(z.string()),     // 劣势点
    playstyle: z.array(z.string()),      // 推荐打法标签
    tier: z.enum(['S', 'A', 'B', 'C', 'D']).default('B'),
    accentColor: z.string().default('#8b6f47'), // 阵营专属强调色
    updatedAt: z.string(),
  }),
});

// ============== 兵种 ==============
const units = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    nameEn: z.string(),
    faction: z.string(),                 // 所属阵营 slug
    tier: z.number().int().min(1).max(7),// 1-7 级兵
    upgraded: z.boolean().default(false),// 是否升级版
    stats: z.object({
      attack: z.number(),
      defense: z.number(),
      damageMin: z.number(),
      damageMax: z.number(),
      hp: z.number(),
      speed: z.number(),
      initiative: z.number().optional(),
      shots: z.number().optional(),      // 远程攻击次数
      cost: z.number(),                  // 招募金币
      growth: z.number(),                // 每周增长
    }),
    abilities: z.array(z.string()).default([]),  // 特殊能力
    counters: z.array(z.string()).default([]),   // 克制谁
    counteredBy: z.array(z.string()).default([]),// 被谁克制
    rating: z.enum(['S', 'A', 'B', 'C', 'D']).default('B'),
    updatedAt: z.string(),
  }),
});

// ============== 英雄 ==============
const heroes = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    nameEn: z.string(),
    faction: z.string(),
    class: z.string(),                   // 英雄职业
    specialty: z.string(),               // 专精
    startingSkills: z.array(z.string()), // 起始技能
    startingSpells: z.array(z.string()).default([]),
    startingArmy: z.array(z.string()).default([]),
    recommendedBuild: z.array(z.string()).default([]),
    rating: z.enum(['S', 'A', 'B', 'C', 'D']).default('B'),
    updatedAt: z.string(),
  }),
});

// ============== 法术 ==============
const spells = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    nameEn: z.string(),
    school: z.enum(['fire', 'water', 'earth', 'air', 'light', 'dark']),
    level: z.number().int().min(1).max(5),
    manaCost: z.number(),
    effect: z.string(),
    rating: z.enum(['S', 'A', 'B', 'C', 'D']).default('B'),
    updatedAt: z.string(),
  }),
});

// ============== 攻略文章 ==============
const guides = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.enum(['新手入门', '阵营指南', '流派构筑', '战役攻略', '多人对战', '机制详解']),
    tags: z.array(z.string()).default([]),
    author: z.string().default('攻略组'),
    publishedAt: z.string(),
    updatedAt: z.string(),
    draft: z.boolean().default(false),
    featured: z.boolean().default(false),
  }),
});

export const collections = {
  factions,
  units,
  heroes,
  spells,
  guides,
};
