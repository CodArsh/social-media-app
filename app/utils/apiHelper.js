import { isEmpty, isObject } from 'lodash';
import axios from 'axios';
// import Bugsnag from '@bugsnag/react-native';
import BaseSetting from '../config/setting';
import { store } from '../redux/store/configureStore';
import { logout } from './CommonFunction';

export const getApiData = async (
  endpoint,
  method,
  data,
  headers,
  isFormData = true,
  customUrl = '',
) => {
  const authState = store?.getState() || {};
  const token = authState?.auth?.accessToken || '';
  const { uuid } = authState?.auth || '';

  let authHeaders = {
    'Content-Type': 'multipart/form-data',
    authorization: token ? `Bearer ${token}` : '',
  };

  if (headers) {
    authHeaders = headers;
  }
  if (!isFormData) {
    authHeaders = {
      'Content-Type': 'application/json',
      authorization: token ? `Bearer ${token}` : '',
    };
  }

  const query = new FormData();
  if (data && Object.keys(data).length > 0) {
    Object.keys(data).map(k => {
      if (!isEmpty(data[k])) {
        query.append(k, data[k]);
      }
    });
  }

  try {
    let response = await axios({
      method: method,
      url: (customUrl ? customUrl : BaseSetting.api) + endpoint,
      timeout: BaseSetting.timeOut,
      headers: authHeaders,
      data: isFormData ? query || {} : data || {},
    });

    if (response?.data?.code == 'authentication_failed') {
      console.log('hiii');
      // logout();
      return;
    }
    let responseStatus = response.status;
    // console.log('Success:', JSON.stringify(response));
    // let returnObj = {
    //   status: responseStatus === 200 ? true : responseStatus,
    //   response: response.data,
    // };
    const res = response?.data || {
      status: responseStatus === 200 ? true : responseStatus,
      response: response.data,
    };
    return res;
  } catch (error) {
    // Bugsnag.notify(error, function (report) {
    //   report.metadata = {
    //     data: {
    //       endpoint,
    //       authHeaders,
    //       data,
    //     },
    //   };
    // });
    if (error.response) {
      let returnObj;
      if (error.response.status === 400) {
        returnObj = {
          status: error.response.status,
          responseJson: JSON.stringify(error.response.data),
        };
      }
      if (error.response.status === 404) {
        returnObj = {
          status: error.response.status,
          responseJson: JSON.stringify(error.response.data),
        };
      }
      if (error.response.status === 403) {
        if (!error.response.data.code) {
          logout();
          return;
        }
      }
      if (
        error?.response?.data?.message ===
        'Your request was made with invalid credentials.'
      ) {
        logout();
        return;
      }
      return returnObj;
    }
    console.log('error');
    console.error(error);
  }
};

export function getApiDataProgress(
  endpoint,
  method,
  data,
  onProgress,
  customUrl = '',
) {
  const authState = store?.getState() || {};
  const token = authState?.auth?.accessToken || '';

  const headers = {
    'Content-Type': 'multipart/form-data',
    authorization: token ? `Bearer ${token}` : '',
  };

  return new Promise((resolve, reject) => {
    const url = !isEmpty(customUrl) ? customUrl : BaseSetting.api + endpoint;
    const oReq = new XMLHttpRequest();
    const aToken = store ? store.getState().auth.accessToken : '';
    oReq.upload.addEventListener('progress', event => {
      if (event.lengthComputable) {
        const progress = (event.loaded * 100) / event.total;
        if (onProgress) {
          onProgress(progress);
        }
      } else {
        // Unable to compute progress information since the total size is unknown
      }
    });

    const query = new FormData();
    if (data && Object.keys(data).length > 0) {
      Object.keys(data).map(k => {
        if (!isEmpty(data[k])) {
          query.append(k, data[k]);
        }
      });
    }
    const params = query;
    oReq.open(method, url, true);
    console.log(params);
    console.log(url);
    oReq.setRequestHeader('Content-Type', 'multipart/form-data');
    // oReq.setRequestHeader('X-localization', language);
    if (isObject(headers)) {
      Object.keys(headers).map(hK => {
        oReq.setRequestHeader(hK, headers[hK]);
      });
    }

    if (aToken) {
      oReq.setRequestHeader('Authorization', `Bearer ${aToken}`);
    }

    oReq.send(params);
    oReq.onreadystatechange = () => {
      if (oReq.readyState === XMLHttpRequest.DONE) {
        try {
          const resposeJson = JSON.parse(oReq.responseText);
          if (resposeJson && resposeJson.code === 'authentication_failed') {
            // if (endpoint === 'logout') {
            logout();
            // }
          } else {
            resolve(resposeJson);
          }
        } catch (exe) {
          // Bugsnag.notify(exe, function (report) {
          //   report.metadata = {
          //     data: {
          //       url,
          //       params,
          //     },
          //   };
          // });
          console.log(exe);
          reject(exe);
        }
      }
    };
  });
}
