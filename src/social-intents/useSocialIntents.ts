"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { TimetableItem } from "@/data/timetable";
import { fetchAllActiveIntents, clearCurrentUserIntent, upsertCurrentUserIntent } from "./api";
import { socialIntentsEnabled } from "./config";
import type { FestivalIntent, SocialProfile } from "./types";
import { getIntentItemId, intentMatchesItem, isIntentVisible } from "./utils";

const USER_ID_KEY = "festival-social-user-id";
const DISPLAY_NAME_KEY = "festival-social-display-name";

function createUserId() {
  return globalThis.crypto?.randomUUID?.() ?? `festival-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function useSocialIntents(nowMinutes: number) {
  const [profile, setProfile] = useState<SocialProfile | null>(null);
  const [intents, setIntents] = useState<FestivalIntent[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!socialIntentsEnabled) return;

    const storedUserId = window.localStorage.getItem(USER_ID_KEY);
    const userId = storedUserId ?? createUserId();
    if (!storedUserId) window.localStorage.setItem(USER_ID_KEY, userId);

    const displayName = window.localStorage.getItem(DISPLAY_NAME_KEY)?.trim() ?? "";
    setProfile({ userId, displayName });
    setIsLoaded(true);
  }, []);

  const refresh = useCallback(async () => {
    if (!socialIntentsEnabled) return;

    try {
      setIntents(await fetchAllActiveIntents());
    } catch (error) {
      console.error("Unable to refresh social intents", error);
    }
  }, []);

  useEffect(() => {
    if (!socialIntentsEnabled || !isLoaded) return;

    void refresh();
    const interval = window.setInterval(() => void refresh(), 15_000);
    return () => window.clearInterval(interval);
  }, [isLoaded, refresh]);

  const saveDisplayName = useCallback(
    (displayName: string) => {
      const trimmed = displayName.trim().slice(0, 32);
      if (!profile) return;

      window.localStorage.setItem(DISPLAY_NAME_KEY, trimmed);
      setProfile({ ...profile, displayName: trimmed });

      const storedIntent = intents.find((intent) => intent.user_id === profile.userId);
      if (!storedIntent) return;

      const updatedIntent = { ...storedIntent, display_name: trimmed };
      setIntents((current) =>
        current.map((intent) => (intent.user_id === profile.userId ? updatedIntent : intent)),
      );
      void upsertCurrentUserIntent(updatedIntent).catch((error) => {
        console.error("Unable to update social display name", error);
        void refresh();
      });
    },
    [intents, profile, refresh],
  );

  const chooseIntent = useCallback(
    async (item: TimetableItem) => {
      if (!socialIntentsEnabled || !profile?.displayName) return;

      const nextIntent: FestivalIntent = {
        user_id: profile.userId,
        display_name: profile.displayName,
        area: item.area,
        artist: item.artist,
        start_time: item.start,
        end_time: item.end,
      };

      setIntents((current) => [...current.filter((intent) => intent.user_id !== profile.userId), nextIntent]);

      try {
        const saved = await upsertCurrentUserIntent(nextIntent);
        setIntents((current) => [...current.filter((intent) => intent.user_id !== profile.userId), saved]);
      } catch (error) {
        console.error("Unable to save social intent", error);
        void refresh();
      }
    },
    [profile, refresh],
  );

  const clearIntent = useCallback(async () => {
    if (!socialIntentsEnabled || !profile) return;

    setIntents((current) => current.filter((intent) => intent.user_id !== profile.userId));

    try {
      await clearCurrentUserIntent(profile.userId);
    } catch (error) {
      console.error("Unable to clear social intent", error);
      void refresh();
    }
  }, [profile, refresh]);

  const visibleIntents = useMemo(
    () => intents.filter((intent) => isIntentVisible(intent, nowMinutes)),
    [intents, nowMinutes],
  );

  const intentsByItemId = useMemo(() => {
    return visibleIntents.reduce<Record<string, FestivalIntent[]>>((groups, intent) => {
      const itemId = getIntentItemId(intent);
      groups[itemId] ??= [];
      groups[itemId].push(intent);
      return groups;
    }, {});
  }, [visibleIntents]);

  const currentIntent = profile
    ? visibleIntents.find((intent) => intent.user_id === profile.userId) ?? null
    : null;

  const isSelected = useCallback(
    (item: TimetableItem) => Boolean(currentIntent && intentMatchesItem(currentIntent, item)),
    [currentIntent],
  );

  return {
    enabled: socialIntentsEnabled,
    profile,
    intentsByItemId,
    currentIntent,
    saveDisplayName,
    chooseIntent,
    clearIntent,
    isSelected,
  };
}
