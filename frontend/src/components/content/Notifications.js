import React from 'react';
import { Bell } from './../primitives/Icon';

const Notifications = () => (
  <button className="bg-white dark:bg-gray-900 p-1 rounded-full text-gray-400 hover:text-gray-500 dark:text-gray-200 dark:hover:text-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
    <span className="sr-only">View notifications</span>
    <Bell className="h-6 w-6" />
  </button>
);

export default Notifications;
