const axios = require('axios');
const { response } = require('express');


async function getAccessToken(){
    try{
        const response = await axios.post(' https://www.wixapis.com/oauth/access',{
            grant_type : 'refresh_token',
            client_id: '4af5c3c0-4d6a-4fa0-9ed0-bf988a992428',
            client_secret: '839c425f-4571-49b1-aca2-1ea44d2eb210',
            refresh_token: 'OAUTH2.eyJraWQiOiJkZ0x3cjNRMCIsImFsZyI6IkhTMjU2In0.eyJkYXRhIjoie1wiaWRcIjpcImUwNmQ3Yjk3LTFlNDUtNDUyMi05OWZhLWE0YmEzY2ViZmE1MFwifSIsImlhdCI6MTcwNjc2Nzk3MywiZXhwIjoxNzY5ODM5OTczfQ.s0t6gId5CJq60vbL5wDyWm62qihOAdkNjSGHNneKqeo',
        })
        if (response.status === 200) {
            return response.data.access_token; // Return the new access token
        } else {
            throw new Error(`Failed to fetch new access token. Status code: ${response.status}`);
        }
    }catch(error){
        console.log(error);
        throw error;
    }
}
async function getProduct() {
    try {
        const accessToken = await getAccessToken();
    
        const response = await axios.get('https://www.wixapis.com/stores/v1/products/d99d3cc8-bc75-ec47-6c72-f713016f98f3', {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
          });
          if (response.status === 200) {
            return response.data;
          }  else {
            console.error('Failed to fetch products:', response.status, response.statusText);
            throw new Error('Failed to fetch products');
          }
        
    } catch (error) {
        console.error(error); // Use console.error for errors
        throw error; // Re-throw the error to propagate it to the caller
    }
}

module.exports = getProduct;
