import { createClient } from "@supabase/supabase-js";

const supabaseUrl = 'https://yhikhgxbyhmqhfwzaexx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InloaWtoZ3hieWhtcWhmd3phZXh4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODkyODgxNTYsImV4cCI6MjAwNDg2NDE1Nn0.Riqk3K9ofF1cEqLAgO-Dnj7jFmHSDU-Pa1wEliESn0Y';

export const supabase = createClient(supabaseUrl, supabaseKey);
