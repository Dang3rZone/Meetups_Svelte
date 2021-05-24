import { writable } from 'svelte/store';

const meetups = writable([
  {
    id: 'm1',
    title: 'Learning Svelte',
    subtitle: 'TAO FE position',
    description: 'Onboarding process',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Svelte_Logo.svg/1200px-Svelte_Logo.svg.png',
    address: 'WeWork - Paseo Castellana 77, Madrid',
    contactEmail: 'tao@test.com',
    isFavorite: false,
  },
  {
    id: 'm2',
    title: 'Learning PHP',
    subtitle: 'TAO BE position',
    description: 'Onboarding process',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/2/27/PHP-logo.svg',
    address: 'WeWork - Paseo Castellana 77, Madrid',
    contactEmail: 'tao@test.com',
    isFavorite: false,
  },
]);

const customMeetupsStore = {
  subscribe: meetups.subscribe,
  addMeetup: (meetupData) => {
    const newMeetup = {
      ...meetupData,
      id: Math.random().toString(),
      isFavorite: false,
    };
    meetups.update((items) => {
      return [newMeetup, ...items];
    });
  },
  toggleFavorite: (id) => {
    meetups.update((items) => {
      // Copy the meetup before update
      const updatedMeetup = { ...items.find((meet) => meet.id === id) };
      updatedMeetup.isFavorite = !updatedMeetup.isFavorite;
      const meetupIndex = items.findIndex((meet) => meet.id === id);
      // Copy the entire meetups
      const updatedMeetups = [...items];
      // Update the copy to array by replacing an element
      updatedMeetups[meetupIndex] = updatedMeetup;
      // Overwrite the existing meetups array so it triggers the DOM update
      return updatedMeetups;
    });
  },
};

export default customMeetupsStore;
