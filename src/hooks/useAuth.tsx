import { useState, useEffect, createContext, useContext } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

type UserRole = 'consumer' | 'vendor' | 'admin';

interface UserProfile {
  id: string;
  full_name: string | null;
  role: UserRole | null;
  business_name: string | null;
  business_license: string | null;
  contact_person: string | null;
  phone: string | null;
  is_approved: boolean | null;
  created_at?: string;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  userProfile: UserProfile | null;
  signUp: (email: string, password: string, fullName: string, role?: UserRole, businessInfo?: {
    businessName: string;
    businessLicense: string;
    businessAddress: string;
    businessDescription?: string;
    contactPerson: string;
  }) => Promise<{ error: any; data?: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<{ error: any }>;
  loading: boolean;
  hasRole: (roles: UserRole | UserRole[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUserProfile = async (userId: string, userMetadata?: any) => {
    try {
      console.log('🔐 Fetching profile for user:', userId);
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('id, full_name, role, business_name, business_license, contact_person, phone, is_approved')
        .eq('id', userId)
        .single();
      
      if (error) {
        console.log('🔐 Profile fetch error:', error);
        // Return fallback profile
        return {
          id: userId,
          full_name: userMetadata?.full_name || null,
          role: (userMetadata?.role as UserRole) || 'consumer',
          business_name: null,
          business_license: null,
          contact_person: null,
          phone: null,
          is_approved: false,
        };
      }
      
      console.log('🔐 Successfully fetched profile:', profile);
      return profile;
    } catch (error) {
      console.error('🔐 Profile fetch exception:', error);
      return {
        id: userId,
        full_name: userMetadata?.full_name || null,
        role: (userMetadata?.role as UserRole) || 'consumer',
        business_name: null,
        business_license: null,
        contact_person: null,
        phone: null,
        is_approved: false,
      };
    }
  };

  useEffect(() => {
    console.log('🔐 AuthProvider mounting...');
    let mounted = true;

    // Initialize auth immediately
    const initAuth = async () => {
      console.log('🔐 Getting initial session...');
      
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (!mounted) return;
        
        if (error) {
          console.error('🔐 Session error:', error);
        }
        
        console.log('🔐 Initial session:', session ? `found for ${session.user?.email}` : 'none');
        
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Fetch profile in background, don't block loading
          fetchUserProfile(session.user.id, session.user.user_metadata)
            .then(profile => {
              if (mounted) {
                console.log('🔐 Profile loaded:', profile);
                setUserProfile(profile);
              }
            })
            .catch(err => console.error('🔐 Profile load failed:', err));
        }
        
        // Always set loading to false after initial session check
        console.log('🔐 Setting loading to false');
        setLoading(false);
        
      } catch (error) {
        console.error('🔐 Init error:', error);
        if (mounted) {
          setLoading(false);
        }
      }
    };

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!mounted) return;
        
        console.log('🔐 Auth state change:', event, session ? `session for ${session.user?.email}` : 'no session');
        
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Fetch profile in background
          fetchUserProfile(session.user.id, session.user.user_metadata)
            .then(profile => {
              if (mounted) {
                setUserProfile(profile);
              }
            })
            .catch(err => console.error('🔐 Profile load failed:', err));
        } else {
          setUserProfile(null);
        }
      }
    );

    // Initialize immediately
    initAuth();

    // Emergency timeout - force loading to false after 2 seconds
    const emergencyTimeout = setTimeout(() => {
      if (mounted && loading) {
        console.log('🔐 EMERGENCY: Forcing loading to false');
      setLoading(false);
      }
    }, 2000);

    return () => {
      console.log('🔐 AuthProvider cleanup');
      mounted = false;
      clearTimeout(emergencyTimeout);
      subscription.unsubscribe();
    };
  }, []);

  const signUp = async (email: string, password: string, fullName: string, role: UserRole = 'consumer', businessInfo?: {
    businessName: string;
    businessLicense: string;
    businessAddress: string;
    businessDescription?: string;
    contactPerson: string;
  }) => {
    const { data: authData, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/`,
        data: {
          full_name: fullName,
          role: role,
        }
      }
    });

    // If vendor role and signup successful, create vendor application
    if (!error && role === 'vendor' && businessInfo && authData.user) {
      try {
        const { error: appError } = await supabase
          .from('vendor_applications')
          .insert({
            user_id: authData.user.id,
            business_name: businessInfo.businessName,
            business_license: businessInfo.businessLicense,
            business_address: businessInfo.businessAddress,
            business_description: businessInfo.businessDescription || null,
            contact_person: businessInfo.contactPerson,
            email: email,
            status: 'pending'
          });

        if (appError) {
          console.error('Error creating vendor application:', appError);
          // Don't fail the signup, just log the error
        } else {
          console.log('Vendor application created successfully');
        }
      } catch (appError) {
        console.error('Exception creating vendor application:', appError);
      }
    }

    return { error, data: authData };
  };

  const signIn = async (email: string, password: string) => {
    console.log('🔐 Attempting sign in for:', email);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    console.log('🔐 Sign in result:', error ? 'error' : 'success');
    return { error };
  };

  const signOut = async () => {
    console.log('🔐 Signing out...');
    const { error } = await supabase.auth.signOut();
    if (!error) {
      console.log('🔐 Sign out successful');
      setUser(null);
      setSession(null);
      setUserProfile(null);
    } else {
      console.error('🔐 Sign out error:', error);
    }
    return { error };
  };

  const hasRole = (roles: UserRole | UserRole[]): boolean => {
    if (!userProfile?.role) return false;
    const roleArray = Array.isArray(roles) ? roles : [roles];
    return roleArray.includes(userProfile.role);
  };

  console.log('🔐 AuthProvider render - loading:', loading, 'user:', user?.email || 'none');

  return (
    <AuthContext.Provider value={{ user, session, userProfile, signUp, signIn, signOut, loading, hasRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
