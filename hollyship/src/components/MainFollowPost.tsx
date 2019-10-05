import React from 'react';
import {
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';

// * 데이터 관리
const DATA = [
  {
    id: '1',
    userId: 'suyang',
    message: '오늘은 좋은 하루',
  },
  {
    id: '2',
    userId: 'hello',
    message: '내일은 좋은 하루',
  },
  {
    id: '3',
    userId: 'olleh',
    message: ' 하루',
  },
];

// * UI Part
function Item({ id, userId, message, onSelect }) {
  return (
    <View>
      <TouchableOpacity onPress={() => onSelect(id)} style={[styles.item]}>
        <Text style={styles.title}>
          {userId}
          {message}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default function MainFollowPost() {
  const [selected, setSelected] = React.useState(new Map());

  const onSelect = React.useCallback(
    id => {
      const newSelected = new Map(selected);
      newSelected.set(id, !selected.get(id));

      setSelected(newSelected);
    },
    [selected]
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={({ item, index }) => (
          <Item
            id={item.id}
            index={index}
            userId={item.userId}
            message={item.message}
            onSelect={onSelect}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
        extraData={selected}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: 'hotpink',
    borderRadius: 10,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 8,
  },
  title: {
    fontSize: 10,
    color: 'white',
    fontWeight: 'bold',
  },
});
