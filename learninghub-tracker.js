// LearningHub activity bridge for ECE Toolkit.
// Reads a short-lived handoff code from the URL and records genuine toolkit milestones.
(function () {
  'use strict';
  var API = 'https://eqplsewompiudxibowrz.supabase.co/functions/v1/record-learning-event';
  var code = new URLSearchParams(window.location.search).get('lh_code');
  if (!code) return;

  function send(eventType, milestoneKey, metadata) {
    return fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-LearningHub-Code': code },
      body: JSON.stringify({ project_key: 'ece-toolkit', event_type: eventType, milestone_key: milestoneKey || null, page_path: location.pathname, metadata: metadata || {} })
    }).catch(function () {});
  }

  send('project_open');

  var sent = {};
  function milestone(key, metadata) {
    if (sent[key]) return;
    sent[key] = true;
    send('milestone_complete', key, metadata);
  }

  var ohms = document.getElementById('calculateOhms');
  if (ohms) ohms.addEventListener('click', function () {
    var v = document.getElementById('voltage'), i = document.getElementById('current'), r = document.getElementById('resistance');
    var count = [v && v.value, i && i.value, r && r.value].filter(function (x) { return x !== ''; }).length;
    if (count >= 2) milestone('ohms-law');
  });

  ['band1Color','band2Color','band3Color','band4Color'].forEach(function (id) {
    var el = document.getElementById(id);
    if (el) el.addEventListener('change', function () { milestone('resistor-color-code'); });
  });

  var from = document.getElementById('fromValue');
  var fromUnit = document.getElementById('fromUnit');
  var toUnit = document.getElementById('toUnit');
  [from, fromUnit, toUnit].forEach(function (el) {
    if (el) el.addEventListener('change', function () {
      if (from && from.value !== '') milestone('unit-converter');
    });
    if (el) el.addEventListener('input', function () {
      if (from && from.value !== '') milestone('unit-converter');
    });
  });
})();
