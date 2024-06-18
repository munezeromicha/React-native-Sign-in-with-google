import "react-native-url-polyfill/auto";
import { createClient } from "@supabase/supabase-js";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const supabase = createClient(
  "https://vbwbfflzxuhktdvpbspd.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZid2JmZmx6eHVoa3RkdnBic3BkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTgyNTg0MjgsImV4cCI6MjAzMzgzNDQyOH0.eOPZwYgyg3Ic-jbXW4Rehd2RDgqf-kt4vr30w_O9h3c",
  {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  }
);