// The mock insertion order: the "grocery list" every banner gets checked against.
// One object keeps the campaign details in one place, so a spec changes here only.
const campaignData = {
  advertiser: 'Orrin Strata',
  campaignName: 'EV Launch',
  ioNumber: 'IO-2026-001',
  flightStart: '2026-12-01', // First day the ads may run.
  flightEnd: '2026-12-31', // Last day the ads may run.
  maxFileKb: 150, // Maximum zipped banner weight in kilobytes.

  // Hosts this campaign accepts for files loaded from outside the .zip.
  // s0.2mdn.net is Google's ad-serving host, used by Enabler.js and its hosted libraries.
  approvedHosts: ['s0.2mdn.net'],

  // Each placement is one ad slot the campaign purchased.
  placements: [
    {id: 'PL-001', publisher: 'Publisher A', width: 300, height: 250, clickUrl: 'https://example.com/orrin-strata'},
    {id: 'PL-002', publisher: 'Publisher B', width: 728, height: 90, clickUrl: 'https://example.com/orrin-strata'},
    {id: 'PL-003', publisher: 'Publisher C', width: 160, height: 600, clickUrl: 'https://example.com/orrin-strata'}
  ]
};
