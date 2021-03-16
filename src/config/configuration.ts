export default () => ({
  port: parseInt(process.env.PORT, 10) || 8020,
  clickUp: {
    baseUrl: process.env.ClickUpBaseUrl || 'https://api.clickup.com/api/v2',
    apiToken: process.env.ApiToken || '',
  },
  correspondenceListId: process.env.CorrespndenceListId || '',
  correspondText: process.env.CorrespondenceText || 'correspond',
});
