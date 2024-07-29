// apiService.js
// #This code is written by Hemant Verma
import axios from "react-native-axios";

const BASE_URL = "https://bad-gear.com/wp-json/";

const CatDATA = [
  {id: '1', text: 'Bad Woman', image: require('../assets/cat1.png')},
  {id: '2', text: 'Hats', image: require('../assets/cat2.png')},
  {id: '3', text: '18 to Life', image: require('../assets/cat3.png')},
  {id: '4', text: 'Bad Woman', image: require('../assets/cat1.png')},
  {id: '5', text: 'Hats', image: require('../assets/cat2.png')},
  {id: '6', text: '18 to Life', image: require('../assets/cat3.png')},
  // category data
];

// export const getNewArrivals = async (userToken, page = 1) => {
//   const itemsPerPage = 6;
//   const startIndex = (page - 1) * itemsPerPage;
//   try {
//     const response = await axios.get(
//       `${BASE_URL}new-arrivals/v1/newarrivals_home`,
//       {
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${userToken?.accessToken}`,
//         },
//         params: {
//           offset: startIndex,
//           per_page: itemsPerPage,
//         },
//       },
//     );
  
//     return response.data.data; // Return the data
    
//   } catch (error) {
//     console.log('Error fetching new arrivals:', error);
//     throw error;
//   }
// };








export const getNewArrivals = async (page = 1, itemsPerPage = 10) => {
  try {
    const response = await axios.get(
      `${BASE_URL}new-arrivals/v1/newarrivals_home`,
      {
        params: {
          page,
          per_page: itemsPerPage,
        },
      },
    );

    return response.data.data; // Return the data
    
  } catch (error) {
    console.log('Error fetching new arrivals:', error);
    throw error;
  }
};



export const getBestSelling = async (userToken, page = 1) => {
  const itemsPerPage = 6;
  const startIndex = (page - 1) * itemsPerPage;
  try {
    const response = await axios.get(
      `${BASE_URL}bestselling/v1/best_selling_products`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        params: {
          offset: startIndex,
          per_page: itemsPerPage,
        },
      },
    );
  
    return response.data.data; 
    
  } catch (error) {
    console.log('Error fetching new arrivals:', error);
    throw error;
  }
};

export const getCategory = async (userToken) => {
  try {
    const response = await axios.get(
      `${BASE_URL}all-category/v1/categories`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken?.accessToken}`, 
        },
      }
    );
    const categoryData = response.data.data.map((item) => {
     
      if (!item.cat_image.trim()) {
        const dummyData = CatDATA.find((cat) => cat.id === item.cat_id.toString());
        if (dummyData) {
          return {
            ...item,
            cat_image: dummyData.image,
          };
        }
      }
      return item;
    });

    return categoryData; 
  } catch (error) {
    console.log(error?.response, 'error');
    throw error;
  }
};


export const getBanner = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}home-banner-api/v1/home_banner`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    return response.data; // Return the data
  } catch (error) {
    console.log('Error fetching banner:', error);
    throw error;
  }
};

export const getWishList = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}get-wishlist/v1/getWishlist`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    const responseData = response.data; 
    // console.log('WishList data:', responseData); // Log the data to the console
    return responseData; 
  } catch (error) {
    console.log('Error fetching WishList:', error);
    throw error;
  }
};



export const getProductDetails = async (productId) => {
  try {
    const response = await axios.get(
      `${BASE_URL}product-detail-api/v1/product_detail?product_id=${productId}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    return response.data; 
  
  } catch (error) {
    console.log('Error fetching product details:', error);
    throw error;
  }
}


export const AddCart = async (productId, size, quantity, price) => {
  try {
    const formData = new FormData();
    formData.append('product_id', productId);
    formData.append('size', size);
    formData.append('quantity', quantity);
    formData.append('price', price);

    const response = await axios.post(
      `${BASE_URL}add-to-cart/v1/AddToCart`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    console.log("add to cart", response.data?.successmsg);
    return response.data?.successmsg; 
  } catch (error) {
    console.log('Error adding product to cart:', error);
    throw error;
  }
};




// export const AddWishlist = async (productId) => {
//   console.log("product_id", productId);
//   try {
//     const response = await axios.post(
//       `${BASE_URL}add-product-wishlist/v1/addProductWishlist?product_id=${productId}`,
//       {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       },
//     );
//     console.log("add & Remove", response.data);
//     return response.data; // Return the data
//   } catch (error) {
//     console.error('Error adding product to Wishlist:', error);
//     throw error;
//   }
// };
