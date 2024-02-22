import { View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import styles from './styles';
import Button from '@components/Button';
import Loader from '@components/Loader/Loader';
import HeaderBar from '@components/HeaderBar';
import translate from '../../lang/lang/Translate';
import { isEmpty, isNull } from 'lodash';
import LabeledInput from '@components/LabeledInput';
import DropSelect from '@components/DropSelect';
import BaseSetting from '@config/setting';
import { getApiData, getApiDataProgress } from '@utils/apiHelper';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { useDispatch, useSelector } from 'react-redux';
import Authentication from '@redux/reducers/auth/actions';

const Interest = ({ navigation }) => {
  const IOS = Platform.OS === 'ios';
  const dispatch = useDispatch();
  const { setEmptyProfile } = Authentication;
  const scrollViewRef = useRef();
  const errorObj = {
    FoodErr: false,
    FoodErrMsg: '',
    HobbiesErr: false,
    HobbiesErrMsg: '',
    LoveErr: false,
    LoveErrMsg: '',
    HateErr: false,
    HateErrMsg: '',
    MovieGenerErr: false,
    MovieGenerErrMsg: '',
    MusicGenerErr: false,
    MusicGenerErrMsg: '',
  };
  const { emptyProfile } = useSelector(state => {
    return state.auth;
  });
  const { languageData } = useSelector(state => state.language);
  const [ErrObj, setErrObj] = useState(errorObj);
  const [PageLoader, setPageLoader] = useState(false);
  const [BtnLoader, setBtnLoader] = useState(false);

  const [FoodVal, setFoodVal] = useState('');
  const [CarVal, setCarVal] = useState('');
  const [HolidayVal, setHolidayVal] = useState('');
  const [HobbiesVal, setHobbiesVal] = useState([]);
  const [LoveVal, setLoveVal] = useState('');
  const [HateVal, setHateVal] = useState('');
  const [MovieGenerVal, setMovieGenerVal] = useState([]);
  const [MusicGenerVal, setMusicGenerVal] = useState([]);
  const [ActorVal, setActorVal] = useState('');
  const [ActressVal, setActressVal] = useState('');
  const [ArtistVal, setArtistVal] = useState('');

  const [HobbiesList, setHobbiesList] = useState([]);
  const [MovieGenerList, setMovieGenerList] = useState([]);
  const [MusicGenerList, setMusicGenerList] = useState([]);

  const DefaultData = async () => {
    setPageLoader(true);
    const endPoint = BaseSetting.endpoints.interestView;
    try {
      const res = await getApiData(endPoint, 'GET');
      if (res?.status) {
        setFoodVal(res?.data?.food);
        setCarVal(res?.data?.car);
        setHolidayVal(res?.data?.holiday_destination);
        setHobbiesVal(res?.data?.hobbies || []);
        setLoveVal(res?.data?.love);
        setHateVal(res?.data?.hate);
        setMovieGenerVal(res?.data?.movie_genre || []);
        setActorVal(res?.data?.actor);
        setActressVal(res?.data?.actress);
        setMusicGenerVal(res?.data?.music_genre || []);
        setArtistVal(res?.data?.artist);
      }
      setPageLoader(false);
    } catch (error) {
      setPageLoader(false);
      console.log('📌 ⏩ file: index.js:52 ⏩ DefaultData ⏩ error:', error);
    }
  };

  const HobbiesApi = async () => {
    const endPoint = `${BaseSetting.endpoints.commonList}?category_id=${BaseSetting.categoryId.hobby}&language_id=${languageData}`;
    try {
      const res = await getApiData(endPoint, 'GET');
      if (res?.status) {
        setHobbiesList(res?.data);
      } else {
        setHobbiesList([]);
      }
    } catch (error) {
      console.log('📌 ⏩ file: index.js:50 ⏩ HobbiesApi ⏩ error:', error);
    }
  };

  const MovieListAPI = async () => {
    const endPoint = `${BaseSetting.endpoints.commonList}?category_id=${BaseSetting.categoryId.movieGenre}&language_id=${languageData}`;
    try {
      const res = await getApiData(endPoint, 'GET');
      if (res?.status) {
        setMovieGenerList(res?.data);
      } else {
        setMovieGenerList([]);
      }
    } catch (error) {
      console.log('📌 ⏩ file: index.js:50 ⏩ HobbiesApi ⏩ error:', error);
    }
  };

  const MusicListAPI = async () => {
    const endPoint = `${BaseSetting.endpoints.commonList}?category_id=${BaseSetting.categoryId.musicGenre}&language_id=${languageData}`;
    try {
      const res = await getApiData(endPoint, 'GET');
      if (res?.status) {
        setMusicGenerList(res?.data);
      } else {
        setMusicGenerList([]);
      }
    } catch (error) {
      console.log('📌 ⏩ file: index.js:50 ⏩ HobbiesApi ⏩ error:', error);
    }
  };

  useEffect(() => {
    DefaultData();
    HobbiesApi();
    MovieListAPI();
    MusicListAPI();

    return () => {
      null;
    };
  }, []);

  /* ============================= HANDLE UPDATE BTN ============================ */
  const HandleUpdateBtn = () => {
    const error = { ...ErrObj };
    let Valid = true;

    /* ================== FOOD ================= */
    if (isEmpty(FoodVal?.trim()) || isNull(FoodVal)) {
      Valid = false;
      error.FoodErr = true;
      error.FoodErrMsg = translate('EnteryourFavoriteFood');
    }

    /* ================== HOBBIES ================= */
    if (isEmpty(HobbiesVal) || isNull(HobbiesVal)) {
      Valid = false;
      error.HobbiesErr = true;
      error.HobbiesErrMsg = translate('requiredfield');
    }

    /* ================== LOVE ================= */
    if (isEmpty(LoveVal?.trim()) || isNull(LoveVal)) {
      Valid = false;
      error.LoveErr = true;
      error.LoveErrMsg = translate('whatyoulove');
    }

    /* ================== HATE ================= */
    if (isEmpty(HateVal?.trim()) || isNull(HateVal)) {
      Valid = false;
      error.HateErr = true;
      error.HateErrMsg = translate('whatyouHate');
    }

    /* ================== MOVIE GENRE ================= */
    if (isEmpty(MovieGenerVal) || isNull(MovieGenerVal)) {
      Valid = false;
      error.MovieGenerErr = true;
      error.MovieGenerErrMsg = translate('movieType');
    }

    /* ================== MUSIC GENRE ================= */
    if (isEmpty(MusicGenerVal) || isNull(MusicGenerVal)) {
      Valid = false;
      error.MusicGenerErr = true;
      error.MusicGenerErrMsg = translate('musicType');
    }

    setErrObj(error);
    if (Valid) {
      UpdateAPI();
    } else {
      Toast.show({
        type: 'error',
        text1: translate('fillOutRequired'),
      });
    }
  };
  const CheckEmptyProfile = () => {
    if (emptyProfile?.preference) {
      navigation.replace('Preferences');
    } else {
      navigation.replace('Home');
    }
  };
  const UpdateAPI = async () => {
    setBtnLoader(true);
    const endPoint = BaseSetting.endpoints.interestUpdate;
    const NewHobbies = HobbiesVal.map(item => item?.id?.toString());
    const params = {
      'UserInterest[food]': FoodVal,
      'UserInterest[car]': CarVal,
      'UserInterest[holiday_destination]': HolidayVal,
      'UserInterest[love]': LoveVal,
      'UserInterest[hate]': HateVal,
      'UserInterest[movie_genre]': MovieGenerVal[0].id?.toString(),
      'UserInterest[actor]': ActorVal,
      'UserInterest[actress]': ActressVal,
      'UserInterest[music_genre]': MusicGenerVal[0].id?.toString(),
      'UserInterest[artist]': ArtistVal,
    };
    NewHobbies?.map((v, i) => {
      return (params[`UserInterest[hobbies][${i}]`] = v);
    });
    try {
      const res = await getApiDataProgress(endPoint, 'POST', params);
      if (res?.status) {
        Toast.show({
          type: 'success',
          text1: res?.message,
        });
        if (emptyProfile?.interest) {
          dispatch(
            setEmptyProfile({
              profile: emptyProfile?.profile,
              character: emptyProfile?.character,
              interest: false,
              preference: emptyProfile?.preference,
            }),
          );
          CheckEmptyProfile();
        } else {
          navigation.goBack();
        }
      } else {
        Toast.show({
          type: 'error',
          text1: res?.message,
        });
      }
      setBtnLoader(false);
    } catch (error) {
      setBtnLoader(false);
      console.log('📌 ⏩ file: index.js:183 ⏩ UpdateAPI ⏩ error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <HeaderBar HeaderText={translate('Interest')} />
      {PageLoader ? (
        <View style={styles.LoaderCon}>
          <Loader />
        </View>
      ) : (
        <KeyboardAvoidingView
          behavior={IOS ? 'padding' : 'height'}
          style={styles.main}
          keyboardVerticalOffset={IOS ? -60 : 0}
        >
          <ScrollView
            contentContainerStyle={styles.ScrollView}
            showsVerticalScrollIndicator={false}
            ref={scrollViewRef}
          >
            {/* =============================== FAVORITE FOOD FIELD =============================== */}
            <LabeledInput
              Label={translate('FavoriteFood')}
              placeholder={translate('EnteryourFavoriteFood')}
              LabledInputStyle={styles.marginVer}
              isRequired
              showError={ErrObj.FoodErr}
              errorText={ErrObj.FoodErrMsg}
              value={FoodVal}
              onChangeText={val => {
                setFoodVal(val);
                setErrObj(old => {
                  return {
                    ...old,
                    FoodErr: false,
                    FoodErrMsg: '',
                  };
                });
              }}
            />

            {/* =============================== FAVORITE CAR FIELD =============================== */}
            <LabeledInput
              Label={translate('FavoriteCar')}
              placeholder={translate('EnteryourFavoriteCar')}
              LabledInputStyle={styles.marginVer}
              value={CarVal}
              onChangeText={val => setCarVal(val)}
            />

            {/* =============================== HOLIDAY GENER FIELD =============================== */}
            <LabeledInput
              Label={translate('HolidayDestination')}
              placeholder={translate('FavoriteHolidayDestination')}
              LabledInputStyle={styles.marginVer}
              value={HolidayVal}
              onChangeText={val => setHolidayVal(val)}
            />

            {/* =============================== HOBBIES FIELD =============================== */}
            <DropSelect
              Label={translate('hobbies')}
              multiSelect
              itemArray={HobbiesList}
              dropStyle={styles.marginVer}
              isRequired
              placeholder={translate('hobbiesPh')}
              ErrState={ErrObj.HobbiesErr}
              ErrMsg={ErrObj.HobbiesErrMsg}
              value={HobbiesVal}
              onSelect={val => {
                setHobbiesVal(val);
                setErrObj(old => {
                  return {
                    ...old,
                    HobbiesErr: false,
                    HobbiesErrMsg: '',
                  };
                });
              }}
            />

            {/* =============================== LOVE FIELD =============================== */}
            <LabeledInput
              Label={translate('ILove')}
              placeholder={translate('whatyoulove')}
              LabledInputStyle={styles.marginVer}
              isRequired
              showError={ErrObj.LoveErr}
              errorText={ErrObj.LoveErrMsg}
              value={LoveVal}
              onChangeText={val => {
                setLoveVal(val);
                setErrObj(old => {
                  return {
                    ...old,
                    LoveErr: false,
                    LoveErrMsg: '',
                  };
                });
              }}
            />

            {/* =============================== HATE FIELD =============================== */}
            <LabeledInput
              Label={translate('IHate')}
              placeholder={translate('whatyouHate')}
              LabledInputStyle={styles.marginVer}
              isRequired
              showError={ErrObj.HateErr}
              errorText={ErrObj.HateErrMsg}
              value={HateVal}
              onChangeText={val => {
                setHateVal(val);
                setErrObj(old => {
                  return {
                    ...old,
                    HateErr: false,
                    HateErrMsg: '',
                  };
                });
              }}
            />

            {/* =============================== MOVIE GENRE FIELD =============================== */}
            <DropSelect
              Label={translate('MovieGenre')}
              itemArray={MovieGenerList}
              dropStyle={styles.marginVer}
              isRequired
              placeholder={translate('SelectMovieGenre')}
              ErrState={ErrObj.MovieGenerErr}
              ErrMsg={ErrObj.MovieGenerErrMsg}
              value={MovieGenerVal}
              onSelect={val => {
                setMovieGenerVal(val);
                setErrObj(old => {
                  return {
                    ...old,
                    MovieGenerErr: false,
                    MovieGenerErrMsg: '',
                  };
                });
              }}
            />

            {/* =============================== ACTOR FIELD =============================== */}
            <LabeledInput
              Label={translate('FavoriteActor')}
              placeholder={translate('youravoriteActorPh')}
              LabledInputStyle={styles.marginVer}
              value={ActorVal}
              onChangeText={val => setActorVal(val)}
            />

            {/* =============================== ACTRESS FIELD =============================== */}
            <LabeledInput
              Label={translate('FavoriteActress')}
              placeholder={translate('yourFavoriteActressPh')}
              LabledInputStyle={styles.marginVer}
              value={ActressVal}
              onChangeText={val => setActressVal(val)}
            />

            {/* =============================== MUSIC GENRE FIELD =============================== */}
            <DropSelect
              Label={translate('MusicGenre')}
              itemArray={MusicGenerList}
              dropStyle={styles.marginVer}
              isRequired
              placeholder={translate('SelectMusicGenre')}
              ErrState={ErrObj.MusicGenerErr}
              ErrMsg={ErrObj.MusicGenerErrMsg}
              value={MusicGenerVal}
              onSelect={val => {
                setMusicGenerVal(val);
                setErrObj(old => {
                  return {
                    ...old,
                    MusicGenerErr: false,
                    MusicGenerErrMsg: '',
                  };
                });
              }}
              onPress={() =>
                !IOS && scrollViewRef.current.scrollToEnd({ animated: true })
              }
            />

            {/* =============================== ACTRESS FIELD =============================== */}
            <LabeledInput
              Label={translate('FavoriteArtist')}
              placeholder={translate('yourFavoriteArtistPh')}
              LabledInputStyle={styles.marginVer}
              value={ArtistVal}
              onChangeText={val => setArtistVal(val)}
            />
          </ScrollView>

          <Button
            title={`${translate('UpdateInterest')}`}
            loading={BtnLoader}
            style={{ marginTop: 10 }}
            onPress={HandleUpdateBtn}
          />
        </KeyboardAvoidingView>
      )}
    </View>
  );
};

export default Interest;
