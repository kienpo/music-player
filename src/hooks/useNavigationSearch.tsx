import { colors } from '@/constants/tokens'
import { useNavigation } from '@react-navigation/native'
import { useLayoutEffect, useState } from 'react'
import { Searchbar } from 'react-native-paper'

const defaultSearchOptions = {
  tintColor: colors.primary,
  hideWhenScrolling: false,
  placeholder: 'Search',
}

export const useNavigationSearch = ({
  searchBarOptions,
}: {
  searchBarOptions?: Partial<typeof defaultSearchOptions>
}) => {
  const [search, setSearch] = useState('')

  const navigation = useNavigation()

  const handleOnChangeText = (text: string) => {
    setSearch(text)
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Searchbar
          placeholder="Search"
          onChangeText={handleOnChangeText}
          value={search}
        //   style={{ tintColor: searchBarOptions?.tintColor || defaultSearchOptions.tintColor }}
        />
      ),
    })
  }, [navigation, searchBarOptions])

  return search
}
