"use client";

import { useEffect, useState } from "react";
import { getInitials } from "./utils";

export function ProfileSetup({
  displayName,
  onSave,
}: {
  displayName: string;
  onSave: (displayName: string) => void;
}) {
  const [draft, setDraft] = useState(displayName);
  const trimmedDraft = draft.trim();

  useEffect(() => setDraft(displayName), [displayName]);

  return (
    <section className="social-profile-card" aria-label="Social profile">
      <div className="social-profile-copy">
        <p className="eyebrow">Friends</p>
        <h2>Tell friends where you’re heading next.</h2>
        <p>This shares your plan, not your live location.</p>
      </div>
      <form
        className="social-profile-form"
        onSubmit={(event) => {
          event.preventDefault();
          if (!trimmedDraft) return;
          onSave(trimmedDraft);
        }}
      >
        <label>
          <span className="sr-only">Display name</span>
          <input
            value={draft}
            maxLength={32}
            onChange={(event) => setDraft(event.target.value)}
            placeholder="Your name"
            autoComplete="nickname"
          />
        </label>
        <button type="submit" disabled={!trimmedDraft}>
          Save name
        </button>
      </form>
    </section>
  );
}

export function ProfileMenu({
  displayName,
  onSave,
}: {
  displayName: string;
  onSave: (displayName: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [draft, setDraft] = useState(displayName);
  const trimmedDraft = draft.trim();

  useEffect(() => setDraft(displayName), [displayName]);

  return (
    <div className="social-profile-menu">
      <button
        type="button"
        className="profile-avatar-button"
        aria-label="Edit display name"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((current) => !current)}
      >
        {getInitials(displayName)}
      </button>
      {isOpen ? (
        <form
          className="social-profile-popover"
          onSubmit={(event) => {
            event.preventDefault();
            if (!trimmedDraft) return;
            onSave(trimmedDraft);
            setIsOpen(false);
          }}
        >
          <strong>{displayName}</strong>
          <label>
            <span className="sr-only">Display name</span>
            <input
              value={draft}
              maxLength={32}
              onChange={(event) => setDraft(event.target.value)}
              autoComplete="nickname"
            />
          </label>
          <button type="submit" disabled={!trimmedDraft}>
            Save
          </button>
        </form>
      ) : null}
    </div>
  );
}
