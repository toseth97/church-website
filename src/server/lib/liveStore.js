import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const STORE_PATH = path.join(DATA_DIR, "live-stream-store.json");

const DEFAULT_STORE = {
  current: {
    isLive: false,
    audioUrl: null,
    startedAt: null,
  },
  history: [],
};

function ensureStoreFile() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(STORE_PATH)) {
    fs.writeFileSync(STORE_PATH, JSON.stringify(DEFAULT_STORE, null, 2), "utf8");
  }
}

function readStore() {
  ensureStoreFile();
  const raw = fs.readFileSync(STORE_PATH, "utf8");
  try {
    const parsed = JSON.parse(raw);
    // soft-merge defaults
    return {
      ...DEFAULT_STORE,
      ...parsed,
      current: { ...DEFAULT_STORE.current, ...(parsed.current || {}) },
      history: Array.isArray(parsed.history) ? parsed.history : [],
    };
  } catch {
    fs.writeFileSync(STORE_PATH, JSON.stringify(DEFAULT_STORE, null, 2), "utf8");
    return { ...DEFAULT_STORE };
  }
}

function writeStore(store) {
  ensureStoreFile();
  fs.writeFileSync(STORE_PATH, JSON.stringify(store, null, 2), "utf8");
}

export function getLiveStatus() {
  const store = readStore();
  return store.current;
}

export function startStream({ audioUrl }) {
  if (!audioUrl || typeof audioUrl !== "string") {
    throw new Error("audioUrl is required");
  }

  const store = readStore();
  store.current = {
    isLive: true,
    audioUrl,
    startedAt: new Date().toISOString(),
  };
  writeStore(store);
  return store.current;
}

export function stopStream({ savedAudioUrl }) {
  const store = readStore();

  if (!store.current.isLive) {
    return null;
  }

  const endedAt = new Date().toISOString();
  const startedAt = store.current.startedAt;

  const record = {
    id: nanoId(),
    startedAt,
    stoppedAt: endedAt,
    audioUrl: savedAudioUrl || store.current.audioUrl,
  };


  store.history.unshift(record);
  store.current = {
    isLive: false,
    audioUrl: null,
    startedAt: null,
  };

  writeStore(store);
  return record;
}

export function listHistory({ limit = 20 } = {}) {
  const store = readStore();
  const n = Number(limit);
  return store.history.slice(0, Number.isFinite(n) && n > 0 ? n : 20);
}

function nanoId() {
  return Math.random().toString(16).slice(2) + Date.now().toString(16);
}


