// /api.ts
// This file simulates a client-side API layer that would communicate with a real backend.
// It provides the "hooks" for an end-to-end implementation. Replace the mock
// logic in these functions with actual `fetch` calls to your server endpoints.

import type { User, Course } from './types';

// In a real app, this would be your backend server's URL.
const API_BASE_URL = '/api'; 

// --- MOCK DATA ---
// This data would live in your backend database.
let mockUserDatabase: User[] = [];
const mockCourseDatabase: Course[] = [
    { id: 'course-1', title: 'Introduction to AI', videos: [{ id: 'video-1', title: 'What is AI?', description: 'A brief overview.', url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' }] },
    { id: 'course-2', title: 'Advanced React Patterns', videos: [{ id: 'video-2', title: 'Understanding Hooks', description: 'Deep dive into hooks.', url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4' }] },
];

// Helper to simulate network delay.
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));


// --- AUTHENTICATION API HOOKS ---

/**
 * HOOK 1: Social Login
 * In a real app, this is a multi-step process (OAuth 2.0).
 * 1. FRONTEND: The user clicks "Login with GitHub". The frontend redirects them to your backend.
 *    - `window.location.href = `${API_BASE_URL}/auth/github`;`
 * 2. BACKEND: Your backend handles the OAuth flow with GitHub.
 * 3. BACKEND: After successful authentication, the backend creates a session (e.g., a secure cookie)
 *    and redirects the user back to the frontend application.
 * 
 * This function SIMULATES that entire round-trip.
 */
export const apiSocialLogin = async (provider: 'github' | 'linkedin'): Promise<User> => {
    console.log(`[API MOCK] Simulating OAuth flow for ${provider}...`);
    await delay(1000);
    const email = provider === 'github' ? 'social.user@github.com' : 'social.user@linkedin.com';
    const name = provider === 'github' ? 'GitHub User' : 'LinkedIn User';
    
    let user = mockUserDatabase.find(u => u.email === email);
    if (!user) {
        user = { id: `user-${Date.now()}`, email, provider, name };
        mockUserDatabase.push(user);
        console.log(`[API MOCK] New social user created:`, user);
    } else {
        console.log(`[API MOCK] Social user logged in:`, user);
    }

    // In the real flow, the session is created on the backend. Here, we simulate it
    // by storing the user in sessionStorage so `apiCheckSession` can find it.
    sessionStorage.setItem('currentUser', JSON.stringify(user));

    return user;
};

/**
 * HOOK 2: Check Session
 * On page load, the frontend needs to ask the backend if the user is already logged in.
 */
export const apiCheckSession = async (): Promise<User | null> => {
    console.log('[API MOCK] Checking for an active session...');
    await delay(500);

    // REAL IMPLEMENTATION:
    // try {
    //   const response = await fetch(`${API_BASE_URL}/auth/me`, { credentials: 'include' });
    //   if (response.ok) return await response.json();
    //   return null;
    // } catch (error) {
    //   return null;
    // }

    // SIMULATION:
    const storedUser = sessionStorage.getItem('currentUser');
    if (storedUser) {
        console.log('[API MOCK] Session found.');
        return JSON.parse(storedUser);
    }
    console.log('[API MOCK] No active session.');
    return null;
}

/**
 * HOOK 3: Logout
 * The frontend tells the backend to destroy the current session.
 */
export const apiLogout = async (): Promise<void> => {
    console.log('[API MOCK] Logging out...');
    await delay(300);

    // REAL IMPLEMENTATION:
    // await fetch(`${API_BASE_URL}/auth/logout`, { method: 'POST', credentials: 'include' });
    
    // SIMULATION:
    sessionStorage.removeItem('currentUser');
    console.log('[API MOCK] Session destroyed.');
}


// --- DATA API HOOKS ---

/**
 * HOOK 4: Fetching Protected Data
 * This function fetches course data. A real backend would protect this endpoint,
 * requiring a valid session/authentication token to access it.
 */
export const apiGetCourses = async (): Promise<Course[]> => {
    console.log('[API MOCK] Fetching courses...');
    await delay(800);

    // REAL IMPLEMENTATION:
    // Your `fetch` call would automatically include the session cookie if you use
    // the `credentials: 'include'` option. The backend would validate this cookie.
    // const response = await fetch(`${API_BASE_URL}/courses`, { credentials: 'include' });
    // if (!response.ok) throw new Error('Failed to fetch courses');
    // return response.json();

    console.log('[API MOCK] Courses fetched successfully.');
    // Note: The URL for videos would be a real URL from your backend/CDN.
    return JSON.parse(JSON.stringify(mockCourseDatabase));
};
