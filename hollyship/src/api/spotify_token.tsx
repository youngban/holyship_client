// import base64 from 'react-native-base64';
// import axios from 'axios';

// const apiPrefix = 'https://accounts.spotify.com/api';
// const client_id = '5857704a29714e39bc200eac4208023b';
// const client_secret = '680ef3eb060c4f55b87ca5fd5b8b69f3';

// const base64credentials = base64.encode(`${client_id}:${client_secret}`);

// const apiOptions: object = {
//   method: 'POST',
//   headers: {
//     Authoriztion: `Basic ${base64credentials}`,
//     'Content-Type': 'application/x-www-form-urlencoded',
//   },
//   body: 'grant_type=client_credentials',
//   url: `${apiPrefix}/token`,
// };

// const spotify_token = async () => {
//   console.log('TOKEN BEGIN...!');
//   const res: any = await axios(apiOptions);
//   const json = await res.json();
//   const newToken = json.access_token;
//   console.log(`[ACCESS_TOKEN] : ${newToken}`);
//   return newToken;
// };

// export default spotify_token;
