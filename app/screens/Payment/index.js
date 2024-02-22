/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import styles from './styles';
import { getApiData } from '@utils/apiHelper';
import BaseSetting from '@config/setting';
import { BaseColors, FontFamily } from '@config/theme';
import { isArray, isEmpty } from 'lodash';
import Button from '@components/Button';
import HeaderBar from '@components/HeaderBar';
import translate from '../../lang/lang/Translate';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import CModal from '@components/CModal';
import { ScrollView } from 'react-native-gesture-handler';
import Authentication from '@redux/reducers/auth/actions';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '@components/Loader/Loader';
import { CustomIcon } from '@config/LoadIcons';
import {
  initConnection,
  getProducts,
  purchaseProduct,
  requestPurchase,
  clearTransactionIOS,
} from 'react-native-iap';

/**
 * Module  PaymentMethod
 * @module  PaymentMethod
 *
 */

export default function PaymentMethod({ navigation }) {
  const { setIsSubscribe, setSubscriptionDetails } = Authentication;
  const { languageData } = useSelector(state => state.language);
  const { isSubscribed, subscriptionDetails } = useSelector(state => {
    return state.auth;
  });
  const iOS = Platform.OS === 'ios';
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [PlanLoader, setPlanLoader] = useState(false);
  const [planData, setplanData] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [cancelModel, setCancelModel] = useState(false);
  const [cancelbtnLoader, setCancelBtnLoader] = useState(false);
  const [duration, setDuration] = useState('');
  const [plan, setPlan] = useState('');
  const [fetch, setFetch] = useState(false);
  const productIds = ['xlwr2', 'b8jbw', '3r90i'];
  const [loading, setLoading] = useState(true);
  const [sortedProducts, setSortedProducts] = useState();

  useEffect(() => {
    fetchProducts();
    getUpdatedPlanLanguage();
  }, []);

  useEffect(() => {
    getPlans();
    if (!isSubscribed) {
      setVisible(true);
    }
  }, [isSubscribed]);

  useEffect(() => {
    if (isSubscribed && isArray(planData) && !isEmpty(planData)) {
      const ind = planData.findIndex(
        i => i.id === subscriptionDetails?.plan_id,
      );
      setActiveIndex(ind);
    }
  }, [isSubscribed, planData]);

  const getPlans = async () => {
    setPlanLoader(true);
    const endPoint = `${BaseSetting.endpoints.plans}?language_id=${languageData}`;
    try {
      const res = await getApiData(endPoint, 'GET');
      if (res?.status) {
        setplanData(res?.data);
      }
      setPlanLoader(false);
    } catch (error) {
      setPlanLoader(false);
      console.log('📌 ⏩ file: index.js:50 ⏩ HobbiesApi ⏩ error:', error);
    }
  };

  async function cancelPlan() {
    setCancelBtnLoader(true);
    try {
      const response = await getApiData(
        `${BaseSetting.endpoints.canclePlan}`,
        'GET',
      );
      if (response.status) {
        setCancelModel(false);
        navigation.goBack();
        setTimeout(() => {
          dispatch(setSubscriptionDetails({}));
          dispatch(setIsSubscribe(false));
        }, 500);
        Toast.show({
          type: 'success',
          text1: response?.message,
        });
      } else {
        Toast.show({
          type: 'error',
          text1: response?.message,
        });
      }
      setCancelBtnLoader(false);
    } catch (error) {
      console.log('📌 ⏩ file: index.js:181 ⏩ cancelPlan ⏩ error:', error);
      setCancelBtnLoader(false);
      Toast.show({
        type: 'error',
        text1: error?.toString(),
      });
    }
  }
  const modalChildren = () => {
    return (
      <>
        {PlanLoader ? (
          <View style={styles.LoaderCon}>
            <Loader />
          </View>
        ) : (
          <View>
            <View style={styles.modalcontainer1}>
              <TouchableOpacity
                activeOpacity={BaseSetting.buttonOpacity}
                onPress={() => {
                  setVisible(false);
                  !isSubscribed && navigation.goBack();
                }}
                style={{ alignSelf: 'flex-end', marginTop: 5 }}
              >
                <CustomIcon name="close" size={24} />
              </TouchableOpacity>
              <Text style={styles.modaltext}>{translate('BecomeaMember')}</Text>
              <Text style={styles.modalsubtext}>
                {translate('Chooseyourplan')}
              </Text>
            </View>

            {iOS ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {sortedProducts?.map(
                  (product, index) => (
                    console.log(sortedProducts[index]?.productId),
                    (
                      <View
                        key={product.productId}
                        style={{
                          flexDirection: 'row',
                          width: '100%',
                          justifyContent: 'space-between',
                          padding: 5,
                          height: 80,
                          marginVertical: 3,
                          borderRadius: 5,
                          borderWidth: 1,
                          borderColor: BaseColors.black30,
                        }}
                      >
                        <View style={{ justifyContent: 'space-between' }}>
                          <Text>{product.title}</Text>
                          {/* <Text>{product.description}</Text> */}
                          <Text>{product.price}</Text>
                          <Text>
                            {product.productId === 'xlwr2'
                              ? `1 ${translate('month')}`
                              : product.productId === 'b8jbw'
                              ? `3 ${translate('months')}`
                              : `6 ${translate('months')}`}
                          </Text>
                        </View>
                        <Button
                          title={translate('select')}
                          style={{
                            width: 80,
                            padding: 4,
                            backgroundColor:
                              activeIndex === index && fetch
                                ? BaseColors.primary
                                : BaseColors.white,
                            borderColor:
                              activeIndex === index && fetch
                                ? BaseColors.white
                                : BaseColors.primary,
                          }}
                          TextStyle={{
                            color:
                              activeIndex === index && fetch
                                ? BaseColors.white
                                : BaseColors.primary,
                          }}
                          type="outlined"
                          loading={activeIndex === index && fetch && loading}
                          onPress={() => (
                            setLoading(true),
                            setFetch(true),
                            handlePurchase(product?.productId),
                            setActiveIndex(index)
                          )}
                        />
                      </View>
                    )
                  ),
                )}
              </View>
            ) : (
              <View style={styles.optcontainer}>
                {isArray(planData) &&
                  !isEmpty(planData) &&
                  planData.map((item, index) => {
                    return (
                      <TouchableOpacity
                        activeOpacity={BaseSetting.buttonOpacity}
                        onPress={() => {
                          setActiveIndex(index);
                        }}
                        style={[
                          {
                            borderColor:
                              activeIndex === index
                                ? BaseColors.primary
                                : BaseColors.black20,
                          },
                          styles.row,
                        ]}
                      >
                        <View style={styles.box}>
                          <View
                            onPress={() => {
                              setActiveIndex(index);
                            }}
                            style={[
                              {
                                borderColor:
                                  activeIndex === index
                                    ? BaseColors.primary
                                    : BaseColors.black20,
                              },
                              styles.month,
                            ]}
                          >
                            <View
                              onPress={() => {
                                setActiveIndex(index);
                              }}
                              style={[
                                styles.round,
                                {
                                  backgroundColor:
                                    activeIndex === index
                                      ? BaseColors.primary
                                      : null,
                                },
                              ]}
                            />
                          </View>
                          <View>
                            <Text style={styles.label}>
                              {item?.duration} {item?.type}
                            </Text>
                            <Text style={styles.labelval}>{item?.name}</Text>
                          </View>
                        </View>
                        <View>
                          <Text style={styles.prize}>€{item?.price}</Text>
                        </View>
                      </TouchableOpacity>
                    );
                  })}
              </View>
            )}

            {!iOS && (
              <View style={styles.button}>
                <Button
                  title={
                    isSubscribed
                      ? translate('changeplan')
                      : translate('Continuetocheckout')
                  }
                  onPress={() => {
                    getCheckout(), setVisible(false);
                  }}
                />
              </View>
            )}
          </View>
        )}
      </>
    );
  };

  const modalCancelChildren = () => {
    return (
      <View style={styles.deleteImg}>
        <Text style={styles.topTitle}>{translate('AreYouSure')} ?</Text>
        <Text style={styles.desc}>{translate('cancleAlert')}</Text>
        <View style={styles.btnStyle}>
          <TouchableOpacity>
            <Button
              onPress={() => setCancelModel(false)}
              type="outlined"
              title={translate('cancel')}
              style={styles.btnIn}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Button
              onPress={() => cancelPlan()}
              loading={cancelbtnLoader}
              title={translate('Confirm')}
              style={styles.btnIn}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  // GET CHECKOUT
  const getCheckout = () => {
    getSession();
  };
  const getSession = async () => {
    const endPoint = `${BaseSetting.endpoints.sessionId}?subscription_id=${planData[activeIndex]?.id}`;
    try {
      const res = await getApiData(endPoint, 'GET');
      if (res?.status) {
        navigation.navigate('Checkout', {
          data: res?.data?.session_id,
          planId: planData[activeIndex]?.id,
          from: 'Payment',
        });
      }
    } catch (error) {
      console.log('📌 ⏩ file: index.js:50 ⏩ HobbiesApi ⏩ error:', error);
    }
  };

  // Update language in Active plan
  const getUpdatedPlanLanguage = async () => {
    const endPoint = `${BaseSetting.endpoints.planLanguage}?language_id=${languageData}`;
    try {
      const res = await getApiData(endPoint, 'GET');
      if (res?.status) {
        setPlan(res?.data?.plan_name);
        setDuration(res?.data?.duration);
      }
    } catch (error) {
      console.log('📌 ⏩ file: index.js:50 ⏩ HobbiesApi ⏩ error:', error);
    }
  };

  useEffect(() => {
    // Initialize the billing library
    initConnection()
      .then(() => {
        console.log('Connection to billing API successful');
      })
      .catch(error => {
        console.warn('Failed to connect to billing API', error);
      });
  }, []);

  const fetchProducts = async () => {
    try {
      const productList = await getProducts({
        skus: productIds,
      });
      const sorting = productList
        .slice()
        .sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
      setSortedProducts(sorting);
    } catch (error) {
      console.log('Failed to fetch products:', error);
    }
  };

  const handlePurchase = async productId => {
    try {
      await clearTransactionIOS();
      const inApp = await requestPurchase({
        sku: productId,
      });
      getUpdate(productId);
      console.log('In-app purchase successful!', inApp);
      setLoading(false);
    } catch (error) {
      console.log('In-app purchase failed:', error);
      setLoading(false);
    }
  };

  // Update Plans in database
  const getUpdate = async productId => {
    const endPoint = `${BaseSetting.endpoints.updatePlan}?subscription_id=${productId}`;
    try {
      const res = await getApiData(endPoint, 'GET');
      if (res?.status) {
        dispatch(setIsSubscribe(true));
        dispatch(setSubscriptionDetails(res?.data));
      }
    } catch (error) {
      console.log('Failed to update plans:', error);
    }
  };
  return (
    <View style={styles.mainContainer}>
      <HeaderBar HeaderText={translate('subscriptionScreen')} />
      <ScrollView contentContainerStyle={styles.container}>
        {isSubscribed && (
          <View style={{ marginHorizontal: 20, marginBottom: 20 }}>
            <Text style={styles.modalsubtext}>{translate('activePlan')}</Text>

            <View>
              <View
                style={[
                  {
                    borderColor: BaseColors.primary,
                  },
                  styles.row1,
                ]}
              >
                <View style={styles.box}>
                  <View>
                    <Text style={styles.label1}>
                      {duration} {subscriptionDetails?.type}
                    </Text>
                    <Text style={styles.labelval1}>{plan}</Text>
                  </View>
                </View>
                <View>
                  <Text style={styles.prize}>
                    €{subscriptionDetails?.amount}
                  </Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={[styles.expiry]}>{translate('expires')}</Text>
                    <Text style={[styles.labelval1, { marginLeft: 5 }]}>
                      {subscriptionDetails?.package_expiry}
                    </Text>
                  </View>
                </View>
              </View>
              <View>
                <Button
                  style={styles.addBtn}
                  onPress={() => {
                    setVisible(true);
                  }}
                  title={translate('changeplan')}
                />
                <Button
                  type="outlined"
                  style={styles.addBtn}
                  onPress={() => {
                    setCancelModel(true);
                  }}
                  title={translate('cancelplan')}
                />
              </View>
              <View style={{ marginVertical: 35, alignItems: 'center' }}>
                <Text style={{ fontFamily: FontFamily.semiBold, fontSize: 16 }}>
                  {translate('cancleNote')}
                </Text>
              </View>
            </View>
          </View>
        )}
      </ScrollView>

      <CModal
        onPressOverlay={() => {
          setVisible(false);
          !isSubscribed && navigation.goBack();
        }}
        onRequestClose={() => {
          setVisible(false);
          !isSubscribed && navigation.goBack();
        }}
        visible={visible}
        modalType="bottom"
        modalStyle={styles.modalStyle}
        children={modalChildren()}
      />
      <CModal
        onRequestClose={() => {
          setCancelModel(false);
        }}
        visible={cancelModel}
        onPressOverlay={() => {
          setCancelModel(false);
        }}
        modalType="bottom"
        modalStyle={styles.modalStyle}
        children={modalCancelChildren()}
      />
    </View>
  );
}
