import { describe, expect, it } from 'vitest';
import { Announcer } from './Announcer.js';

describe('Announcer', () => {
  it('annonce un message dans une région aria-live', async () => {
    Announcer.announce('Bonjour');
    await new Promise((resolve) => setTimeout(resolve, 30));
    const region = document.body.querySelector('[aria-live]');
    expect(region).toBeTruthy();
    expect(region?.textContent).toBe('Bonjour');
    Announcer.destroy();
  });
});
