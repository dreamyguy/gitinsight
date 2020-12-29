import gravatar from 'gravatar';

// Resolve gravatar url
export const getAvatarFromEmail = email => gravatar.url(email, { s: '200', d: 'retro' });
