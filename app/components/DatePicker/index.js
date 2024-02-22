import { Text, Platform, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { BaseColors } from '@config/theme';
import BaseSetting from '@config/setting';
import Icon from 'react-native-vector-icons/Feather';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from './styles';
import { isEmpty } from 'lodash';
import Button from '@components/Button';
import translate from '../../lang/lang/Translate';

const Picker = ({
  defaultValue = '',
  onDateSelect,
  containerStyle,
  onPress,
  onClose,
}) => {
  const IOS = Platform.OS === 'ios';
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());
  const [dateValue, setDateValue] = useState(defaultValue);

  useEffect(() => {
    if (!isEmpty(defaultValue)) {
      setDateValue(defaultValue);
    }

    return () => {
      null;
    };
  }, [defaultValue]);
  const onChange = (event, selectedDate) => {
    setShow(IOS);
    if (event.type === 'set') {
      setDateValue(moment(selectedDate).format('DD-MM-YYYY'));
      onDateSelect(selectedDate);
      setDate(selectedDate);
    }
  };

  return (
    <TouchableOpacity
      style={[styles.main, containerStyle]}
      activeOpacity={BaseSetting.buttonOpacity}
      onPress={() => {
        onPress();
        setShow(true);
      }}
    >
      {dateValue ? (
        <Text style={styles.DateText}>{dateValue}</Text>
      ) : (
        <Text style={styles.placeholder}>{`${translate(
          'SelectDate',
        )}...`}</Text>
      )}
      {show && (
        <>
          <DateTimePicker
            testID="dateTimePicker"
            minimumDate={moment().subtract(100, 'years')._d}
            maximumDate={new Date()}
            value={date}
            mode="date"
            display="spinner"
            onChange={onChange}
            style={styles.Picker}
            textColor={BaseColors.primary}
          />
          {IOS && (
            <Button
              title={translate('Close')}
              type="text"
              style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                left: 0,
              }}
              onPress={() => {
                onClose();
                setShow(false);
              }}
              TextStyle={{ color: BaseColors.black60 }}
            />
          )}
        </>
      )}
      <Icon name="calendar" size={20} color={BaseColors.black} />
    </TouchableOpacity>
  );
};

export default Picker;
