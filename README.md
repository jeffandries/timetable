# Awakenings Sunday Timetable

## Mobile testing over local Wi-Fi

Run the development server so it is reachable from other devices on your network:

```bash
npm run dev:mobile
```

In another terminal, print the local URL to open on your phone:

```bash
npm run mobile:url
```

Open the printed URL on your phone, for example:

```text
http://192.168.x.x:3000
```

Your laptop and phone must be connected to the same Wi-Fi network.

## Optional social intents

The shared “I’m going here” feature is off by default. To enable it locally, copy `.env.example` to `.env.local` and set:

```bash
NEXT_PUBLIC_ENABLE_SOCIAL_INTENTS=true
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
```

Create the Supabase table and policies by running [`supabase/social-intents.sql`](./supabase/social-intents.sql) in the Supabase SQL editor.

To disable the feature later, set `NEXT_PUBLIC_ENABLE_SOCIAL_INTENTS=false` or remove it. With the flag off, the timetable does not render social UI and does not call Supabase.
