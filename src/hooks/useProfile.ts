
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
  profile_picture?: string;
};

export function useProfile() {
  const { user, signOut } = useAuth();
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

  const uploadProfilePicture = async (file: File): Promise<string | null> => {
    try {
      if (!user) throw new Error("User not authenticated");
      
      // Create a unique file path
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `profile_pictures/${fileName}`;
      
      // Upload the file to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('profile_pictures')
        .upload(filePath, file);
        
      if (uploadError) throw uploadError;
      
      // Get the public URL
      const { data } = supabase.storage
        .from('profile_pictures')
        .getPublicUrl(filePath);
        
      return data.publicUrl;
    } catch (error: any) {
      toast({
        title: "Upload Failed",
        description: error.message || "Failed to upload profile picture",
        variant: "destructive",
      });
      return null;
    }
  };
  
  const deleteAccount = async () => {
    try {
      if (!user) throw new Error("User not authenticated");
      
      // Delete user data from profiles table
      const { error: profileDeleteError } = await supabase
        .from('profiles')
        .delete()
        .eq('id', user.id);
        
      if (profileDeleteError) throw profileDeleteError;
      
      // Sign out the user after deleting their profile
      await signOut();
      
      toast({
        title: "Account Deleted",
        description: "Your account has been successfully deleted.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete account",
        variant: "destructive",
      });
    }
  };

  return {
    profile,
    isLoading,
    updateProfile,
    uploadProfilePicture,
    deleteAccount
  };
}
