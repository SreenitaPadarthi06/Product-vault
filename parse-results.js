const fs = require('fs');
const path = require('path');

const resultsDir = path.join(__dirname, 'results');

function parseReport(filePath) {
  try {
    const report = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const audits = report.audits;
    return {
      file: path.basename(filePath),
      TTFB: audits['server-response-time']
        ? audits['server-response-time'].numericValue.toFixed(2)
        : 'N/A',
      FCP: audits['first-contentful-paint']
        ? audits['first-contentful-paint'].numericValue.toFixed(2)
        : 'N/A',
      LCP: audits['largest-contentful-paint']
        ? audits['largest-contentful-paint'].numericValue.toFixed(2)
        : 'N/A',
      TTI: audits['interactive']
        ? audits['interactive'].numericValue.toFixed(2)
        : 'N/A',
      TBT: audits['total-blocking-time']
        ? audits['total-blocking-time'].numericValue.toFixed(2)
        : 'N/A',
      CLS: audits['cumulative-layout-shift']
        ? audits['cumulative-layout-shift'].numericValue.toFixed(3)
        : 'N/A',
      Score: report.categories && report.categories.performance
        ? (report.categories.performance.score * 100).toFixed(0)
        : 'N/A',
    };
  } catch (err) {
    console.error(`Error parsing ${filePath}: ${err.message}`);
    return null;
  }
}

function printTable(results) {
  const header = [
    'Report',
    'Score',
    'TTFB (ms)',
    'FCP (ms)',
    'LCP (ms)',
    'TTI (ms)',
    'TBT (ms)',
    'CLS',
  ];

  const colWidths = header.map((h, i) => {
    const maxDataWidth = results.reduce((max, r) => {
      const vals = [r.file, r.Score, r.TTFB, r.FCP, r.LCP, r.TTI, r.TBT, r.CLS];
      return Math.max(max, String(vals[i]).length);
    }, 0);
    return Math.max(h.length, maxDataWidth) + 2;
  });

  const separator = colWidths.map((w) => '-'.repeat(w)).join('+');

  const formatRow = (vals) =>
    vals.map((v, i) => String(v).padEnd(colWidths[i])).join('|');

  console.log('\n========================================');
  console.log('  LIGHTHOUSE PERFORMANCE RESULTS');
  console.log('========================================\n');

  console.log(formatRow(header));
  console.log(separator);

  results.forEach((r) => {
    console.log(
      formatRow([r.file, r.Score, r.TTFB, r.FCP, r.LCP, r.TTI, r.TBT, r.CLS])
    );
  });

  console.log('\n');

  // Print comparison summary
  const groups = {
    CSR: results.filter((r) => r.file.toLowerCase().includes('csr')),
    SSR: results.filter((r) => r.file.toLowerCase().includes('ssr')),
    SSG: results.filter((r) => r.file.toLowerCase().includes('ssg')),
  };

  console.log('========================================');
  console.log('  STRATEGY COMPARISON SUMMARY');
  console.log('========================================\n');

  const summaryHeader = ['Metric', 'CSR', 'SSR', 'SSG (ISR 60s)'];
  const summaryColWidths = [22, 14, 14, 16];

  const formatSummaryRow = (vals) =>
    vals.map((v, i) => String(v).padEnd(summaryColWidths[i])).join('|');

  console.log(formatSummaryRow(summaryHeader));
  console.log(summaryColWidths.map((w) => '-'.repeat(w)).join('+'));

  const getMedian = (arr) => {
    if (arr.length === 0) return 'N/A';
    const sorted = [...arr].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 === 0
      ? ((sorted[mid - 1] + sorted[mid]) / 2).toFixed(2)
      : sorted[mid].toFixed(2);
  };

  const metrics = ['Score', 'TTFB', 'FCP', 'LCP', 'TTI', 'TBT', 'CLS'];
  const metricLabels = [
    'Perf Score (Desktop)',
    'TTFB (ms)',
    'FCP (ms)',
    'LCP (ms)',
    'TTI (ms)',
    'TBT (ms)',
    'CLS',
  ];

  metrics.forEach((metric, idx) => {
    const vals = {};
    Object.keys(groups).forEach((strategy) => {
      const numericVals = groups[strategy]
        .map((r) => parseFloat(r[metric]))
        .filter((v) => !isNaN(v));
      vals[strategy] = getMedian(numericVals);
    });
    console.log(
      formatSummaryRow([
        metricLabels[idx],
        vals.CSR,
        vals.SSR,
        vals.SSG,
      ])
    );
  });

  console.log('\n✅ Results parsed successfully.\n');
}

// Main execution
if (!fs.existsSync(resultsDir)) {
  console.error('Error: results/ directory not found.');
  process.exit(1);
}

const jsonFiles = fs
  .readdirSync(resultsDir)
  .filter((f) => f.endsWith('.json'))
  .sort();

if (jsonFiles.length === 0) {
  console.error('Error: No JSON files found in results/ directory.');
  process.exit(1);
}

console.log(`Found ${jsonFiles.length} Lighthouse report(s) in results/\n`);

const results = [];

jsonFiles.forEach((file) => {
  const filePath = path.join(resultsDir, file);
  const parsed = parseReport(filePath);
  if (parsed) {
    results.push(parsed);
  }
});

if (results.length > 0) {
  printTable(results);
} else {
  console.error('Error: Could not parse any reports.');
  process.exit(1);
}
