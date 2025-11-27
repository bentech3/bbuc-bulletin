import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";

type AppRole = Database["public"]["Enums"]["app_role"];

export const useUserRole = () => {
  const { user } = useAuth();
  const [role, setRole] = useState<AppRole | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserRole = async () => {
      if (!user) {
        setRole(null);
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", user.id)
          .single();

        if (error) {
          console.error("Error fetching user role:", error);
          setRole("student"); // Default to student
        } else {
          setRole(data.role);
        }
      } catch (error) {
        console.error("Error:", error);
        setRole("student"); // Default to student
      } finally {
        setLoading(false);
      }
    };

    fetchUserRole();
  }, [user]);

  const isAdmin = role === "admin";
  const isStaff = role && [
    "principal",
    "registrar",
    "dean",
    "department_head",
    "guild_leader",
    "admissions_officer",
    "communication_officer",
    "faculty",
    "staff",
  ].includes(role);
  const isStudent = role === "student";

  return {
    role,
    loading,
    isAdmin,
    isStaff,
    isStudent,
  };
};
