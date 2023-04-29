// Set the path to your service account key file
process.env.GOOGLE_APPLICATION_CREDENTIALS = './json/credentials.json';

// Load the @google-cloud/logging library
const { Logging } = require('@google-cloud/logging');

const projectID = "endpoints-test-384510" // change value

// Create a Logging client object
const logging = new Logging({
  projectId: projectID,
});

// Specify the name of the log containing the API request logs
const logName = `projects/${projectID}/logs/endpoints_log`;

// Specify the name of the service whose logs you want to retrieve
const serviceName = 'endpoints-test-384510.appspot.com'; // change value

// Specify the time range for the logs you want to retrieve
// const startTime = new Date(Date.now() - (24 * 60 * 60 * 1000)); // 24 hours ago
const startTime = new Date(Date.now() - (2 * 60 * 60 * 1000)); // 30 minutes ago
const endTime = new Date(); // Now

// Create a filter string to retrieve the desired logs
const filter = `resource.type="api" AND resource.labels.service="${serviceName}" AND resource.labels.method="1.endpoints_test_384510_appspot_com.AirportName" AND timestamp>="${startTime.toISOString()}" AND timestamp<="${endTime.toISOString()}"`;

// Call the getEntries method to retrieve the logs
logging.getEntries({ filter: filter }).then(([entries]) => {
  console.log(`Retrieved ${entries.length} log entries:`);
  entries.forEach((entry) => {
    // console.log(entry.toJSON());
    console.log(entry.data.http_method);
    console.log(entry.data.url);
    // console.log(entry.jsonPayload['url']);
  });
});
