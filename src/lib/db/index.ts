import { neon, Pool } from '@neondatabase/serverless'

const connectionString = process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_XWy9MclROBP5@ep-solitary-surf-ay8p2541-pooler.c-5.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require'

// Neon SQL client for fast serverless queries
export const sql = neon(connectionString)

// Neon Pool for transactional or pooled database operations
export const pool = new Pool({ connectionString })

/** Initialize standard schema tables in Neon DB if not present */
export async function ensureDbSchema(): Promise<void> {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS profiles (
        id TEXT PRIMARY KEY,
        name TEXT,
        email TEXT UNIQUE NOT NULL,
        avatar_url TEXT,
        level INTEGER DEFAULT 1,
        goal TEXT,
        xp INTEGER DEFAULT 0,
        current_streak INTEGER DEFAULT 0,
        longest_streak INTEGER DEFAULT 0,
        onboarding_completed BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `
    await sql`
      CREATE TABLE IF NOT EXISTS problems (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        slug TEXT UNIQUE NOT NULL,
        description TEXT NOT NULL,
        difficulty TEXT NOT NULL,
        constraints JSONB,
        examples JSONB,
        solution JSONB,
        topics TEXT[],
        patterns TEXT[],
        expected_time_complexity TEXT,
        expected_space_complexity TEXT,
        hints JSONB,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `
    await sql`
      CREATE TABLE IF NOT EXISTS attempts (
        id SERIAL PRIMARY KEY,
        user_id TEXT REFERENCES profiles(id) ON DELETE CASCADE,
        problem_id TEXT NOT NULL,
        code TEXT NOT NULL,
        language TEXT NOT NULL,
        status TEXT NOT NULL,
        runtime_ms INTEGER,
        memory_kb INTEGER,
        test_results JSONB,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `
    await sql`
      CREATE TABLE IF NOT EXISTS understanding_sessions (
        id SERIAL PRIMARY KEY,
        user_id TEXT REFERENCES profiles(id) ON DELETE CASCADE,
        problem_id TEXT NOT NULL,
        questions JSONB,
        answers JSONB,
        scores JSONB,
        overall_score INTEGER,
        completed BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `
    await sql`
      CREATE TABLE IF NOT EXISTS skills (
        id SERIAL PRIMARY KEY,
        user_id TEXT REFERENCES profiles(id) ON DELETE CASCADE,
        topic TEXT NOT NULL,
        score NUMERIC DEFAULT 0,
        problems_solved INTEGER DEFAULT 0,
        problems_attempted INTEGER DEFAULT 0,
        avg_hints_used NUMERIC DEFAULT 0,
        confidence NUMERIC DEFAULT 0,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        UNIQUE(user_id, topic)
      );
    `
  } catch (err: any) {
    console.warn('[NeonDB] Schema initialization check warning:', err.message)
  }
}
