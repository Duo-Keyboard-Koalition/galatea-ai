"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { register } from '@/lib/auth';
import { useRouter } from 'next/navigation';

export default function SignUpForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    displayName: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await register(formData.email, formData.password, formData.displayName);
      router.push('/profile-setup');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-earth-800">Create an Account</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-earth-700 mb-1">
            Display Name
          </label>
          <input
            type="text"
            name="displayName"
            value={formData.displayName}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-rose-500 focus:outline-none"
            placeholder="Your name"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-earth-700 mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-rose-500 focus:outline-none"
            placeholder="you@example.com"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-earth-700 mb-1">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength={6}
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-rose-500 focus:outline-none"
            placeholder="At least 6 characters"
          />
        </div>
        
        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-rose-600 hover:bg-rose-700 text-white py-2 rounded transition-colors"
        >
          {loading ? 'Creating Account...' : 'Sign Up'}
        </Button>
      </form>
    </div>
  );
}
