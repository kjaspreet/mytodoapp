const btn1 = document.querySelector('#addTodo')
let list = ''
btn1.addEventListener('click', my_add)
const ls = localStorage
let id_count = 0
let myListEl = ''
let cl_name = 'disabled'

function my_add()
{
	list = document.getElementById('addTodoItem').value
	my_fill_up(list,cl_name)
	my_set_localstorage(list)
}

function my_del(){
	let tr = this.parentNode;
	console.log(tr.getAttribute('id'))
	console.log(this.parentNode)
	ls.removeItem(tr.getAttribute('id'))
	this.parentNode.remove(this)
	let find = document.getElementById('todoList')
	if(find.children.length === 0)
	{
		ls.clear()
	}

}

function my_class(){
	let str = ''
	let n_str = ''
	if(this.className==='enabled'){
		this.className = 'disabled'
		if (typeof str !== 'undefined') {
			str = ls.getItem(this.getAttribute('id'))
		}
		n_str = str.replace('enabled','disabled')
		ls.setItem(this.getAttribute('id'),n_str)
	}
	else{
		this.className = 'enabled'
		str = ls.getItem(this.getAttribute('id'))
		n_str = str.replace('disabled','enabled')
		ls.setItem(this.getAttribute('id'),n_str)
	}
}

function my_set_localstorage(list)
{
	
	let key = 'id'+id_count
	let arr1 = []
	arr1.push(list)
	arr1.push('disabled')
	ls.setItem(key, JSON.stringify(arr1))
}

function my_get_localstorage()
{
	let output = []
	let i = 0
	let j = 0
	let n_key = ''
	for(i=0;i<ls.length;i++)
	{
		n_key = ls.key(i)
		output[j] = n_key
		output[j+1] = JSON.parse(ls.getItem(n_key))
		j = j + 2
	}	
	for(let i = 0; i < output.length; i=i+2)
		my_ls_fill_up(output[i],output[i+1][0],output[i+1][1])
	
}

function my_fill_up(element,cl_name)
{
	const myOL = document.querySelector('ol')
	myListEl = document.createElement('li')
	let mybutton = document.createElement('button')
	myListEl.textContent = element
	myListEl.className = cl_name
	mybutton.textContent = 'Delete'
	myOL.appendChild(myListEl)
	myListEl.appendChild(mybutton)
	id_count++
	myListEl.setAttribute('id','id'+id_count)
	myListEl.setAttribute('onclick','my_class()')
	myListEl.onclick = my_class
	mybutton.setAttribute('onclick','my_del()')
	mybutton.onclick = my_del	
	
}

function my_ls_fill_up(key,element,cl_name)
{
	const myOL = document.querySelector('ol')
	myListEl = document.createElement('li')
	let mybutton = document.createElement('button')
	myListEl.textContent = element
	myListEl.className = cl_name
	mybutton.textContent = 'Delete'
	myOL.appendChild(myListEl)
	myListEl.appendChild(mybutton)
	myListEl.setAttribute('id',key)
	myListEl.setAttribute('onclick','my_class()')
	myListEl.onclick = my_class
	mybutton.setAttribute('onclick','my_del()')
	mybutton.onclick = my_del	
	
}