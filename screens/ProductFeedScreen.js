import React, { useEffect, useContext, useState } from 'react';
import { View, FlatList, Text } from 'react-native';
import { getPersonalizedFeed } from '../services/personalizationService';
import { UserContext } from '../context/UserContext';
import ProductCard from '../components/ProductCard';

const ProductFeedScreen = () => {
  const { user, token } = useContext(UserContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchFeed = async () => {
      if (user && token) {
        const feed = await getPersonalizedFeed(user._id, token);
        setProducts(feed);
      }
    };
    fetchFeed();
  }, [user, token]);

  return (
    <View>
      <Text style={{ fontSize: 24, margin: 10 }}>
        {user?.zodiac?.sunSign}'s Recommended Products
      </Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <ProductCard product={item} />}
      />
    </View>
  );
};

export default ProductFeedScreen;
