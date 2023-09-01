import axios from 'axios'

export async function getDataOnSentence(number) {
  try {
    const response = await axios.get(`https://fish-text.ru/get?&type=sentence&number=${number}`)
    return response.data.text
    // console.log('Выводим по количеству предложений ' + number + ': ' + response.data.text)
  } catch (error) {
    console.log(error)
  }
}

export async function getDataOnWords(number) {
  try {
    const response = await axios.get(`https://fish-text.ru/get?&type=sentence&number=${number}`)
    const sentences = response.data.text.split(' ').slice(0, number)
    return sentences.join(' ')
    // console.log('Выводим по количеству слов ' + number + ': ' +sentences.join(' '))
  } catch (error) {
    console.log(error)
  }
}