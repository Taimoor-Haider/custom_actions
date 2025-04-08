const core = require("@actions/core");
const github = require("@actions/github");
const exec = require("@actions/exec");

function run() {
  const bucket = core.getInput("bucket", { required: true });
  const bucketRegion = core.getInput("bucket-region", { required: true });
  const distFolder = core.getInput("dist-folder", { required: true });

  const awsUri = `s3://${bucket}`;
  exec.exec(`aws s3 sync ${distFolder} ${awsUri} --region ${bucketRegion}`);
  core.notice("Loggin onto the github action console.");

  const websiteUrl = `http://${bucket}.s3-website-${bucketRegion}.amazonaws.com`;
  core.setOutput("website-url", websiteUrl);
}

run();
