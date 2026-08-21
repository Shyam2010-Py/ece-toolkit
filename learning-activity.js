/* LearningHub activity bridge for ECE Toolkit. Attendance Calculator is intentionally excluded. */
(function () {
  'use strict';

  var SUPABASE_URL = 'https://eqplsewompiudxibowrz.supabase.co';
  var FUNCTION_URL = SUPABASE_URL + '/functions/v1/record-learning-event';
  var PROJECT_KEY = 'ece-toolkit';

  function getAccessToken() {
    try {
      var raw = localStorage.getItem('sb-' + new URL(SUPABASE_URL).hostname.split('.')[0] + '-auth-token');
      if (!raw) return null;
      var parsed = JSON.parse(raw);
      return parsed && parsed.access_token ? parsed.access_token : null;
    } catch (_) { return null; }
  }

  function record(eventType, milestoneKey, metadata) {
    var token = getAccessToken();
    if (!token) return;
    fetch(FUNCTION_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
      body: JSON.stringify({ project_key: PROJECT_KEY, event_type: eventType, milestone_key: milestoneKey || undefined, page_path: location.pathname, metadata: metadata || {} }),
      keepalive: true
    }).catch(function () {});
  }

  document.addEventListener('DOMContentLoaded', function () {
    record('project_open');

    var ohms = document.getElementById('calculateOhms');
    if (ohms) ohms.addEventListener('click', function () {
      var result = document.getElementById('ohmsResultText');
      if (result && result.textContent && result.textContent.indexOf('Please enter') === -1) record('milestone_complete', 'ohms-law');
    });

    ['band1Color','band2Color','band3Color','band4Color'].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.addEventListener('change', function () {
        var b1 = document.getElementById('band1Color');
        var b2 = document.getElementById('band2Color');
        var b3 = document.getElementById('band3Color');
        if (b1 && b2 && b3 && b1.value && b2.value && b3.value) record('milestone_complete', 'resistor-color-code');
      });
    });

    var converter = document.getElementById('converterResult');
    var fromValue = document.getElementById('fromValue');
    if (converter && fromValue) fromValue.addEventListener('input', function () {
      if (converter.textContent && converter.textContent !== '0') record('milestone_complete', 'unit-converter');
    });
  });
})();
