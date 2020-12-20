import React from 'react';
import { Bell } from './../primitives/Icon';

const Notifications = () => (
  <button className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
    <span className="sr-only">View notifications</span>
    <Bell className="h-6 w-6" />
  </button>
);

export default Notifications;
