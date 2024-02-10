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
        const accessToken = await getAccessToken(); // Replace with your access token retrieval logic
    
        let allProducts = [];
        let hasMorePages = true;
        let offset = 0; // Starting offset for pagination
    
        while (hasMorePages) {
          const response = await axios.post('https://www.wixapis.com/stores/v1/products/query', {
            limit: 100, // Maximum allowed products per request
            offset: offset
          }, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'application/json'
            }
          });
    
          if (response.status === 200) {
            const products = response.data.products;
            allProducts = allProducts.concat(products);
            hasMorePages = response.data.hasMore;
            offset += products.length;
    
          } else {
            console.error('Failed to fetch products:', response.status, response.statusText);
            throw new Error('Failed to fetch products');
          }
        }
        return allProducts;
    
      } catch (error) {
        console.error(error);
        throw error; // Re-throw the error for proper handling
      }
}

async function getOrder() {
    try {
        const accessToken = await getAccessToken();
        
        const response = await axios.post('https://www.wixapis.com/stores/v2/orders/query', {}, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'application/json'
            }
          });
        return response.data;

    }catch(error){
        console.log(error);
        throw error;
    }
}

async function getCollection()
{
    try {
      const accessToken = await getAccessToken();

      let allCollection = [];
      let hasMorePages = true;
      let offset = 0;

      while(hasMorePages) {
        const response = await axios.post('https://www.wixapis.com/stores/v1/collections/query',{
          limit: 100,
          offset: offset
        },{
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        });
        if (response.status === 200) {
            const  collections  = response.data.collections;
            allCollection = allCollection.concat(collections);
            hasMorePages = response.data.hasMore;
            offset += collections.length;
        } else {
            console.log('Failed to fetch collections:', response.status, response.statusText);
            throw Error('Failded to fetch collections');
        }
        
      }
      return allCollection;
    } catch(console) {

    }
} 

async function createProduct(productData) {
  try {
    const accessToken = await getAccessToken(); // Assume getAccessToken() function is defined elsewhere
    console.log(productData);
    const options = {
      method: 'POST',
      url: `https://www.wixapis.com/stores/v1/products`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      data: productData,
    };

    const response = await axios(options);
    console.log('Product created:', response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('Error creating product:', error.response.data);
    } else {
      console.error('Error creating product:', error.message);
    }
    throw error;
  }
}
async function updateproduct(productId,productData) {
  try {
     const accessToken = await getAccessToken();
     const options = {
      method: 'PATCH',
      url: `https://www.wixapis.com/stores/v1/products/${productId}`,
      data: productData, 
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    };
    console.log(response);

    try {
      const response = await axios(options);
      return response.data;
    } catch(error) {
      console.log(error);
    }
    
     
  } catch (error) {
    console.log(error);
  }
}

async function deleteproduct(productId) {
  try {
    const accessToken = await getAccessToken();
    const response  = await axios.delete(`https://www.wixapis.com/stores/v1/products/${productId}`,{
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
  
}
module.exports = {
    getProduct : getProduct,
    getOrder : getOrder,
    collectionResponse : getCollection,
    update_platform_Product: updateproduct,
    delete_platform_Product: deleteproduct,
    createPlatformProduct: createProduct
}