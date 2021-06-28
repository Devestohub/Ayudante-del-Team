// Author: Hugovidafe-OSS <hugo.vidal.ferre@gmail.com>
// Ayudante-del-Team (c) 2021
// Created: 05/17/2021 16:03

const { GraphQLClient } = require('graphql-request');

const API = new GraphQLClient('https://graphql.anilist.co', {
  redirect: 'follow',
});

module.exports = (query, variables) =>
  API.request(query, variables)
    .then((data) => data)
    .catch((error) => ({ error: error.response.errors[0] || 'Unknown Error' }));
