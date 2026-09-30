# Sources

The numbers in this skill, and where they come from. **Directional** marks a claim with no published method: use it to frame a test, never as a target.

## Books

- Nir Eyal, *Hooked: How to Build Habit-Forming Products* (2014), chapters 2 to 6. Trigger → action → variable reward → investment; investment loads the next trigger. The Manipulation Matrix (would you use it, does it improve the user's life) is the ethics test.
- BJ Fogg, *Tiny Habits* (2019), and behaviormodel.org. B = MAP; the three prompt types (spark, facilitator, signal).
- Yu-kai Chou, *Actionable Gamification* (2015). The four experience phases (discovery, onboarding, scaffolding, endgame); white-hat vs black-hat drives (ch. 14); loss and avoidance, including his rule of thumb that an executed loss should stay small, a few percent and never above about 15 to 30% of what the user built, and that loss messaging needs an obvious fix (ch. 12); appointment dynamics as a trigger (ch. 10). The loss thresholds are the author's experience, not research. The book does not discuss push notifications or streaks by name.
- Andrew Chen, *The Cold Start Problem* (2021), part IV. Churned users usually get no communication at all; reactivation that reports real activity beats feature announcements.

## Papers

- Yancey and Settles, "A Sleeping, Recovering Bandit Algorithm for Optimizing Recurring Notifications," KDD 2020, doi 10.1145/3394486.3403351. Success = a lesson within 2 hours of the reminder (baseline about 13%). Template novelty decays with a half-life of about 15 days; the same template daily scored below random. Online: DAU +0.5%, new-user D1 +2.2%, D7 +2.0%. A 5% random-policy holdout ran for 5 months.
- Zhao et al., "Notification Volume Control and Optimization System at Pinterest," KDD 2018, doi 10.1145/3219819.3219906. Per-user weekly budgets: volume −6 to −24%, CTR +11 to +31%, engagement +1 to +3%. Core users got fewer pushes with no loss of actives.
- LinkedIn, "Email Volume Optimization at LinkedIn" (KDD 2016) and "Near Real-Time Optimization of Notifications" (KDD 2018). Volume traded against long-term engagement, not clicks.
- On streak harms: "When Gamification Spoils Your Learning" (arXiv 2203.16175); Carr and Rosaen, "We're Going Streaking!" (2024) on Snapstreaks, FOMO, and problematic phone use.

## Practitioner write-ups

- Jorge Mazal, "How Duolingo reignited user growth," Lenny's Newsletter (2023). User states (current, at risk, reactivated, resurrected, dormant) and the finding that current-user retention moved daily actives about 5x more than the next lever.
- Duolingo blog, "How streaks keep learners committed" (2017). Weekend activity drops 5 to 10%; a weekend grace item raised return a week later by 4%. The popular "3.6x more likely to finish" and "streak freeze cut churn 21%" figures are **not** in that post; do not cite them.
- Brian Balfour / Reforge on natural frequency and retention curves.
- Eugene Yan, "Push notifications" (eugeneyan.com/writing/push): a survey of the Pinterest, Twitter, and LinkedIn systems.

## Benchmarks

- Airship, mobile push benchmarks for 2026 (2025 data). Median opt-in iOS about 49%, Android about 53%; Android down from about 71% in 2023.
- OneSignal, Mobile App Benchmarks 2024. Opt-in by category, from about 21% (iOS games) to about 52% (iOS utilities). Retention overall D1 28%, D7 18%, D30 8%.
- **Directional:** "priming doubles opt-in" (vendor blogs). "46% disable above 6 pushes a week" (a 2018 survey whose primary source could not be reached). "Uninstalls rise above 4 a week" is a hypothetical example in a 2015 vendor post, not data.

## Platform documentation

- Apple App Store Review Guidelines 4.5.3 (no spam through push) and 4.5.4 (push not required to function; no sensitive personal information; marketing only with explicit in-app opt-in and an in-app opt-out). 5.1.2(i) on sharing personal data with third-party AI.
- Apple, `UNNotificationInterruptionLevel` (passive, active, timeSensitive with its entitlement, critical with an Apple-approved entitlement). Provisional authorization (iOS 12+). Human Interface Guidelines, Notifications.
- Apple, APNs responses: 410 Unregistered and ExpiredToken, 413 payload too large, 429 TooManyRequests; payload limit 4 KB.
- Android: notification runtime permission (Android 13, `POST_NOTIFICATIONS`); notification channels (Android 8, importance fixed after creation); exact-alarm changes (Android 14 denies `SCHEDULE_EXACT_ALARM` by default).
- Firebase, token management: stale after about a month offline, Android tokens expire after 270 days inactive; `UNREGISTERED` means delete.
- Expo, "Sending notifications": 100 messages per request, 600 per second per project, 1,000 receipt ids per request, 4,096-byte payload; tickets mean accepted by Expo only; receipts after about 15 minutes, cleared after 24 hours; receipt errors `DeviceNotRegistered`, `MessageTooBig`, `MessageRateExceeded`, `MismatchSenderId`, `InvalidCredentials`. `expo-notifications`: create the Android channel before requesting the token; remote push unavailable in Expo Go on Android from SDK 53.
- Supabase, `pg_net`: requests are asynchronous; responses land in `net._http_response` and are kept for a limited time (6 hours by default).

## The AI-summary incident

- December 2024 to January 2025: Apple Intelligence notification summaries produced false headlines under news publishers' names (AppleInsider, 13 Dec 2024; Axios, 17 Jan 2025). iOS 18.3 paused summaries for news and entertainment apps and styled summaries in italics. iOS 26 beta 4 (July 2025) restored them with a warning that summarisation may change the meaning (MacRumors, 22 Jul 2025).

## Privacy

- EU ePrivacy Directive art. 13 (prior consent for direct marketing) and art. 5(3) (storing or reading data on the device); EDPB Guidelines 1/2024. Treat the push token as personal data.
