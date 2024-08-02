// apiService.js
// #This code is written by Hemant Verma
// import  React,{useContext} from "react"
// import axios from "react-native-axios";
// import { AuthContext } from "./AuthProvider";

// const BASE_URL = "https://bad-gear.com/wp-json/";

// const CatDATA = [
//   {id: '1', text: 'Bad Woman', image: require('../assets/cat1.png')},
//   {id: '2', text: 'Hats', image: require('../assets/cat2.png')},
//   {id: '3', text: '18 to Life', image: require('../assets/cat3.png')},
//   {id: '4', text: 'Bad Woman', image: require('../assets/cat1.png')},
//   {id: '5', text: 'Hats', image: require('../assets/cat2.png')},
//   {id: '6', text: '18 to Life', image: require('../assets/cat3.png')},
//   // category data
// ];


// const ApiService=()=>{
 
//   return(
//     <></>
//   )
// }


// export const getNewArrivals = async (page = 1, itemsPerPage = 10,userToken) => {
//   // const {userToken}=useContext(AuthContext)
//   console.log(userToken,"r6ftf9y6yh8yh89-uj-89u89-ui")
//   try {
//     const response = await axios.get(`${BASE_URL}new-arrivals/v1/newarrivals_home`, {
//       params: {
//         page,
//         per_page: itemsPerPage,
//       },
//       headers: {
//         'Authorization': 'Sunil|1723525490|jeaUrx6KIQ15vWSNRnXl879JySvx1Szc722a2Rzqwop|304aa22a61df94b517c2f95bd559a8cfbb2b03245331bd4d3de4c4589a5dcace',
        
//       }
//     });

//     // Log the specific data section
//     console.log('New Arrivals Data:', response?.data?.data);

//     return response.data?.data; // Return the data
    
//   } catch (error) {
//     console.log('Error fetching new arrivals:', error);
//     throw error;
//   }
// };



// export const getBestSelling = async (userToken, page = 1) => {
//   const itemsPerPage = 6;
//   const startIndex = (page - 1) * itemsPerPage;
//   try {
//     const response = await axios.get(
//       `${BASE_URL}bestselling/v1/best_selling_products`,
//       {
//         headers: {
//           'Authorization': 'Sunil|1723525490|jeaUrx6KIQ15vWSNRnXl879JySvx1Szc722a2Rzqwop|304aa22a61df94b517c2f95bd559a8cfbb2b03245331bd4d3de4c4589a5dcace',
//           'Content-Type': 'application/json',
//         },
//         params: {
//           offset: startIndex,
//           per_page: itemsPerPage,
//         },
//       },
//     );
//     // console.log(response?.data?.data)
//     return response?.data?.data; 
   
    
//   } catch (error) {
//     console.log('Error fetching new arrivals:', error);
//     throw error;
//   }
// };

// export const getCategory = async (userToken) => {
//   try {
//     const response = await axios.get(
//       `${BASE_URL}all-category/v1/categories`,
//       {
//         headers: {
//           'Content-Type': 'application/json',
//           // Authorization: `Bearer ${userToken?.accessToken}`, 
//         },
//       }
//     );
//     const categoryData = response.data.data.map((item) => {
     
//       if (!item.cat_image.trim()) {
//         const dummyData = CatDATA.find((cat) => cat.id === item.cat_id.toString());
//         if (dummyData) {
//           return {
//             ...item,
//             cat_image: dummyData.image,
//           };
//         }
//       }
//       return item;
//     });

//     return categoryData; 
//   } catch (error) {
//     console.log(error?.response, 'error');
//     throw error;
//   }
// };


// export const getBanner = async () => {
//   try {
//     const response = await axios.get(
//       `${BASE_URL}home-banner-api/v1/home_banner`,
//       {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       },
//     );
//     return response.data; // Return the data
//   } catch (error) {
//     console.log('Error fetching banner:', error);
//     throw error;
//   }
// };

// export const getWishList = async () => {
//   try {
//     const response = await axios.get(
//       `${BASE_URL}get-wishlist/v1/getWishlist`,
//       {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       },
//     );
//     const responseData = response.data; 
//     // console.log('WishList data:', responseData); // Log the data to the console
//     return responseData; 
//   } catch (error) {
//     console.log('Error fetching WishList:', error);
//     throw error;
//   }
// };



// export const getProductDetails = async (productId) => {
//   try {
//     const response = await axios.get(
//       `${BASE_URL}product-detail-api/v1/product_detail?product_id=${productId}`,
//       {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       },
//     );
//     return response.data; 
  
//   } catch (error) {
//     console.log('Error fetching product details:', error);
//     throw error;
//   }
// }


// export const AddCart = async (productId, size, quantity, price) => {
//   try {
//     const formData = new FormData();
//     formData.append('product_id', productId);
//     formData.append('size', size);
//     formData.append('quantity', quantity);
//     formData.append('price', price);

//     const response = await axios.post(
//       `${BASE_URL}add-to-cart/v1/AddToCart`,
//       formData,
//       {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       }
//     );
//     console.log("add to cart", response.data?.successmsg);
//     return response.data?.successmsg; 
//   } catch (error) {
//     console.log('Error adding product to cart:', error);
//     throw error;
//   }
// };


// api/ApiService.js
import axios from 'react-native-axios';

const BASE_URL = "https://bad-gear.com/wp-json/";

const CatDATA = [
  {id: '1', text: 'Bad Woman', image: require('../assets/cat1.png')},
  {id: '2', text: 'Hats', image: require('../assets/cat2.png')},
  {id: '3', text: '18 to Life', image: require('../assets/cat3.png')},
  {id: '4', text: 'Bad Woman', image: require('../assets/cat1.png')},
  {id: '5', text: 'Hats', image: require('../assets/cat2.png')},
  {id: '6', text: '18 to Life', image: require('../assets/cat3.png')},
];

export const getNewArrivals = async (page = 1, itemsPerPage = 10, tokenUse) => {
  console.log("tokenusee",tokenUse)

  try {
    const response = await axios.get(`${BASE_URL}new-arrivals/v1/newarrivals_home`, {
      params: {
        page,
        per_page: itemsPerPage,
      },
      headers: {
        Authorization: `${tokenUse}`, // Use the token provided
      },
    });
    console.log("responseeeeee",response.data?.data)
    return response.data?.data;
   
  } catch (error) {
    console.log('Error fetching new arrivals:', error);
    throw error;
  }
};

export const getBestSelling = async (page = 1, tokenUse) => {
  const itemsPerPage = 6;
  const startIndex = (page - 1) * itemsPerPage;
  try {
    const response = await axios.get(`${BASE_URL}bestselling/v1/best_selling_products`, {
      headers: {
        Authorization: `${tokenUse}`, // Use the token provided
        'Content-Type': 'application/json',
      },
      params: {
        offset: startIndex,
        per_page: itemsPerPage,
      },
    });
    return response.data?.data;
  } catch (error) {
    console.log('Error fetching best selling products:', error);
    throw error;
  }
};

export const getCategory = async (userToken) => {
  try {
    const response = await axios.get(`${BASE_URL}all-category/v1/categories`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`, // Use the token provided
      },
    });

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
    console.log('Error fetching categories:', error);
    throw error;
  }
};

export const getBanner = async () => {
  try {
    const response = await axios.get(`${BASE_URL}home-banner-api/v1/home_banner`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.log('Error fetching banner:', error);
    throw error;
  }
};

export const getWishList = async (userToken) => {
  try {
    const response = await axios.get(`${BASE_URL}get-wishlist/v1/getWishlist`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`, // Use the token provided
      },
    });
    return response.data;
  } catch (error) {
    console.log('Error fetching wishlist:', error);
    throw error;
  }
};

export const getProductDetails = async (productId, userToken) => {
  try {
    const response = await axios.get(`${BASE_URL}product-detail-api/v1/product_detail`, {
      params: { product_id: productId },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`, // Use the token provided
      },
    });
    return response.data;
  } catch (error) {
    console.log('Error fetching product details:', error);
    throw error;
  }
};

export const addCart = async (productId, size, quantity, price, userToken) => {
  try {
    const formData = new FormData();
    formData.append('product_id', productId);
    formData.append('size', size);
    formData.append('quantity', quantity);
    formData.append('price', price);

    const response = await axios.post(`${BASE_URL}add-to-cart/v1/AddToCart`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${userToken}`, // Use the token provided
      },
    });

    console.log("Add to cart response:", response.data?.successmsg);
    return response.data?.successmsg;
  } catch (error) {
    console.log('Error adding product to cart:', error);
    throw error;
  }
};



// apiService.js
// #This code is written by Hemant Verma

// utils/api.js
// import axios from 'react-native-axios'; // Use the standard axios package


// const BASE_URL = "https://bad-gear.com/wp-json/";

// export const ApiService = () => {
//   const userToken = useAuth();

//   const getNewArrivals = async (page = 1, itemsPerPage = 10) => {
//     const tokenToUse = userToken?.token || userToken;
//     console.log("useertoken",tokenToUse)
//     try {
//       const response = await axios.get(`${BASE_URL}new-arrivals/v1/newarrivals_home`, {
//         params: {
//           page,
//           per_page: itemsPerPage,
//         },
//         headers: {
//           Authorization: `Bearer ${tokenToUse}`,
//         },
//       });
//       console.log('Full Response Data:', response.data);
//       console.log('New Arrivals Data:', response.data?.data);
//       return response.data?.data;
//     } catch (error) {
//       console.error('Error fetching new arrivals:', error.response?.data || error.message);
//       throw error;
//     }
//   };

//   const getBestSelling = async (page = 1) => {
//     const tokenToUse = userToken?.token || userToken;
//     const itemsPerPage = 6;
//     const startIndex = (page - 1) * itemsPerPage;
//     try {
//       const response = await axios.get(`${BASE_URL}bestselling/v1/best_selling_products`, {
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${tokenToUse}`,
//         },
//         params: {
//           offset: startIndex,
//           per_page: itemsPerPage,
//         },
//       });
//       return response.data.data;
//     } catch (error) {
//       console.error('Error fetching best selling products:', error.response?.data || error.message);
//       throw error;
//     }
//   };

//   const getCategory = async () => {
//     const tokenToUse = userToken?.token || userToken;
//     try {
//       const response = await axios.get(`${BASE_URL}all-category/v1/categories`, {
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${tokenToUse}`,
//         },
//       });

//       const categoryData = response.data.data.map((item) => {
//         if (!item.cat_image?.trim()) {
//           const dummyData = CatDATA.find((cat) => cat.id === item.cat_id.toString());
//           if (dummyData) {
//             return {
//               ...item,
//               cat_image: dummyData.image,
//             };
//           }
//         }
//         return item;
//       });

//       return categoryData;
//     } catch (error) {
//       console.error('Error fetching categories:', error.response?.data || error.message);
//       throw error;
//     }
//   };

//   const getBanner = async () => {
//     try {
//       const response = await axios.get(`${BASE_URL}home-banner-api/v1/home_banner`, {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       return response.data;
//     } catch (error) {
//       console.error('Error fetching banner:', error.response?.data || error.message);
//       throw error;
//     }
//   };

//   const getWishList = async () => {
//     const tokenToUse = userToken?.token || userToken;
//     try {
//       const response = await axios.get(`${BASE_URL}get-wishlist/v1/getWishlist`, {
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${tokenToUse}`,
//         },
//       });

//       return response.data;
//     } catch (error) {
//       console.error('Error fetching wishlist:', error.response?.data || error.message);
//       throw error;
//     }
//   };

//   const getProductDetails = async (productId) => {
//     try {
//       const response = await axios.get(`${BASE_URL}product-detail-api/v1/product_detail`, {
//         params: { product_id: productId },
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       return response.data;
//     } catch (error) {
//       console.error('Error fetching product details:', error.response?.data || error.message);
//       throw error;
//     }
//   };

//   const addCart = async (productId, size, quantity, price) => {
//     const tokenToUse = userToken?.token || userToken;
//     try {
//       const formData = new FormData();
//       formData.append('product_id', productId);
//       formData.append('size', size);
//       formData.append('quantity', quantity);
//       formData.append('price', price);

//       const response = await axios.post(`${BASE_URL}add-to-cart/v1/AddToCart`, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//           Authorization: `Bearer ${tokenToUse}`,
//         },
//       });

//       console.log("Add to cart response:", response.data?.successmsg);
//       return response.data?.successmsg;
//     } catch (error) {
//       console.error('Error adding product to cart:', error.response?.data || error.message);
//       throw error;
//     }
//   };

//   return {
//     getNewArrivals,
//     getBestSelling,
//     getCategory,
//     getBanner,
//     getWishList,
//     getProductDetails,
//     addCart,
//   };
// };
