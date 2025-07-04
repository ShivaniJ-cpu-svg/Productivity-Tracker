document.getElementById('viewDashboardBtn').addEventListener('click', function () {
  // Open a new tab or navigate to the dashboard page within the extension
  chrome.tabs.create({ url: 'index.html' });  // Adjust the URL to match your app's dashboard
});

