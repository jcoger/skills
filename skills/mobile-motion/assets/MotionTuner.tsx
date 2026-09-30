/**
 * MotionTuner: dev-only, zero-extra-dep motion tuning panel for the Mobile Kit.
 *
 * Tune the whole feel a reference video can't carry (timing, spring physics, and
 * choreography) live on device, then export the config as JSON to paste into your
 * motion tokens. Built on core React Native (PanResponder), so it drops into any RN
 * project: no Leva, no slider library, no gesture-handler/worklet assumptions. The
 * only Reanimated touch is the `configTo*` helpers that turn the tuned config into
 * `withTiming` / `withSpring` args for YOUR animation.
 *
 * Usage:
 *   const { config, Tuner } = useMotionTuner();           // defaults below
 *   const run = () => {
 *     p.value = 0;
 *     p.value = config.type === 'spring'
 *       ? withDelay(config.delay, withSpring(1, configToSpring(config)))
 *       : withDelay(config.delay, withTiming(1, configToTiming(config)));
 *   };
 *   return (<>
 *     <YourScreen />
 *     <Tuner play={run} />        {/* renders only in __DEV__ */}
 *   </>);
 *
 * When the feel is right, tap "Log JSON", copy the values into your motion tokens
 * (the constants file from IMPLEMENT step 2), and delete the Tuner. token-lint then
 * holds them: tuned numbers become tokens, never inline literals.
 *
 * Combos: tune `overlap` (where the next beat starts on the one clock) and per-beat
 * `duration`/`stagger` here; for several beats, mount one Tuner per beat or extend
 * the schema with beat-prefixed keys (e.g. `sheet.duration`, `pill.overlap`).
 */
import React, { useCallback, useRef, useState } from 'react';
import {
  PanResponder,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  type LayoutChangeEvent,
} from 'react-native';
import { Easing } from 'react-native-reanimated';

// ----- schema -----------------------------------------------------------------

export type Param =
  | { key: string; label: string; type: 'range'; min: number; max: number; step?: number; when?: (c: Config) => boolean }
  | { key: string; label: string; type: 'enum'; options: string[]; when?: (c: Config) => boolean };

export type Config = Record<string, number | string>;

/** Default schema: timing + spring feel + choreography. Edit freely per moment. */
export const MOTION_SCHEMA: Param[] = [
  { key: 'type', label: 'Type', type: 'enum', options: ['curve', 'spring'] },
  { key: 'duration', label: 'Duration (ms)', type: 'range', min: 80, max: 800, step: 10 },
  // timing
  { key: 'easing', label: 'Easing', type: 'enum', options: ['out', 'inOut', 'ease', 'linear'], when: (c) => c.type === 'curve' },
  { key: 'delay', label: 'Delay (ms)', type: 'range', min: 0, max: 600, step: 10 },
  { key: 'stagger', label: 'Stagger (ms/item)', type: 'range', min: 0, max: 120, step: 5 },
  // spring feel (kit model: duration + bounce; bounce ≈ 1 − dampingRatio)
  { key: 'bounce', label: 'Bounce', type: 'range', min: 0, max: 0.6, step: 0.02, when: (c) => c.type === 'spring' },
  // choreography
  { key: 'overlap', label: 'Overlap % (combos)', type: 'range', min: 0, max: 100, step: 5 },
];

export const MOTION_DEFAULTS: Config = {
  type: 'curve',
  duration: 320,
  easing: 'out',
  delay: 0,
  stagger: 50,
  bounce: 0.1,
  overlap: 60,
};

// ----- helpers: config → Reanimated args --------------------------------------

const EASINGS: Record<string, (t: number) => number> = {
  out: Easing.out(Easing.cubic),
  inOut: Easing.inOut(Easing.cubic),
  ease: Easing.inOut(Easing.quad),
  linear: Easing.linear,
};

/** withTiming(target, configToTiming(config)): use when config.type === 'curve'. */
export function configToTiming(c: Config) {
  return { duration: Number(c.duration), easing: EASINGS[String(c.easing)] ?? EASINGS.out };
}

/** withSpring(target, configToSpring(config)): duration + bounce model (the kit's). */
export function configToSpring(c: Config) {
  return { duration: Number(c.duration), dampingRatio: 1 - Number(c.bounce) };
  // Raw-physics variant: add damping/stiffness/mass to the schema and return
  // { damping: Number(c.damping), stiffness: Number(c.stiffness), mass: Number(c.mass) }.
}

// ----- controls ---------------------------------------------------------------

function Slider({
  label, value, min, max, step = 1, onChange,
}: { label: string; value: number; min: number; max: number; step?: number; onChange: (v: number) => void }) {
  const [w, setW] = useState(1);
  // refs keep the once-created PanResponder out of stale-closure territory
  const refs = useRef({ w: 1, min, max, step, onChange });
  refs.current = { w, min, max, step, onChange };

  const setFromX = useCallback((x: number) => {
    const r = refs.current;
    const ratio = Math.max(0, Math.min(1, x / r.w));
    const raw = r.min + ratio * (r.max - r.min);
    const snapped = Math.round(raw / r.step) * r.step;
    r.onChange(Math.max(r.min, Math.min(r.max, Number(snapped.toFixed(4)))));
  }, []);

  const pan = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (e) => setFromX(e.nativeEvent.locationX),
      onPanResponderMove: (e) => setFromX(e.nativeEvent.locationX),
    }),
  ).current;

  const pct = Math.max(0, Math.min(1, (value - min) / (max - min)));
  const onLayout = (e: LayoutChangeEvent) => setW(e.nativeEvent.layout.width || 1);

  return (
    <View style={styles.row}>
      <View style={styles.labelRow}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
      <View style={styles.track} onLayout={onLayout} {...pan.panHandlers}>
        <View style={[styles.fill, { width: `${pct * 100}%` }]} />
        <View style={[styles.thumb, { left: `${pct * 100}%` }]} />
      </View>
    </View>
  );
}

function EnumRow({
  label, value, options, onChange,
}: { label: string; value: string; options: string[]; onChange: (v: string) => void }) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.chips}>
        {options.map((opt) => (
          <Pressable key={opt} onPress={() => onChange(opt)} style={[styles.chip, value === opt && styles.chipOn]}>
            <Text style={[styles.chipText, value === opt && styles.chipTextOn]}>{opt}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

// ----- panel ------------------------------------------------------------------

export function useMotionTuner(schema: Param[] = MOTION_SCHEMA, defaults: Config = MOTION_DEFAULTS) {
  const [config, setConfig] = useState<Config>(defaults);
  const set = useCallback((key: string, v: number | string) => setConfig((c) => ({ ...c, [key]: v })), []);

  // Stable Tuner identity (no remount on every slider drag); it reads the latest
  // config/schema/set from a ref updated each render.
  const ref = useRef({ config, schema, set });
  ref.current = { config, schema, set };

  const Tuner = useRef(
    ({ play, auto = true }: { play?: () => void; auto?: boolean }) => {
      const [open, setOpen] = useState(true);
      if (!__DEV__) return null;
      const { config, schema, set } = ref.current;
      const visible = schema.filter((p) => !p.when || p.when(config));
      const fire = () => play?.();
      return (
        <View style={styles.panel} pointerEvents="box-none">
          <View style={styles.card}>
            <Pressable style={styles.header} onPress={() => setOpen((o) => !o)}>
              <Text style={styles.title}>MotionTuner {open ? '▾' : '▸'}</Text>
              <View style={styles.headerBtns}>
                {play ? <Pressable onPress={fire} style={styles.btn}><Text style={styles.btnText}>Replay</Text></Pressable> : null}
                <Pressable
                  onPress={() => { console.log('[MotionTuner] config', JSON.stringify(config, null, 2)); }}
                  style={styles.btn}
                >
                  <Text style={styles.btnText}>Log JSON</Text>
                </Pressable>
              </View>
            </Pressable>
            {open ? (
              <ScrollView style={styles.body} keyboardShouldPersistTaps="handled">
                {visible.map((p) =>
                  p.type === 'enum' ? (
                    <EnumRow
                      key={p.key}
                      label={p.label}
                      value={String(config[p.key])}
                      options={p.options}
                      onChange={(v) => { set(p.key, v); if (auto) requestAnimationFrame(fire); }}
                    />
                  ) : (
                    <Slider
                      key={p.key}
                      label={p.label}
                      value={Number(config[p.key])}
                      min={p.min}
                      max={p.max}
                      step={p.step}
                      onChange={(v) => { set(p.key, v); if (auto) requestAnimationFrame(fire); }}
                    />
                  ),
                )}
                <Text selectable style={styles.json}>{JSON.stringify(config)}</Text>
              </ScrollView>
            ) : null}
          </View>
        </View>
      );
    },
  ).current;

  return { config, setConfig, Tuner };
}

// ----- styles (self-contained; no token dependency; this is a dev tool) ------

const styles = StyleSheet.create({
  panel: { position: 'absolute', left: 0, right: 0, bottom: 0, padding: 8 },
  card: { backgroundColor: 'rgba(18,20,24,0.96)', borderRadius: 16, borderWidth: StyleSheet.hairlineWidth, borderColor: 'rgba(255,255,255,0.12)', overflow: 'hidden' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 14, paddingVertical: 12 },
  title: { color: '#F4F6F8', fontSize: 13, fontWeight: '600' },
  headerBtns: { flexDirection: 'row', gap: 8 },
  btn: { backgroundColor: 'rgba(255,255,255,0.10)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 999 },
  btnText: { color: '#F4F6F8', fontSize: 12, fontWeight: '500' },
  body: { maxHeight: 280, paddingHorizontal: 14, paddingBottom: 12 },
  row: { paddingVertical: 8 },
  labelRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  label: { color: '#9AA2AD', fontSize: 12 },
  value: { color: '#F4F6F8', fontSize: 12, fontVariant: ['tabular-nums'] },
  track: { height: 28, justifyContent: 'center' },
  fill: { position: 'absolute', left: 0, height: 4, borderRadius: 2, backgroundColor: 'rgba(124,132,255,0.9)' },
  thumb: { position: 'absolute', width: 18, height: 18, borderRadius: 9, marginLeft: -9, top: 5, backgroundColor: '#FFFFFF' },
  chips: { flexDirection: 'row', gap: 6, marginTop: 6, flexWrap: 'wrap' },
  chip: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 999, backgroundColor: 'rgba(255,255,255,0.08)' },
  chipOn: { backgroundColor: 'rgba(124,132,255,0.95)' },
  chipText: { color: '#9AA2AD', fontSize: 12 },
  chipTextOn: { color: '#0B0D10', fontWeight: '600' },
  json: { color: '#5A6470', fontSize: 10, marginTop: 10, fontFamily: 'Menlo' },
});
