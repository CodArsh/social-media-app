import { View, Text, ImageBackground, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from './style';
import HeaderBar from '@components/HeaderBar';
import translate from '../../lang/lang/Translate';
import { getApiData } from '@utils/apiHelper';
import BaseSetting from '@config/setting';
import Loader from '@components/Loader/Loader';
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import Icon1 from 'react-native-vector-icons/AntDesign';
import { BaseColors } from '@config/theme';
import Icon4 from 'react-native-vector-icons/Entypo';
import CModal from '@components/CModal';
import Button from '@components/Button';
import { useDispatch, useSelector } from 'react-redux';
import Authentication from '@redux/reducers/auth/actions';
import { isEmpty } from 'lodash';
import NoDataFound from '@components/NoData';
import ViewImageModal from '@components/ViewImageModal';
import InfoCard from '@components/InfoCard';

const Gallery = ({ route }) => {
  const uId = route?.params?.data;
  const userType = route?.params?.userType;
  const [allPics, setAllPics] = useState();
  const [PageLoader, setPageLoader] = useState(false);
  const [newDelete, setNewDelete] = useState(false);
  const [visible, setVisible] = useState(false);
  const [delId, setDelId] = useState(null);
  const [btnLoader, setBtnLoader] = useState(false);
  const [delAll, setDelAll] = useState(false);
  const { setUserPhotos } = Authentication;
  const dispatch = useDispatch();
  const [pictureBox, setPictureBox] = useState({
    open: false,
    url: '',
  });
  const { userPhotos } = useSelector(state => {
    return state.auth;
  });

  useEffect(() => {
    getPictures();
  }, [newDelete]);
  const getPictures = async () => {
    setPageLoader(true);
    const endPoint = `${BaseSetting.endpoints.userDetails}?user_id=${uId}`;
    try {
      const res = await getApiData(endPoint, 'GET');
      if (res?.status) {
        setAllPics(res?.data?.photos);
        dispatch(setUserPhotos(res?.data?.photos));
        setPageLoader(false);
      }
    } catch (error) {
      setPageLoader(false);
      console.log('📌 ⏩ file: index.js:50 ⏩ HobbiesApi ⏩ error:', error);
    }
  };

  const deletePhoto = async picId => {
    setBtnLoader(true);
    const endpoint = `${BaseSetting.endpoints.photoDelete}?id=${picId}`;
    try {
      const res = await getApiData(endpoint, 'GET');
      if (res?.status) {
        setVisible(false);
        setNewDelete(!newDelete);
        getPictures();
      }
      setBtnLoader(false);
    } catch (error) {
      setBtnLoader(false);
      console.log(
        '📌 ⏩ file: index.js:106 ⏩ VisitorListAPI ⏩ error:',
        error,
      );
    }
  };
  const handleDelete = id => {
    return setDelAll(false), setVisible(true), setDelId(id);
  };

  // delete all images
  const deleteAllImages = async () => {
    setBtnLoader(true);
    const endpoint = `${BaseSetting.endpoints.deleteAll}`;
    try {
      const res = await getApiData(endpoint, 'GET');
      if (res?.status) {
        setVisible(false);
        setNewDelete(!newDelete);
        getPictures();
      }
      setBtnLoader(false);
    } catch (error) {
      setBtnLoader(false);
      console.log(
        '📌 ⏩ file: index.js:106 ⏩ VisitorListAPI ⏩ error:',
        error,
      );
    }
  };
  const handleDeleteAll = () => {
    setDelAll(true);
    setVisible(true);
  };
  const modalChildren = () => {
    return (
      <View style={styles.deleteImg}>
        <Text style={styles.topTitle}> {translate('AreYouSure')} </Text>

        <Text style={styles.desc}>
          {delAll ? translate('allPhotos') : translate('thisPhoto')} ?
        </Text>
        <View style={styles.btnStyle}>
          <Button
            onPress={() => setVisible(false)}
            type="outlined"
            title={translate('cancel')}
            style={styles.btnIn}
          />
          <Button
            onPress={() => {
              delAll ? deleteAllImages() : deletePhoto(delId);
              console.log(
                '📌 ⏩ file: Gallery.js:197 ⏩ modalChildren ⏩ delAll:',
                delAll,
              );
            }}
            loading={btnLoader}
            title={delAll ? translate('DeleteAll') : translate('delete')}
            style={styles.btnIn}
          />
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <HeaderBar
        HeaderText={translate('Gallery')}
        rightComponent={
          userType !== 'user' && (
            <TouchableOpacity
              activeOpacity={BaseSetting.buttonOpacity}
              onPress={() => handleDeleteAll()}
            >
              <Text style={styles.popupText}>{translate('DeleteAll')}</Text>
            </TouchableOpacity>
          )
        }
      />

      {PageLoader ? (
        <View style={styles.LoaderCon}>
          <Loader />
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.images}>
            {isEmpty(userPhotos) && (
              <View style={styles.emptyPics}>
                <NoDataFound />
              </View>
            )}

            {allPics?.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() =>
                    setPictureBox({ open: true, url: item?.photo })
                  }
                  style={{ marginBottom: 20 }}
                >
                  <InfoCard style={[styles.InfoCard]} Img={item?.photo} />
                  {userType === 'Personal' && (
                    <TouchableOpacity
                      onPress={() => handleDelete(item?.id)}
                      style={styles.iconTouch}
                    >
                      <Text
                        style={{ color: BaseColors.white, marginBottom: 5 }}
                      >
                        {translate('delete')}
                      </Text>
                    </TouchableOpacity>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      )}
      <CModal
        onRequestClose={() => {
          setVisible(false);
        }}
        visible={visible}
        onPressOverlay={() => {
          setVisible(false);
        }}
        modalType="bottom"
        modalStyle={styles.modalStyle}
        children={modalChildren(null)}
      />
      {pictureBox?.open && (
        <ViewImageModal
          visible={pictureBox.open}
          handleModal={() => {
            setPictureBox({ open: false, url: '' });
          }}
          imgUrl={pictureBox?.url}
        />
      )}
    </View>
  );
};

export default Gallery;
