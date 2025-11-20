import React, { useState } from 'react';
import type { User } from '../types';
import { GitHubIcon, LinkedInIcon } from './icons';
import Logo from './Logo';

interface AuthPageProps {
    onSocialLogin: (provider: 'github' | 'linkedin') => Promise<User>;
}

const AuthPage: React.FC<AuthPageProps> = ({ onSocialLogin }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSocialClick = async (provider: 'github' | 'linkedin') => {
        setIsLoading(true);
        setError(null);
        try {
            const user = await onSocialLogin(provider);
            // Log the user via our API
            try {
                await fetch('/api/logUser', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name: user.name, email: user.email, provider }),
                });
            } catch (e) {
                console.warn('Failed to log user to server', e);
            }
            // On success, parent component will handle redirect
        } catch (err: any) {
            setError(err.message || 'An unexpected error occurred.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
            <div className="w-full max-w-sm">
                <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl shadow-2xl p-8 border border-slate-200/20">
                    <div className="flex flex-col items-center text-center mb-8">
                        <Logo className="h-12 w-12 text-sky-500 mb-2" />
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                            Sign In to Get Started
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400 mt-1">
                            Use your favorite social account to access your courses.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <button
                            onClick={() => handleSocialClick('github')}
                            disabled={isLoading}
                            className="flex items-center justify-center gap-3 w-full px-4 py-3 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold rounded-md hover:bg-slate-200 dark:hover:bg-slate-600 transition disabled:opacity-50 disabled:cursor-not-allowed">
                            <GitHubIcon className="h-5 w-5" /> Sign In with GitHub
                        </button>
                        <button
                            onClick={() => handleSocialClick('linkedin')}
                            disabled={isLoading}
                            className="flex items-center justify-center gap-3 w-full px-4 py-3 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold rounded-md hover:bg-slate-200 dark:hover:bg-slate-600 transition disabled:opacity-50 disabled:cursor-not-allowed">
                            <LinkedInIcon className="h-5 w-5" /> Sign In with LinkedIn
                        </button>
                    </div>

                    {error && <p className="text-red-500 text-sm text-center mt-4">{error}</p>}
                </div>
                <p className="text-xs text-center text-slate-400 dark:text-slate-500 mt-6">
                    <strong>Note:</strong> This is a demonstration. Clicking a button simulates a successful login without contacting a real provider.
                </p>
            </div>
        </div>
    );
};

export default AuthPage;
