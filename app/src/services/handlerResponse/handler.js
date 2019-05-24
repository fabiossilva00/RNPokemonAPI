export const sucessoGetFirstList = response => {
    return {
        list: response.data.results,
        nextList: response.data.next
    }

}

export const errorRequest = response => {
    if (response.message == 'Network Error'){
        return {
            mensagem: 'Falha na conexão, verifique sua internet e tente novamente mais tarde'
        }
    }else{
        return {
            mensagem: response.message
        }
    }
}

export const sucessoNewList = response => {

    let previous = response.data.previous
    if (previous === null) {
        previous = ''
    } 

    let next = response.data.next
    if (next === null) {
        next = ''
    } 

    return {
        list: response.data.results,
        next: next,
        previous: previous
    }
}