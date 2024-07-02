import carpApi from "@Utils/api/api";
import { useCurrentUser } from "@Utils/queries/auth";
import { useSnackbar } from "@Utils/snackbar";
import carpProtocols from "@cachet/carp-protocols-core";
import { getConfig } from "@carp-dk/authentication-react";
import {
  CarpServiceError,
  LatestProtocol,
  ProtocolJSONObject,
} from "@carp-dk/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { v4 as uuidv4 } from "uuid";

type StudyProtocolSnapshot =
  carpProtocols.dk.cachet.carp.protocols.application.StudyProtocolSnapshot;

export const useProtocols = () => {
  const { data: currentUser } = useCurrentUser();
  return useQuery<StudyProtocolSnapshot[], CarpServiceError>({
    queryFn: async () =>
      carpApi.getAllProtocolsForOwner_CORE(
        currentUser.accountId.stringRepresentation,
        getConfig(),
      ),
    queryKey: ["protocols"],
    enabled: !!currentUser,
  });
};

export const useProtocolDetails = (protocolId: string) => {
  return useQuery<StudyProtocolSnapshot, CarpServiceError>({
    queryFn: () => carpApi.getProtocolBy_CORE(protocolId, getConfig()),
    queryKey: ["protocol", protocolId],
  });
};

export const useLatestProtocol = (protocolId: string) => {
  return useQuery<LatestProtocol, CarpServiceError>({
    queryFn: () => carpApi.getLatestProtocol(protocolId, getConfig()),
    queryKey: ["latestProtocol", protocolId],
  });
};

export const useCreateProtocol = () => {
  const { setSnackbarSuccess, setSnackbarError } = useSnackbar();
  const queryClient = useQueryClient();
  const { data: currentUser } = useCurrentUser();

  return useMutation({
    mutationFn: async (data: {
      name: string;
      protocol: ProtocolJSONObject;
      description: string;
      version: string;
    }) => {
      const { protocol } = data;
      protocol.id = uuidv4().toString();
      protocol.createdOn = new Date();
      protocol.ownerId = currentUser.accountId.stringRepresentation;
      protocol.name = data.name;
      protocol.description = data.description;

      return carpApi.addProtocol_CORE(protocol, data.version, getConfig());
    },
    onSuccess: () => {
      setSnackbarSuccess("Protocol created successfuly");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["protocols"] });
    },
    onError: (error: CarpServiceError) => {
      setSnackbarError(error.httpResponseMessage);
    },
  });
};

export const useUpdateProtocol = (originalProtocolId: string) => {
  const { setSnackbarSuccess, setSnackbarError } = useSnackbar();
  const queryClient = useQueryClient();
  const { data: currentUser } = useCurrentUser();

  return useMutation({
    mutationFn: async (data: {
      name: string;
      protocol: ProtocolJSONObject;
      description: string;
      versionTag: string;
    }) => {
      const { protocol } = data;
      protocol.id = originalProtocolId;
      protocol.createdOn = new Date();
      protocol.ownerId = currentUser.accountId.stringRepresentation;
      protocol.name = data.name;
      protocol.description = data.description;
      return carpApi.updateProtocol_CORE(
        protocol,
        data.versionTag,
        getConfig(),
      );
    },
    onSuccess: () => {
      setSnackbarSuccess("Protocol created successfuly");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["protocols"] });
      queryClient.invalidateQueries({
        queryKey: ["latestProtocol", originalProtocolId],
      });
      queryClient.invalidateQueries({
        queryKey: ["anonymousParticipant", originalProtocolId],
      });
    },
    onError: (error: CarpServiceError) => {
      setSnackbarError(error.message);
    },
  });
};
