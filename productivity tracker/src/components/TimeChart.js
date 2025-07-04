import React from 'react';
import DonutChart from 'react-donut-chart'; // Ensure the package is installed
import './TimeChart.css';

class TimeChart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            siteData: []  // Site data will hold the chart information
        };
    }

    // Sort keys based on time spent (descending order)
    sort_keys(obj) {
        var domain_keys = Object.keys(obj).sort((a, b) => obj[b] - obj[a]).reverse();
        return domain_keys;
    }

    // Format time spent (in seconds) to a readable format
    format_seconds(seconds) {
        if (!seconds) {
            return "0 s";
        }

        if (seconds < 60) {
            return seconds + " s";
        } else if (seconds >= 60 && seconds < 3600) {
            return Math.floor(seconds / 60) + " m " + seconds % 60 + " s";
        } else if (seconds > 3600) {
            var hour = Math.floor(seconds / 3600);
            var minute = Math.floor((seconds - hour * 3600) / 60);
            return hour + " h " + minute + " m " + seconds % 60 + " s";
        }
    }

    // Classify websites as productive or unproductive
    classifyWebsite(domain) {
        const productiveSites = ["github.com", "stackoverflow.com", "google.com"];
        return productiveSites.includes(domain) ? 'productive' : 'unproductive';
    }

    // Fetch data from local storage and categorize it
    componentDidMount() {
        const data = [];
        const domains = JSON.parse(localStorage.getItem('today_domains') || '{}'); // Check localStorage for data
        const domain_keys = this.sort_keys(domains);  // Sort the domains based on time spent

        domain_keys.forEach(domain => {
            const siteData = {
                label: domain,
                value: domains[domain],
                category: this.classifyWebsite(domain),
            };
            data.push(siteData);
        });

        // Set the state with the fetched and classified data
        this.setState({ siteData: data });
    }

    render() {
        // Mapping site data to pass into the donut chart
        const chartData = this.state.siteData.map(entry => ({
            label: entry.label,
            value: entry.value,
            category: entry.category,
            color: entry.category === 'productive' ? '#36a2eb' : '#ff6384',  // Blue for productive, Red for unproductive
            timeSpent: this.format_seconds(entry.value),  // Add time spent as a human-readable format
        }));

        return (
            <div className="time-chart-section">
                <div className="time-chart-heading">Today's Usage</div>
                <DonutChart
                    className="time-chart"
                    data={chartData}
                    height={1000 / 3}
                    width={1000 / 3}
                    innerRadius={0.6}
                    colors={chartData.map(entry => entry.color)}  // Apply colors based on classification
                    legend={false}
                    onClick={(e) => {
                        // Optional: Handle chart click events (e.g., show more details)
                        alert(`You spent ${e.value} seconds on ${e.label} (${e.category})`);
                    }}
                    tooltip={({ value, label }) => (
                        `${label}: ${this.format_seconds(value)} (${chartData.find((entry) => entry.label === label).category})`
                    )}
                />
            </div>
        );
    }
}

export default TimeChart;

