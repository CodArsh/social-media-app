import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  ScrollView,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from './styles';
import BaseSetting from '@config/setting';
import SChip from '@components/SChip';
import Icon from 'react-native-vector-icons/Octicons';
import { BaseColors } from '@config/theme';
import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import translate from '../../lang/lang/Translate';

const DropSelect = ({
  Label,
  itemArray,
  isRequired,
  multiSelect,
  LabledTextStyle,
  isSearch,
  dropStyle,
  LabelContainerStyle,
  ErrState,
  ErrMsg,
  placeholder,
  dropdownStyle,
  value,
  onSelect,
  onPress,
}) => {
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!isEmpty(itemArray)) {
      setData(itemArray);
    }

    return () => {
      null;
    };
  }, [itemArray]);

  const renderItem = ({ item, index }) => {
    let selectedID = -1;
    if (!isEmpty(value)) {
      selectedID = value?.findIndex(obj => {
        return obj?.name === item?.name;
      });
    }
    return (
      <TouchableOpacity
        activeOpacity={BaseSetting.buttonOpacity}
        style={[styles.ItemView, selectedID !== -1 && styles.selectedItem]}
        onPress={() =>
          multiSelect ? MultiSelection(item) : SingleSelection(item)
        }
      >
        <Text
          style={[styles.ItemText, selectedID !== -1 && styles.selectedText]}
        >
          {item?.name}
        </Text>
        {selectedID !== -1 && (
          <Icon name="check-circle" color={BaseColors.white} />
        )}
      </TouchableOpacity>
    );
  };

  const SingleSelection = Sitem => {
    onSelect([Sitem]);
    setShow(false);
  };

  const MultiSelection = Sitem => {
    const NewArr = [...value];

    const existedItem = value?.findIndex(item => {
      return item?.name === Sitem?.name;
    });

    if (existedItem === -1) {
      NewArr.push(Sitem);
    } else {
      NewArr.splice(existedItem, 1);
    }
    onSelect(NewArr);
  };

  const onSearch = searchval => {
    if (searchval !== '') {
      let tempData = itemArray.filter(item => {
        return item?.name.toLowerCase().indexOf(searchval.toLowerCase()) > -1;
      });
      setData(tempData);
    } else {
      setData(itemArray);
    }
  };
  const HandleCancel = canceledItem => {
    const tempArr = [...value];
    const selectedID = value.findIndex(obj => {
      return obj?.name === canceledItem?.name;
    });
    tempArr.splice(selectedID, 1);
    onSelect(tempArr);
  };

  return (
    <View style={[styles.Main, dropStyle]}>
      {!isEmpty(Label) && (
        <View style={[styles.labelCon, LabelContainerStyle]}>
          <Text style={[styles.labelTxt, LabledTextStyle]}>{Label}&nbsp;</Text>
          {isRequired && <Text style={styles.astrick}>*</Text>}
        </View>
      )}
      <TouchableOpacity
        activeOpacity={BaseSetting.buttonOpacity}
        style={[styles.DropDown, dropdownStyle]}
        onPress={() => {
          setShow(!show);
          !show && onSearch('');
          onPress();
        }}
      >
        <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled>
          <View style={styles.ChipContainer}>
            {!isEmpty(value) ? (
              value?.map((item, index) => {
                return (
                  <SChip
                    key={item?.name + index}
                    chipStyle={{ marginRight: 10, marginVertical: 5 }}
                    text={item?.name}
                    type={multiSelect ? 'primary' : 'text'}
                    cancelBtn={multiSelect ? true : false}
                    onCacelPress={() => HandleCancel(item)}
                  />
                );
              })
            ) : (
              <Text style={styles.placeholder} numberOfLines={1}>
                {placeholder}
              </Text>
            )}
          </View>
        </ScrollView>
        <View style={styles.IconContainer}>
          {show ? (
            <Icon name="chevron-up" size={23} color={BaseColors.secondary} />
          ) : (
            <Icon name="chevron-down" size={23} color={BaseColors.secondary} />
          )}
        </View>
      </TouchableOpacity>
      {ErrState && (
        <View style={styles.errBox}>
          <Text style={styles.errText} numberOfLines={2}>
            {ErrMsg}
          </Text>
        </View>
      )}
      {show && (
        <View style={styles.DropArea}>
          {isSearch && (
            <TextInput
              style={styles.searchBox}
              onChangeText={val => onSearch(val.trim())}
              placeholder={translate('Search')}
              placeholderTextColor={BaseColors.black50}
              cursorColor={BaseColors.primary}
            />
          )}
          {isEmpty(data) && <SChip type="text" text={translate('dataEmpty')} />}
          <FlatList
            keyExtractor={(item, index) => item?.name + index}
            showsVerticalScrollIndicator={false}
            data={data}
            renderItem={renderItem}
            nestedScrollEnabled
          />
        </View>
      )}
    </View>
  );
};

export default DropSelect;

DropSelect.propTypes = {
  Label: PropTypes.string,
  isRequired: PropTypes.bool,
  multiSelect: PropTypes.bool,
  LabledTextStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  dropStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  LabelContainerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  itemArray: PropTypes.array,
  isSearch: PropTypes.bool,
  ErrState: PropTypes.bool,
  ErrMsg: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.arrayOf(PropTypes.object),
  onSelect: PropTypes.func,
  onPress: PropTypes.func,
};

DropSelect.defaultProps = {
  Label: '',
  isRequired: false,
  multiSelect: false,
  LabledTextStyle: {},
  itemArray: [],
  isSearch: false,
  dropStyle: {},
  LabelContainerStyle: {},
  ErrState: false,
  ErrMsg: '',
  placeholder: `${translate('select')}...`,
  value: [],
  onSelect: () => {},
  onPress: () => {},
};
