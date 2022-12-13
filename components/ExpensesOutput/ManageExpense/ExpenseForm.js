import { View } from 'react-native'
import Input from './Input'

const ExpenseForm = () => {
  const amountChangedHandler = () => {}

  return (
    <View>
      <Input
        label='Amount'
        textInputConfig={{
          keyboardType: 'decimal-pad',
          onChangeText: amountChangedHandler
        }}
      />
      <Input
        label='Date'
        textInputConfig={{
          placeholder: 'YYYY-MM-DD',
          maxLength: 10,
          onChange: () => {}
        }}
      />
      <Input
        label='Description'
        textInputConfig={{
          multiline: true
        }}
      />
    </View>
  )
}

export default ExpenseForm
