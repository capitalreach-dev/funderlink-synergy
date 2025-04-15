
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

export type ProfileData = {
  startup_name?: string;
  industry?: string[];
  stage?: string;
  funding_goal?: number;
  startup_description?: string;
  website?: string;
  organization_name?: string;
  focus?: string;
  raising_for?: string;
  fund_size_goal?: number;
  role: 'founder' | 'fundraisingPro';
  email_connected: boolean;
  email_provider?: string;
};

export function useProfile() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: profile, isLoading } = useQuery({
    queryKey: ['profile', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single();

      if (error) throw error;
      return data as ProfileData;
    },
    enabled: !!user?.id,
  });

  const { mutate: updateProfile } = useMutation({
    mutationFn: async (newData: Partial<ProfileData>) => {
      const { error } = await supabase
        .from('profiles')
        .update(newData)
        .eq('id', user?.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile', user?.id] });
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update profile",
        variant: "destructive",
      });
    },
  });

  return {
    profile,
    isLoading,
    updateProfile,
  };
}
