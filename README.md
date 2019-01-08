
## Steps
1. Run `npm install`
1. Run `npm run start`
1. Fill in the values for MY_EMAIL, SOME_OTHER_EMAIL, HELLO_SIGN_API_KEY in the `index.js` file.
1. Do a POST request to `http://localhost:3000/sign` in Postman. Use `form-data` option in Postman. Set key as `templates` and upload the `example.pdf` file from the root of this folder.
1. Send request
1. View webhook payload by clicking this [link](https://ap-southeast-2.console.aws.amazon.com/cloudwatch/home?region=ap-southeast-2#logStream:group=/aws/lambda/docusign-webhook) if need be.

