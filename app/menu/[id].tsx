import { images } from "@/constants";
import useCartStore from "@/store/cart.store";
import useCutomizationStore from "@/store/customization.store";
import useMenuStore from "@/store/menu.store";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

type Params = {
  id: string;
};

const MenuDetail = () => {
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams();
  const { topping, side, fetCustomization } = useCutomizationStore();
  const { detail, fetchDetail } = useMenuStore();
  const [quantity, setQuantity] = useState(1);
  const { id } = useLocalSearchParams<Params>();

  const { addToCart, addOption, cart } = useCartStore();

  useEffect(() => {
    fetCustomization();
  }, []);

  useEffect(() => {
    if (!id) return;
    useMenuStore.setState({ detail: null });
    fetchDetail(id);
  }, [id]);


  const changeQty = (text: string) => {
    const num = parseInt(text, 10);
    if (!isNaN(num)) setQuantity(num);
    else setQuantity(0);
    if (num > 99) setQuantity(99);
  };

  const qtyRange = (type = "plus") => {
    setQuantity((prev) =>
      type == "plus"
        ? prev < 99
          ? prev + 1
          : prev
        : prev > 1
          ? prev - 1
          : prev,
    );
  };

  const increase = () => qtyRange("plus");
  const decrease = () => qtyRange("minus");

  const handleAddToCart = () => {
    addToCart({ id: detail?.id, title: detail?.name, qty: quantity, image: detail?.image_url, price: detail?.price });
    Alert.alert("Add to cart success!");
  };

  const handleAddOption = (idOption: string) => {
    const check = cart.find(item => item.id == detail?.id)
    if(!check){
      Alert.alert('You must add product to cart to add more options.')
    } else {
      addOption({ id: detail?.id, idOption: idOption, qty: 1 });
    }
  };

  const countOption = (productId: string, optionId: string) => {
    const cartItem = cart.find(item => item.id == detail?.id)
    if (!cartItem) return 0;
    const optionItem = cartItem.options.find(op => op.id === optionId);

    return optionItem?.qty ?? 0;
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <SafeAreaView className="bg-[#FAFAFA] flex-1 relative">
        <ScrollView className="flex-1 relative">
          <View className="flex-between flex-row mt-5 items-center px-5">
            <Pressable onPress={() => router.back()}>
              <Image
                source={images.arrowBack}
                className="size-5"
                resizeMode="contain"
              />
            </Pressable>
            <Pressable onPress={() => router.back()}>
              <Image
                source={images.search}
                key={detail?.id}
                className="size-6"
                resizeMode="contain"
              />
            </Pressable>
          </View>
          <View className="mt-8 flex-row justify-between pl-5">
            <View className="w-[42%]">
              <Text className="font-bold text-2xl">{detail?.name}</Text>
              <Text className="text-md mt-3 text-gray-400">Cheeseburger</Text>
              <View className="mt-5 flex-row">
                <View className="flex-row">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Image
                      key={index}
                      source={images.star}
                      className="size-5"
                      style={{
                        tintColor: index < detail?.rating ? "#FE8C00" : "#ccc",
                      }}
                    />
                  ))}
                </View>
                <Text className="ml-4">{detail?.rating}/5</Text>
              </View>
              <View className="flex-row mt-5 items-center">
                <Image
                  source={images.dollar}
                  className="size-10"
                  resizeMode="contain"
                />
                <Text className="text-xl font-bold">{detail?.price}</Text>
              </View>
              <View className="flex-row mt-6">
                <View>
                  <Text className="text-gray-500">Calories</Text>
                  <Text className="font-bold">{detail?.calories} Cal</Text>
                </View>
                <View className="ml-5">
                  <Text className="text-gray-500">Protein</Text>
                  <Text className="font-bold">{detail?.protein}g</Text>
                </View>
              </View>
              <View className="mt-5">
                <Text className="text-gray-500">Bun Type</Text>
                <Text className="font-bold">Whole Wheat</Text>
              </View>
            </View>
            <View className="w-[54%] flex-row flex-start items-start">
              <Image
                source={{ uri: detail?.image_url }}
                className="size-80"
                resizeMode="contain"
              />
            </View>
          </View>

          <View className="px-5 pb-28">
            <View className="flex-between flex-row item mt-5 bg-[#FE8C000D] px-5 py-5 rounded-[50px]">
              <View className="flex-row items-center">
                <Image
                  source={images.dollar}
                  className="size-8"
                  resizeMode="contain"
                />
                <Text className="font-bold">Free Delivery</Text>
              </View>
              <View className="flex-row items-center">
                <Image
                  source={images.clock}
                  className="size-5"
                  resizeMode="contain"
                />
                <Text className="ml-2 font-bold">20 - 30 mins</Text>
              </View>
              <View className="flex-row items-center">
                <Image
                  source={images.star}
                  className="size-6"
                  resizeMode="contain"
                />
                <Text className="ml-2 font-bold">{detail?.rating}</Text>
              </View>
            </View>
            <Text className="mt-6 base-bold text-gray-500">
              {detail?.description}
            </Text>

            <View className="mt-6">
              <Text className="paragraph-bold font-bold text-xl">Toppings</Text>
            </View>
            <FlatList
              data={topping}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.id}
              contentContainerClassName="gap-x-6 mt-4"
              renderItem={({ item }) => {
                return (
                  <View className="w-28 relative">
                    <View
                      className="flex-center absolute top-0 z-10 w-full"
                      style={{
                        backgroundColor: "#fff",
                        borderRadius: 20,

                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.1,
                        shadowRadius: 4,

                        elevation: 3,
                      }}
                    >
                      <Image
                        source={{ uri: item.image }}
                        className="size-20"
                        resizeMode="contain"
                      />
                      <Text className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-red-600 text-white flex-center justify-center items-center text-center">{countOption(detail?.id, item.id)}</Text>
                    </View>
                    <View className="bg-[#3C2F2F] rounded-3xl h-32 px-3 pb-3 flex-end flex-row mt-2">
                      <View className="justify-between flex-row h-9 w-full items-start gap-x-4">
                        <Text className="text-white w-[60%]" numberOfLines={2}>
                          {item.name}
                        </Text>
                        <View className="flex-1 flex-col gap-y-1">
                          <TouchableOpacity
                            onPress={() => handleAddOption(item.id)}
                            className="w-5 h-5 bg-red-600 flex-center rounded-full "
                          >
                            <Image
                              source={images.plus}
                              className="size-2"
                              style={{ tintColor: "white" }}
                            />
                          </TouchableOpacity>
                          {
                            countOption(detail?.id, item.id) > 0 &&
                            <TouchableOpacity
                              onPress={() => handleAddOption(item.id)}
                              className="w-5 h-5 bg-red-600 flex-center rounded-full "
                            >
                              <Image
                                source={images.minus}
                                resizeMode="contain"
                                className="size-2"
                                style={{ tintColor: "white" }}
                              />
                            </TouchableOpacity>
                          }
                        </View>
                      </View>
                    </View>
                  </View>
                );
              }}
            />

            <View className="mt-6">
              <Text className="paragraph-bold font-bold text-xl">
                Side options
              </Text>
            </View>
            <FlatList
              data={side}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.id}
              contentContainerClassName="gap-x-6 mt-4"
              renderItem={({ item }) => {
                return (
                  <View className="w-28 relative">
                    <View
                      className="flex-center absolute top-0 z-10 w-full"
                      style={{
                        backgroundColor: "#fff",
                        borderRadius: 20,

                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.1,
                        shadowRadius: 4,

                        elevation: 3,
                      }}
                    >
                      <Image
                        source={{ uri: item.image }}
                        className="size-20"
                        resizeMode="contain"
                      />
                    </View>
                    <View className="bg-[#3C2F2F] rounded-3xl h-32 px-3 pb-3 flex-end flex-row mt-3">
                      <View className="justify-between flex-row h-9 w-full items-start gap-x-4">
                        <Text className="text-white w-[60%]" numberOfLines={2}>
                          {item.name}
                        </Text>
                        <TouchableOpacity
                          onPress={() => handleAddOption(item.id)}
                          className="w-5 h-5 bg-red-600 flex-center rounded-full flex-1"
                        >
                          <Image
                            source={images.plus}
                            className="size-2"
                            style={{ tintColor: "white" }}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                );
              }}
            />
          </View>
        </ScrollView>

        <View
          className="px-5 absolute w-full"
          style={{
            bottom: insets.bottom + 8,
          }}
        >
          <View
            className="flex-row flex-between items-center px-4 py-4"
            style={{
              backgroundColor: "#fff",
              borderRadius: 20,

              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 6,

              elevation: 3,
            }}
          >
            <View className="flex-row items-center">
              <Pressable
                onPress={decrease}
                className="bg-amber-100 size-8 flex-center item-center rounded-lg"
              >
                <Image
                  source={images.minus}
                  className="size-4"
                  resizeMode="contain"
                />
              </Pressable>
              <TextInput
                value={String(quantity)}
                onChangeText={changeQty}
                className="paragraph-bold w-14 text-center text-xl font-bold"
                keyboardType="numeric"
              />
              <Pressable
                onPress={increase}
                className="bg-amber-100 size-8 flex-center item-center rounded-lg"
              >
                <Image
                  source={images.plus}
                  className="size-4"
                  resizeMode="contain"
                />
              </Pressable>
            </View>

            <TouchableOpacity
              onPress={handleAddToCart}
              className="bg-white-200 flex-center flex-row rounded-2xl px-4 py-3 gap-x-2"
            >
              <Image source={images.bag} className="size-4" />
              <Text className="text-white text-md font-medium">
                Add to cart (${detail?.price})
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default MenuDetail;
