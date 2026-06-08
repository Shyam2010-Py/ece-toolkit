// ECE Toolkit v1 - JavaScript
// Plain vanilla JS, no dependencies.

document.addEventListener('DOMContentLoaded', function () {
    'use strict';

    // ============================
    // MOBILE MENU
    // ============================
    var menuToggle = document.getElementById('menuToggle');
    var navLinks = document.getElementById('navLinks');
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function () {
            navLinks.classList.toggle('open');
        });
        var navItems = navLinks.querySelectorAll('a');
        for (var i = 0; i < navItems.length; i++) {
            navItems[i].addEventListener('click', function () {
                navLinks.classList.remove('open');
            });
        }
    }

    // ============================
    // TOAST
    // ============================
    var toastEl = document.getElementById('toast');
    var toastTimer = null;
    function showToast(message, type) {
        if (!toastEl) return;
        if (toastTimer) clearTimeout(toastTimer);
        toastEl.textContent = message;
        toastEl.className = 'toast show';
        if (type) toastEl.classList.add(type);
        toastTimer = setTimeout(function () {
            toastEl.classList.remove('show');
        }, 2800);
    }

    function formatNumber(num) {
        if (!isFinite(num)) return '—';
        if (num === 0) return '0';
        var abs = Math.abs(num);
        if (abs >= 1e6 || abs < 0.001) {
            return num.toExponential(4);
        }
        return parseFloat(num.toFixed(4)).toString();
    }

    // ============================
    // 1) OHM'S LAW  (V = I x R)
    // ============================
    var voltageEl = document.getElementById('voltage');
    var currentEl = document.getElementById('current');
    var resistanceEl = document.getElementById('resistance');
    var calculateOhmsBtn = document.getElementById('calculateOhms');
    var resetOhmsBtn = document.getElementById('resetOhms');
    var ohmsResult = document.getElementById('ohmsResult');
    var ohmsResultText = document.getElementById('ohmsResultText');

    function parseNum(value) {
        var n = parseFloat(value);
        return isNaN(n) ? null : n;
    }

    function setOhmsResult(text, type) {
        if (!ohmsResult || !ohmsResultText) return;
        ohmsResult.classList.remove('success', 'warning', 'danger');
        if (type) ohmsResult.classList.add(type);
        ohmsResultText.textContent = text;
    }

    function calculateOhms() {
        if (!voltageEl || !currentEl || !resistanceEl) return;
        var V = parseNum(voltageEl.value);
        var I = parseNum(currentEl.value);
        var R = parseNum(resistanceEl.value);
        var provided = [V, I, R].filter(function (v) { return v !== null; }).length;

        if (provided < 2) {
            setOhmsResult('Please enter any two values to calculate the third.', 'warning');
            showToast('Enter at least two values', 'error');
            return;
        }
        if ((V !== null && V < 0) || (I !== null && I < 0) || (R !== null && R < 0)) {
            setOhmsResult('Values cannot be negative.', 'danger');
            showToast('Negative values not allowed', 'error');
            return;
        }

        if (V === null) {
            if (I === 0) {
                voltageEl.value = 0;
                setOhmsResult('Current is 0 — Voltage = 0 V', 'warning');
                return;
            }
            var v = I * R;
            voltageEl.value = formatNumber(v);
            setOhmsResult('Voltage (V) = ' + formatNumber(v) + ' V', 'success');
            showToast('Voltage calculated', 'success');
        } else if (I === null) {
            if (R === 0) {
                setOhmsResult('Resistance is 0 — short circuit (current undefined)', 'danger');
                showToast('Cannot divide by zero', 'error');
                return;
            }
            var i = V / R;
            currentEl.value = formatNumber(i);
            setOhmsResult('Current (I) = ' + formatNumber(i) + ' A', 'success');
            showToast('Current calculated', 'success');
        } else if (R === null) {
            if (I === 0) {
                setOhmsResult('Current is 0 — Resistance is undefined', 'danger');
                showToast('Cannot divide by zero', 'error');
                return;
            }
            var r = V / I;
            resistanceEl.value = formatNumber(r);
            setOhmsResult('Resistance (R) = ' + formatNumber(r) + ' Ω', 'success');
            showToast('Resistance calculated', 'success');
        } else {
            setOhmsResult('All three set. V=' + formatNumber(V) + 'V, I=' + formatNumber(I) + 'A, R=' + formatNumber(R) + 'Ω', 'success');
        }
    }

    [voltageEl, currentEl, resistanceEl].forEach(function (el) {
        if (!el) return;
        el.addEventListener('input', function () {
            if (!ohmsResult || !ohmsResultText) return;
            ohmsResultText.textContent = 'Enter any two values to begin';
            ohmsResult.classList.remove('success', 'warning', 'danger');
        });
    });

    if (calculateOhmsBtn) calculateOhmsBtn.addEventListener('click', calculateOhms);
    if (resetOhmsBtn) {
        resetOhmsBtn.addEventListener('click', function () {
            voltageEl.value = '';
            currentEl.value = '';
            resistanceEl.value = '';
            setOhmsResult('Enter any two values to begin');
        });
    }

    // ============================
    // 2) RESISTOR COLOR CODE (4-band)
    // ============================
    var colorDigits = {
        black:  { d: 0, m: 1 },
        brown:  { d: 1, m: 10 },
        red:    { d: 2, m: 100 },
        orange: { d: 3, m: 1000 },
        yellow: { d: 4, m: 10000 },
        green:  { d: 5, m: 100000 },
        blue:   { d: 6, m: 1000000 },
        violet: { d: 7, m: 10000000 },
        gray:   { d: 8, m: 100000000 },
        white:  { d: 9, m: 1000000000 }
    };

    var colorHex = {
        black: '#1a1a1a', brown: '#5d3a1a', red: '#d62828', orange: '#f77f00',
        yellow: '#fcbf49', green: '#2a9d8f', blue: '#1d4ed8', violet: '#7209b7',
        gray: '#6b7280', white: '#f3f4f6', gold: '#d4af37', silver: '#c0c0c0'
    };

    var toleranceMap = {
        brown: '±1%', red: '±2%', green: '±0.5%', blue: '±0.25%',
        violet: '±0.1%', gray: '±0.05%', gold: '±5%', silver: '±10%', none: '±20%'
    };

    var digitColors = ['black', 'brown', 'red', 'orange', 'yellow', 'green', 'blue', 'violet', 'gray', 'white'];
    var multColors = ['black', 'brown', 'red', 'orange', 'yellow', 'green', 'blue', 'violet', 'gold', 'silver'];
    var toleranceColors = ['brown', 'red', 'green', 'blue', 'violet', 'gray', 'gold', 'silver'];

    function fillSelect(sel, colors, withNone) {
        if (!sel) return;
        sel.innerHTML = '';
        for (var i = 0; i < colors.length; i++) {
            var opt = document.createElement('option');
            opt.value = colors[i];
            opt.textContent = colors[i].charAt(0).toUpperCase() + colors[i].slice(1);
            sel.appendChild(opt);
        }
        if (withNone) {
            var optNone = document.createElement('option');
            optNone.value = 'none';
            optNone.textContent = 'None';
            sel.appendChild(optNone);
        }
    }

    var b1Sel = document.getElementById('band1Color');
    var b2Sel = document.getElementById('band2Color');
    var b3Sel = document.getElementById('band3Color');
    var b4Sel = document.getElementById('band4Color');
    var b1El = document.getElementById('band1');
    var b2El = document.getElementById('band2');
    var b3El = document.getElementById('band3');
    var b4El = document.getElementById('band4');
    var resistorValueEl = document.getElementById('resistorValue');
    var resistorToleranceEl = document.getElementById('resistorTolerance');

    fillSelect(b1Sel, digitColors, false);
    fillSelect(b2Sel, digitColors, false);
    fillSelect(b3Sel, multColors, false);
    fillSelect(b4Sel, toleranceColors, true);

    if (b1Sel) b1Sel.value = 'brown';
    if (b2Sel) b2Sel.value = 'black';
    if (b3Sel) b3Sel.value = 'red';
    if (b4Sel) b4Sel.value = 'gold';

    function formatResistance(ohms) {
        if (ohms >= 1e9) return (ohms / 1e9).toFixed(2).replace(/\.?0+$/, '') + ' GΩ';
        if (ohms >= 1e6) return (ohms / 1e6).toFixed(2).replace(/\.?0+$/, '') + ' MΩ';
        if (ohms >= 1e3) return (ohms / 1e3).toFixed(2).replace(/\.?0+$/, '') + ' kΩ';
        return ohms.toFixed(2).replace(/\.?0+$/, '') + ' Ω';
    }

    function updateResistor() {
        if (!b1Sel || !b2Sel || !b3Sel || !b4Sel) return;
        var b1 = b1Sel.value, b2 = b2Sel.value, b3 = b3Sel.value, b4 = b4Sel.value;

        if (b1El) b1El.style.background = colorHex[b1] || '#1a1a1a';
        if (b2El) b2El.style.background = colorHex[b2] || '#1a1a1a';
        if (b3El) b3El.style.background = colorHex[b3] || '#1a1a1a';
        if (b4El) b4El.style.background = colorHex[b4] || '#1a1a1a';

        var d1 = colorDigits[b1].d;
        var d2 = colorDigits[b2].d;
        var mult = 1;
        if (b3 === 'gold') mult = 0.1;
        else if (b3 === 'silver') mult = 0.01;
        else mult = colorDigits[b3].m;

        var value = (d1 * 10 + d2) * mult;
        var tol = toleranceMap[b4] || '±20%';

        if (resistorValueEl) resistorValueEl.textContent = formatResistance(value);
        if (resistorToleranceEl) resistorToleranceEl.textContent = 'Tolerance: ' + tol;
    }

    [b1Sel, b2Sel, b3Sel, b4Sel].forEach(function (sel) {
        if (sel) sel.addEventListener('change', updateResistor);
    });
    updateResistor();

    // ============================
    // 3) UNIT CONVERTER
    // ============================
    var units = {
        voltage: [
            { name: 'Millivolt', short: 'mV', factor: 0.001 },
            { name: 'Volt',     short: 'V',  factor: 1 }
        ],
        current: [
            { name: 'Microampere', short: 'µA', factor: 0.000001 },
            { name: 'Milliampere', short: 'mA', factor: 0.001 },
            { name: 'Ampere',      short: 'A',  factor: 1 }
        ],
        resistance: [
            { name: 'Ohm',      short: 'Ω',  factor: 1 },
            { name: 'Kiloohm',  short: 'kΩ', factor: 1000 },
            { name: 'Megaohm',  short: 'MΩ', factor: 1000000 }
        ],
        frequency: [
            { name: 'Hertz',     short: 'Hz',  factor: 1 },
            { name: 'Kilohertz', short: 'kHz', factor: 1000 },
            { name: 'Megahertz', short: 'MHz', factor: 1000000 }
        ]
    };

    var fromValueEl = document.getElementById('fromValue');
    var toValueEl = document.getElementById('toValue');
    var fromUnitEl = document.getElementById('fromUnit');
    var toUnitEl = document.getElementById('toUnit');
    var converterResultEl = document.getElementById('converterResult');
    var converterTabs = document.getElementById('converterTabs');
    var currentType = 'voltage';

    function fillConverterUnits(type) {
        if (!fromUnitEl || !toUnitEl) return;
        var list = units[type];
        fromUnitEl.innerHTML = '';
        toUnitEl.innerHTML = '';
        for (var i = 0; i < list.length; i++) {
            var u = list[i];
            var o1 = document.createElement('option');
            o1.value = u.factor;
            o1.textContent = u.name + ' (' + u.short + ')';
            fromUnitEl.appendChild(o1);

            var o2 = document.createElement('option');
            o2.value = u.factor;
            o2.textContent = u.name + ' (' + u.short + ')';
            toUnitEl.appendChild(o2);
        }
        if (list.length > 1) toUnitEl.selectedIndex = 1;
    }

    function getShort(sel) {
        if (!sel) return '';
        var text = sel.options[sel.selectedIndex].text;
        var m = text.match(/\(([^)]+)\)/);
        return m ? m[1] : '';
    }

    function convertUnits() {
        if (!fromValueEl || !toValueEl || !fromUnitEl || !toUnitEl) return;
        var val = parseFloat(fromValueEl.value);
        if (isNaN(val)) {
            toValueEl.value = '';
            if (converterResultEl) converterResultEl.textContent = '0';
            return;
        }
        var fromF = parseFloat(fromUnitEl.value);
        var toF = parseFloat(toUnitEl.value);
        var result = (val * fromF) / toF;
        toValueEl.value = formatNumber(result);
        if (converterResultEl) {
            converterResultEl.textContent = formatNumber(val) + ' ' + getShort(fromUnitEl) +
                ' = ' + formatNumber(result) + ' ' + getShort(toUnitEl);
        }
    }

    if (converterTabs) {
        converterTabs.addEventListener('click', function (e) {
            var tab = e.target.closest('.tab');
            if (!tab) return;
            var allTabs = converterTabs.querySelectorAll('.tab');
            for (var i = 0; i < allTabs.length; i++) allTabs[i].classList.remove('active');
            tab.classList.add('active');
            currentType = tab.getAttribute('data-type');
            fillConverterUnits(currentType);
            convertUnits();
        });
    }

    [fromValueEl, fromUnitEl, toUnitEl].forEach(function (el) {
        if (!el) return;
        el.addEventListener('input', convertUnits);
        if (el.tagName === 'SELECT') el.addEventListener('change', convertUnits);
    });

    fillConverterUnits('voltage');
    if (fromValueEl) {
        fromValueEl.value = 1;
        convertUnits();
    }

    // ============================
    // 4) ATTENDANCE
    // ============================
    var attendedEl = document.getElementById('attended');
    var totalEl = document.getElementById('total');
    var calculateAttBtn = document.getElementById('calculateAttendance');
    var resetAttBtn = document.getElementById('resetAttendance');
    var attPercentageEl = document.getElementById('attPercentage');
    var attCanMissSpan = document.getElementById('attCanMiss');
    var attNeedEl = document.getElementById('attNeed');
    var attendanceResult = document.getElementById('attendanceResult');
    var attendanceStatus = document.getElementById('attendanceStatus');

    function calculateAttendance() {
        if (!attendedEl || !totalEl) return;
        var attended = parseInt(attendedEl.value, 10);
        var total = parseInt(totalEl.value, 10);

        if (isNaN(attended) || isNaN(total)) {
            if (attendanceStatus) attendanceStatus.textContent = 'Please enter both values.';
            if (attendanceResult) {
                attendanceResult.classList.remove('success', 'warning', 'danger');
                attendanceResult.classList.add('warning');
            }
            if (attPercentageEl) attPercentageEl.textContent = '—';
            if (attCanMissSpan) attCanMissSpan.textContent = '—';
            if (attNeedEl) attNeedEl.textContent = '—';
            showToast('Enter both fields', 'error');
            return;
        }

        if (attended < 0 || total <= 0) {
            if (attendanceStatus) attendanceStatus.textContent = 'Total must be greater than 0.';
            if (attendanceResult) {
                attendanceResult.classList.remove('success', 'warning', 'danger');
                attendanceResult.classList.add('danger');
            }
            showToast('Invalid values', 'error');
            return;
        }

        if (attended > total) {
            if (attendanceStatus) attendanceStatus.textContent = 'Attended cannot exceed total.';
            if (attendanceResult) {
                attendanceResult.classList.remove('success', 'warning', 'danger');
                attendanceResult.classList.add('danger');
            }
            if (attPercentageEl) attPercentageEl.textContent = '—';
            if (attCanMissSpan) attCanMissSpan.textContent = '—';
            if (attNeedEl) attNeedEl.textContent = '—';
            showToast('Invalid input', 'error');
            return;
        }

        var percentage = (attended / total) * 100;
        if (attPercentageEl) attPercentageEl.textContent = percentage.toFixed(2) + '%';

        // Classes you can miss while staying >= 75%
        var maxTotalFor75 = attended / 0.75;
        var canMiss = Math.floor(maxTotalFor75 - total);
        if (attCanMissSpan) {
            attCanMissSpan.textContent = canMiss >= 0
                ? canMiss + ' class' + (canMiss !== 1 ? 'es' : '')
                : '0 classes';
        }

        // Classes needed to reach 75%
        var need = Math.ceil(3 * total - 4 * attended);
        if (attNeedEl) {
            if (need <= 0) attNeedEl.textContent = '0 classes';
            else attNeedEl.textContent = need + ' class' + (need !== 1 ? 'es' : '');
        }

        if (attendanceResult) {
            attendanceResult.classList.remove('success', 'warning', 'danger');
            if (percentage >= 75) {
                attendanceResult.classList.add('success');
                if (attendanceStatus) {
                    attendanceStatus.textContent = 'Great! You are above 75%. You can miss up to '
                        + canMiss + ' more class' + (canMiss !== 1 ? 'es' : '') + '.';
                }
            } else {
                attendanceResult.classList.add('danger');
                if (attendanceStatus) {
                    attendanceStatus.textContent = 'Below 75%. Attend '
                        + need + ' more consecutive class' + (need !== 1 ? 'es' : '')
                        + ' to reach 75%.';
                }
            }
        }
    }

    if (calculateAttBtn) calculateAttBtn.addEventListener('click', calculateAttendance);

    if (resetAttBtn) {
        resetAttBtn.addEventListener('click', function () {
            if (attendedEl) attendedEl.value = '';
            if (totalEl) totalEl.value = '';
            if (attPercentageEl) attPercentageEl.textContent = '—';
            if (attCanMissSpan) attCanMissSpan.textContent = '—';
            if (attNeedEl) attNeedEl.textContent = '—';
            if (attendanceResult) attendanceResult.classList.remove('success', 'warning', 'danger');
            if (attendanceStatus) attendanceStatus.textContent = 'Enter your class details to begin';
        });
    }

    [attendedEl, totalEl].forEach(function (el) {
        if (!el) return;
        el.addEventListener('input', function () {
            if (attendedEl.value && totalEl.value) calculateAttendance();
        });
    });

});
