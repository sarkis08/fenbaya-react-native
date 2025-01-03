import { Session, User } from "@supabase/supabase-js";
import React, { PropsWithChildren, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

type AuthData = {
    session: Session | null;
    user: User | null;
    mounting: boolean
  }

  const AuthContext = React.createContext<AuthData>({
    session: null,
    user: null,
    mounting: true,
  });

export default function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [mounting, setMounting] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setSession(session);

      if (session) {
        const { data: user, error } = await supabase
          .from("users")
          .select("*")
          .eq("id", session.user.id)
          .single();

        if (error) {
          console.error(error);
        } else {
          setUser(user);
        }
      }
      setMounting(false);
    };

    fetchSession();
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return <AuthContext.Provider value={{ session, mounting, user }}>{children}</AuthContext.Provider>
}

export const useAuth = () => React.useContext(AuthContext);
