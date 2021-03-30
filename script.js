// DOM modelagem do HTML para o JS realizado pelo browser
const Modal = {
    toggle() {
        const modal = document.querySelector('.modal-overlay').classList;

        modal.contains('active') ? modal.remove('active') : modal.add('active')
    }
}

const transactions = [
    {
        id: 1,
        description: 'Luz',
        // utilizar a quantidade de casas decimais sem ponto, depois é tratado e formatado
        amount: -50020, //500.00
        date: '23/01/2021'
    },
    {
        id: 2,
        description: 'Criação website',
        // utilizar a quantidade de casas decimais sem ponto, depois é tratado e formatado
        amount: 500012, //500.00
        date: '23/01/2021'
    },
    {
        id: 3,
        description: 'Internet',
        amount: -20000,
        date: '23/01/2021'
    },
    {
        id: 4,
        description: 'App',
        amount: 200000,
        date: '23/01/2021'
    },
]

const Transaction = {
    // refatoração (traz o const transactions aqui pra dentro)
    all: transactions,
    add(transaction){
        Transaction.all.push(transaction)

        App.reload()
    },

    incomes() {
        // somar as entradas
        let income = 0;

        Transaction.all.forEach((transaction) => {
            if (transaction.amount >= 0) {
                income += transaction.amount;
            }
        })

        return income;
    },
    expenses() {
        // somar as saídas
        let expense = 0;

        Transaction.all.forEach((transaction) => {
            if (transaction.amount < 0) {
                expense += transaction.amount;
            }
        })

        return expense;
    },
    total() {
        return Transaction.incomes() + Transaction.expenses();
    }
}

const Utils = {
    formatCurrency(value) {
        const signal = Number(value) < 0 ? '-' : ''

        value = String(value).replace(/\D/g, "")

        value = Number(value) / 100

        value = value.toLocaleString("pt-BR", {
            style: 'currency',
            currency: "BRL"
        })

        return signal + value;
    }
}

const DOM = {
    transactionsContainer: document.querySelector('#data-table tbody'),

    addTransaction(transaction, index) {
        const tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHTMLTransaction(transaction)

        DOM.transactionsContainer.appendChild(tr)
    },
    // funcionalidade (html interno de uma transação
    innerHTMLTransaction(transaction) {
        const CSSclass = transaction.amount >= 0 ? 'income' : 'expense'

        const amount = Utils.formatCurrency(transaction.amount)

        const html = `
        <td class='description'>${transaction.description}</td>
        <td class='${CSSclass}'>${amount}</td>
        <td class='date'><time datetime="2021-01-23">${transaction.date}</time></td>
        <td>
            <img src="./assets/minus.svg" alt="remove transaction image" title="Remove transaction">
        </td>           
        `

        return html
    },
    updateBalance() {
        document.getElementById('income-display').innerHTML = Utils.formatCurrency(Transaction.incomes())
        document.getElementById('expense-display').innerHTML = Utils.formatCurrency(Transaction.expenses())
        document.getElementById('total-display').innerHTML = Utils.formatCurrency(Transaction.total())
    },

    clearTransactions() {
        DOM.transactionsContainer.innerHTML = '';
    }
}

const App = {
    init() {
    
    Transaction.all.forEach((transaction) => { 
        DOM.addTransaction(transaction) 
    })

    DOM.updateBalance()

    },
    reload() {
        DOM.clearTransactions()
        App.init();
    }
}

App.init()




Transaction.add({
    id: 39,
    description: 'telefone',
    amount: 200,
    date: '23/01/2021'
})


