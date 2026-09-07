export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          name: string | null;
          email: string;
          avatar_url: string | null;
          level: number;
          goal: string | null;
          xp: number;
          current_streak: number;
          longest_streak: number;
          onboarding_completed: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          name?: string | null;
          email: string;
          avatar_url?: string | null;
          level?: number;
          goal?: string | null;
          xp?: number;
          current_streak?: number;
          longest_streak?: number;
          onboarding_completed?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          name?: string | null;
          email?: string;
          avatar_url?: string | null;
          level?: number;
          goal?: string | null;
          xp?: number;
          current_streak?: number;
          longest_streak?: number;
          onboarding_completed?: boolean;
          updated_at?: string;
        };
      };
      // Add other table types mapped from the schema...
    };
  };
}
