'use client'

import React from 'react';
import { Button } from '@/components/ui/button'; 
export default function WelcomeBack() {
  return (
    <div className="flex items-center justify-center p-4 bg-blue-100 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-blue-600 mr-2">
        Hii Achiever!
      </h2>
      <span role="img" aria-label="Clap">
        👏
      </span>
      <p className="ml-2 text-gray-700">Welcome back to TallyUp</p>
    </div>
  );
}
