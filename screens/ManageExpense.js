import { useContext, useLayoutEffect } from 'react'
import { StyleSheet, TextInput, View } from 'react-native'
import IconButton from '../UI/IconButton'
import { GlobalStyles } from '../constants/styles'
import Button from '../UI/Button'
import { ExpensesContext } from '../store/expenses-context'
import ExpenseForm from '../components/ExpensesOutput/ManageExpense/ExpenseForm'

const ManageExpense = ({ route, navigation }) => {
  const expensesCtx = useContext(ExpensesContext)

  const editedExpenseId = route.params?.expenseId

  const isEditing = !!editedExpenseId

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense'
    })
  }, [navigation, isEditing])

  const deleteExpenseHandler = () => {
    navigation.goBack()
    expensesCtx.deleteExpense(editedExpenseId)
  }

  const cancelHandler = () => {
    navigation.goBack()
  }

  const confirmHandler = () => {
    if (isEditing) {
      expensesCtx.updateExpense(editedExpenseId, {
        description: 'Test!',
        amount: 29.99,
        date: new Date('2022-05-20')
      })
    } else {
      expensesCtx.addExpense({
        description: 'Test',
        amount: 19.99,
        date: new Date('2022-05-19')
      })
    }
    navigation.goBack()
  }

  return (
    <View style={styles.container}>
      <ExpenseForm />
      <View style={styles.buttonContainer}>
        <Button style={styles.button} mode='flat' onPress={cancelHandler}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={confirmHandler}>
          {isEditing ? 'Update' : 'Add'}
        </Button>
      </View>
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon='trash'
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  )
}

export default ManageExpense

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center'
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
})
