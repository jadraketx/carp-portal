import { getConfig, getUser } from "@carp-dk/authentication-react";
import { CarpServiceError, User } from "@carp-dk/client";
import { useMutation, useQuery } from "@tanstack/react-query";
import carpApi from "@Utils/api/api";
import { useSnackbar } from "@Utils/snackbar";
import { useAuth } from "react-oidc-context";

export const useInviteResearcher = () => {
  const { setSnackbarSuccess, setSnackbarError } = useSnackbar();

  return useMutation<void, CarpServiceError, string, any>({
    mutationFn: (email: string) => {
      return carpApi.inviteResearcher(email, getConfig()); // TODO: add invite researcher to http client
    },
    onSuccess: () => {
      setSnackbarSuccess("Invitation sent");
    },
    onError: (error: CarpServiceError) => {
      setSnackbarError(error.httpResponseMessage);
    },
  });
};

export const useCurrentUser = () => {
  const auth = useAuth();

  return useQuery<User, CarpServiceError, User, any>({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const user = carpApi.parseUser(getUser()?.access_token);
      return user;
    },
    retry: false,
    enabled: !!auth.isAuthenticated || auth.isLoading,
  });
};
