'use strict';

const { v4: uuidv4 } = require('uuid');

/**
 * Seed a small, realistic analytics dataset so the dashboard has something to
 * show immediately. Safe to undo via `db:seed:undo:all`.
 */
module.exports = {
  async up(queryInterface) {
    const now = Date.now();
    const daysAgo = (d) => new Date(now - d * 24 * 60 * 60 * 1000);

    // --- Visitors -------------------------------------------------------
    const visitors = [
      {
        id: uuidv4(),
        name: 'Aarav Mehta',
        designation: 'Engineering Manager',
        company: 'Stripe',
        email: 'aarav@stripe.com',
        linkedin: 'https://linkedin.com/in/aarav',
        phone: null,
        notes: 'Interested in backend roles.',
        createdAt: daysAgo(3),
        updatedAt: daysAgo(3),
      },
      {
        id: uuidv4(),
        name: 'Priya Nair',
        designation: 'Technical Recruiter',
        company: 'Vercel',
        email: 'priya@vercel.com',
        linkedin: 'https://linkedin.com/in/priya',
        phone: '+1-555-0100',
        notes: null,
        createdAt: daysAgo(1),
        updatedAt: daysAgo(1),
      },
    ];
    await queryInterface.bulkInsert('visitors', visitors);

    // --- Sessions -------------------------------------------------------
    const sessions = [
      {
        id: uuidv4(),
        visitorId: visitors[0].id,
        sessionId: uuidv4(),
        ipAddress: '203.0.113.10',
        country: 'United States',
        city: 'San Francisco',
        region: 'CA',
        browser: 'Chrome',
        browserVersion: '126.0',
        operatingSystem: 'macOS',
        device: 'MacBook',
        deviceType: 'desktop',
        screenResolution: '2560x1440',
        language: 'en-US',
        timezone: 'America/Los_Angeles',
        landingPage: '/',
        referrer: 'https://google.com',
        userAgent: 'Mozilla/5.0 (Macintosh)',
        visitDuration: 240,
        createdAt: daysAgo(3),
      },
      {
        id: uuidv4(),
        visitorId: visitors[1].id,
        sessionId: uuidv4(),
        ipAddress: '198.51.100.20',
        country: 'India',
        city: 'Bengaluru',
        region: 'KA',
        browser: 'Firefox',
        browserVersion: '127.0',
        operatingSystem: 'Windows',
        device: 'PC',
        deviceType: 'desktop',
        screenResolution: '1920x1080',
        language: 'en-IN',
        timezone: 'Asia/Kolkata',
        landingPage: '/projects',
        referrer: 'https://linkedin.com',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0)',
        visitDuration: 15,
        createdAt: daysAgo(1),
      },
    ];
    await queryInterface.bulkInsert('visitor_sessions', sessions);

    // --- Events ---------------------------------------------------------
    await queryInterface.bulkInsert('visitor_events', [
      {
        id: uuidv4(),
        visitorId: visitors[0].id,
        sessionId: sessions[0].sessionId,
        page: '/',
        action: 'VIEW_HOME',
        metadata: JSON.stringify({}),
        createdAt: daysAgo(3),
      },
      {
        id: uuidv4(),
        visitorId: visitors[0].id,
        sessionId: sessions[0].sessionId,
        page: '/projects',
        action: 'OPEN_PROJECT',
        metadata: JSON.stringify({ projectName: 'Buildify' }),
        createdAt: daysAgo(3),
      },
      {
        id: uuidv4(),
        visitorId: visitors[0].id,
        sessionId: sessions[0].sessionId,
        page: '/',
        action: 'DOWNLOAD_RESUME',
        metadata: JSON.stringify({}),
        createdAt: daysAgo(3),
      },
      {
        id: uuidv4(),
        visitorId: visitors[1].id,
        sessionId: sessions[1].sessionId,
        page: '/projects',
        action: 'CLICK_GITHUB',
        metadata: JSON.stringify({}),
        createdAt: daysAgo(1),
      },
    ]);

    // --- Contacts -------------------------------------------------------
    await queryInterface.bulkInsert('contacts', [
      {
        id: uuidv4(),
        visitorId: visitors[0].id,
        sessionId: sessions[0].sessionId,
        name: 'Aarav Mehta',
        email: 'aarav@stripe.com',
        company: 'Stripe',
        designation: 'Engineering Manager',
        phone: null,
        subject: 'Backend role',
        message: 'Would love to chat about a backend opening.',
        ipAddress: '203.0.113.10',
        status: 'new',
        createdAt: daysAgo(3),
        updatedAt: daysAgo(3),
      },
    ]);
  },

  async down(queryInterface) {
    // Order matters due to FKs.
    await queryInterface.bulkDelete('contacts', null, {});
    await queryInterface.bulkDelete('visitor_events', null, {});
    await queryInterface.bulkDelete('visitor_sessions', null, {});
    await queryInterface.bulkDelete('visitors', null, {});
  },
};
