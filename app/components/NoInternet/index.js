/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import { Modal, View, StatusBar, Text } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LottieView from 'lottie-react-native';
import { Images } from '@config';
import styles from './styles';
import authActions from '../../redux/reducers/auth/actions';
import { Typography } from '@config/typography';
import translate from '../lang/lang/Translate';

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      cancelModal: false,
      cancelData: {},
    };
  }

  componentDidMount() {
    NetInfo.addEventListener(state => {
      this.handleConnectivity(state);
    });
  }

  setStatusbar(color, style) {
    StatusBar.setBackgroundColor(color, true);
    StatusBar.setBarStyle(style, true);
  }

  componentDidUpdate(prevProps, prevState) {}

  handleConnectivity(state) {
    const {
      authActions: { setNetworkStatus },
    } = this.props;
    if (state.isConnected) {
      this.setState({ open: false });
      setNetworkStatus(true);
      this.props.onConnect();
    } else {
      this.setState({ open: true });
      setNetworkStatus(false);
    }
  }

  render() {
    const { imageStyle } = this.props;
    return (
      <>
        <Modal transparent animationType="slide" visible={this.state.open}>
          <View style={styles.mainViewModal}>
            <View style={styles.containerf}>
              <LottieView
                ref={animation => {
                  this.animation1 = animation;
                }}
                style={[styles.animation, imageStyle]}
                source={Images.noInternet}
                autoPlay
                loop
              />
              <View style={{ marginTop: 10 }}>
                <Text bold style={[Typography.title1, styles.offlineTitle]}>
                  {translate('Oops')}
                </Text>
                <Text bold style={[Typography.title3, styles.offlineSubtxt]}>
                  {translate('NoInternet')}
                </Text>
              </View>
            </View>
          </View>
        </Modal>
      </>
    );
  }
}

index.propTypes = {
  msgNoData: PropTypes.string,
  imageSource: PropTypes.any,
  style: PropTypes.object,
  onAnimationFinish: PropTypes.func,
  offlineModalOpen: PropTypes.bool,
  onConnect: PropTypes.func,
};

index.defaultProps = {
  msgNoData: '',
  imageSource: null,
  style: {},
  offlineModalOpen: false,
  onAnimationFinish: () => {},
  onConnect: () => {},
};

function mapStateToProps(state) {
  return { common: state.common };
}

function mapDispatchToProps(dispatch) {
  return {
    authActions: bindActionCreators(authActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(index);
