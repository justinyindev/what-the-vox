import { GraphQLClient } from "graphql-request";

const endpoint = `${process.env.REACT_APP_API}/graphql`;

export const getHeadlines = async (startDate, endDate, page, limit) => {
  const client = new GraphQLClient(endpoint);
  if (startDate && endDate) {
    startDate = new Date(startDate).toISOString();
    endDate = new Date(endDate).toISOString();
  }

  const query = `
  query GetHeadlines($startDate: String, $endDate: String, $page: Int, $limit: Int) {
    headlines(startDate: $startDate, endDate: $endDate, page: $page, limit: $limit) {
      headlines {
        _id
        title
        url
        date
        image
        summary
      }
      pageInfo {
        currentPage
        totalPages
      }
    }
  }
`;

  const variables = {
    startDate,
    endDate,
    page,
    limit,
  };

  const data = await client.request(query, variables);
  return data.headlines;
};

export const login = async (username, password) => {
  const client = new GraphQLClient(endpoint);
  const mutation = `
    mutation Login($username: String!, $password: String!){
      login(username: $username, password: $password){
        userId
        token
        tokenExpiration
      }
    }`
  
  const variables = {
    username,
    password
  }

  const data = await client.request(mutation, variables);

  return data.login;
};

export const createUser = async (userInput) => {
  const client = new GraphQLClient(endpoint);
  const mutation = `
    mutation CreateUser($userInput: UserInput){
      createUser(userInput: $userInput){
        user_id
        username
        liked_articles
      }
    }
  `;

  const variables = {
    userInput
  };

  const data = await client.request(mutation, variables);

  return data.createUser;
};
