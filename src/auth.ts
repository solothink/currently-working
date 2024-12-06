import NextAuth, { Session, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";

interface AuthCredentials {
  user: string;
  accessToken: string;
  refreshToken?: string;
}

// Set default token expiration time to 5 minutes (300000 ms)
const FIVE_MINUTES_MS = 5 * 60 * 1000; // 5 minutes in milliseconds

// Helper to ensure strings are non-null and safe
const safeString = (value: string | null | undefined): string => value ?? "";

// Helper to ensure arrays are non-null and safe
const safeArray = <T>(value: T[] | null | undefined): T[] => value ?? [];

async function refreshAccessToken(token: JWT) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/auth/token/refresh/`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh: token.refreshToken }),
      },
    );

    // console.log("Refresh token response:", response);

    if (response.status === 200) {
      const refreshedTokens = await response.json();
      // console.log("Refreshed tokens:", refreshedTokens);

      // Fetch user profile after refreshing token
      // const userProfileResponse = await fetch(
      //   `${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/auth/profile/`, // Adjust the endpoint as needed
      //   {
      //     method: "GET",
      //     headers: {
      //       Authorization: `Bearer ${refreshedTokens.access}`,
      //     },
      //   }
      // );

      // if (!userProfileResponse.ok) {
      //   throw new Error("Failed to fetch user profile");
      // }

      // const userProfile = await userProfileResponse.json();

      return {
        ...token,
        accessToken: refreshedTokens.access,
        refreshToken: refreshedTokens.refresh ?? token.refreshToken,
        expiresIn: FIVE_MINUTES_MS,
        // ...userProfile, // Include user profile data in the token
        error: null,
      };
    } else {
      console.error("Error refreshing access token:", response.statusText);
      return { ...token, error: "RefreshAccessTokenError" };
    }
  } catch (error) {
    console.error("Failed to refresh access token:", error);
    return { ...token, error: "RefreshAccessTokenError" };
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials: Record<string, any>) {
        const { user, accessToken, refreshToken } =
          credentials as AuthCredentials;

        // Safely parse the user object if it's a JSON string
        const parsedUser = JSON.parse(user);

        if (accessToken && parsedUser) {
          return { ...parsedUser, accessToken, refreshToken };
        }
        throw new Error("Invalid credentials");
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User }) {
      // If a user logs in, assign their data to the token
      if (user) {
        token.id = safeString(user.id);
        token.email = safeString(user.email);
        token.name = safeString(user.name);
        token.mobile_number = safeString(user.mobile_number);
        token.roles = safeArray(user.roles);
        token.permissions = safeArray(user.permissions);
        token.accessToken = safeString(user.accessToken);
        token.refreshToken = safeString(user.refreshToken);
        token.category =
          (safeString(user.category) as User["category"]) ||
          ("B-CUST" as User["category"]);
        token.profile_picture = safeString(user.profile_picture);
        token.business_id = safeString(user.business_id);
        token.company_id = safeString(user.company_id);
        token.is_active = user.is_active ?? false;
        token.expiresIn = FIVE_MINUTES_MS; // Set token expiry to 5 minutes
        token.groups = safeArray(user.groups);
        token.default_group = safeString(user.default_group) as User["default_group"];
      }

      // Refresh token if it's close to expiration
      if (token.expiresIn && Date.now() >= token.expiresIn) {
        return await refreshAccessToken(token);
      }

      return token;
    },

    async session({ session, token }: { session: Session; token: JWT }) {
      // Assign token data to the session
      session.user.id = token.id;
      session.user.email = token.email;
      session.user.name = token.name;
      session.user.mobile_number = token.mobile_number;
      session.user.roles = token.roles;
      session.user.permissions = token.permissions;
      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
      session.user.category = token.category;
      session.user.profile_picture = token.profile_picture;
      session.user.business_id = token.business_id;
      session.user.company_id = token.company_id;
      session.user.is_active = token.is_active;
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.user.groups = token.groups;
      token.expiresIn = token.expiresIn; // Set token expiry to 5 minutes
      session.error = token.error ?? null; // Show error if present
      session.user.default_group = safeString(token.default_group) as User["default_group"];

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});
