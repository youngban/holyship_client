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
    title: '오늘 헤어졌어요',
    liked_id: '100',
  },
  {
    id: '2',
    title: '취업했어요',
    liked_id: '43',
  },
  {
    id: '3',
    title: '처음 뵙겠습니다.',
    liked_id: '20',
  },
];

// * UI Part
function Item({ id, title, liked_id, onSelect }) {
  return (
    <View>
      <TouchableOpacity onPress={() => onSelect(id)} style={[styles.item]}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.like}> 좋아요 : {liked_id}</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function MainMostLikedStories() {
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
        renderItem={({ item }) => (
          <Item
            id={item.id}
            liked_id={item.liked_id}
            title={item.title}
            onSelect={onSelect}
          />
        )}
        keyExtractor={item => item.id}
        extraData={selected}
        // horizontal={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    // backgroundColor: 'hotpink',
    borderColor: 'hotpink',
    borderRadius: 10,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 8,
  },
  title: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  like: {
    fontSize: 10,
    color: '#FC427B',
    fontWeight: 'bold',
  },
});
