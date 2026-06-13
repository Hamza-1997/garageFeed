require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const { IAMClient, ListAttachedUserPoliciesCommand, ListUserPoliciesCommand, GetUserPolicyCommand, GetPolicyCommand, GetPolicyVersionCommand } = require('@aws-sdk/client-iam');
const config = require('../src/config');

const iamClient = new IAMClient({
  region: config.aws.region,
  credentials: {
    accessKeyId: config.aws.accessKeyId,
    secretAccessKey: config.aws.secretAccessKey,
  },
});

async function main() {
  const userName = 'garagefeed-upload-service';

  try {
    // Check attached managed policies
    const attached = await iamClient.send(new ListAttachedUserPoliciesCommand({ UserName: userName }));
    console.log('Attached managed policies:', JSON.stringify(attached.AttachedPolicies, null, 2));

    // Check inline policies
    const inline = await iamClient.send(new ListUserPoliciesCommand({ UserName: userName }));
    console.log('Inline policies:', inline.PolicyNames);

    for (const name of inline.PolicyNames || []) {
      const policy = await iamClient.send(new GetUserPolicyCommand({ UserName: userName, PolicyName: name }));
      console.log(`Inline policy "${name}":`, decodeURIComponent(policy.PolicyDocument));
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

main();
