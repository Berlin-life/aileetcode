-- Migration 002: RLS Policies

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE problems ENABLE ROW LEVEL SECURITY;
ALTER TABLE test_cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE understanding_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE hints_used ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE revisions ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_streaks ENABLE ROW LEVEL SECURITY;

-- users: users can read/update their own row
CREATE POLICY "Users can view own profile" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON users FOR UPDATE USING (auth.uid() = id);

-- public read tables
CREATE POLICY "Problems are publicly readable" ON problems FOR SELECT USING (true);
CREATE POLICY "Test cases are publicly readable" ON test_cases FOR SELECT USING (true);
CREATE POLICY "Achievements are publicly readable" ON achievements FOR SELECT USING (true);
CREATE POLICY "Daily challenges are publicly readable" ON daily_challenges FOR SELECT USING (true);

-- user owned rows
CREATE POLICY "Users can view own attempts" ON attempts FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own attempts" ON attempts FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own sessions" ON understanding_sessions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own sessions" ON understanding_sessions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own sessions" ON understanding_sessions FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own hints used" ON hints_used FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own hints used" ON hints_used FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own skills" ON skills FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert/update own skills" ON skills FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view own revisions" ON revisions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert/update own revisions" ON revisions FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view own achievements" ON user_achievements FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own achievements" ON user_achievements FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own recommendations" ON recommendations FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can view own streaks" ON user_streaks FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert/update own streaks" ON user_streaks FOR ALL USING (auth.uid() = user_id);
