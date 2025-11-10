import type { Course, Video, User } from './types';

const DB_NAME = 'lms-database';
const DB_VERSION = 3; // Incremented version for schema change
const COMPLETED_VIDEOS_STORE = 'completed_videos';

let db: IDBDatabase;

function initDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (db) {
      return resolve(db);
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = (event) => {
      console.error('Database error:', request.error);
      reject('Error opening database');
    };

    request.onsuccess = (event) => {
      db = request.result;
      resolve(db);
    };

    request.onupgradeneeded = (event) => {
      const db = request.result;
      const oldVersion = event.oldVersion;

      // New setup for v3 - only keep completed videos store
      if (!db.objectStoreNames.contains(COMPLETED_VIDEOS_STORE)) {
        db.createObjectStore(COMPLETED_VIDEOS_STORE);
      }
      
      // Clean up old object stores from previous versions
      if (oldVersion < 3 && db.objectStoreNames.contains('courses')) {
          db.deleteObjectStore('courses');
      }
      if (oldVersion < 3 && db.objectStoreNames.contains('users')) {
          db.deleteObjectStore('users');
      }
    };
  });
}

export async function saveCompletedVideos(ids: string[]): Promise<void> {
    const db = await initDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(COMPLETED_VIDEOS_STORE, 'readwrite');
        const store = transaction.objectStore(COMPLETED_VIDEOS_STORE);
        store.put(ids, 'completed'); // Use a fixed key
        transaction.oncomplete = () => resolve();
        transaction.onerror = () => reject(transaction.error);
    });
}

export async function getCompletedVideos(): Promise<string[]> {
    const db = await initDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(COMPLETED_VIDEOS_STORE, 'readonly');
        const store = transaction.objectStore(COMPLETED_VIDEOS_STORE);
        const request = store.get('completed');
        request.onsuccess = () => resolve(request.result || []);
        request.onerror = () => reject(request.error);
    });
}
