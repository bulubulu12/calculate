// 获取id为calculator下面的所有span标签
var keys = document.querySelectorAll('#calculator span');
var operators = ['+', '-', 'x', '÷'];
var decimalAdded = false;

// 给每个span标签都添加一个点击事件
for(var i = 0; i < keys.length; i++) {
	keys[i].onclick = function(e) {
		// 获取输入和按钮值
		var input = document.querySelector('.screen');
		var inputVal = input.innerHTML;
		var btnVal = this.innerHTML;
		// 获取每个按健上面的文字
		// 如果按键上面的值是C则清空显示框的值
		if(btnVal == 'C') {
			input.innerHTML = '';
			decimalAdded = false;
		}
		
		// equation这个值是显示在头部的值
		else if(btnVal == '=') {
			var equation = inputVal;
			var lastChar = equation[equation.length - 1];
			// 最后一个字符
			// 如果是x则变为乘，如果是÷则变为除	
			equation = equation.replace(/x/g, '*').replace(/÷/g, '/');
			
			// 如果是最后一个字符有，或者最后的字符为点，计算后则将点去除
			if(operators.indexOf(lastChar) > -1 || lastChar == '.')
				equation = equation.replace(/.$/, '');
			// 如果头部显示框有值得计算这个值
			if(equation)
				input.innerHTML = eval(equation);
				// eval是可以解析js代码的函数	
			decimalAdded = false;
		}
		
		// 如果是加减乘除任意一个
		else if(operators.indexOf(btnVal) > -1) {
			var lastChar = inputVal[inputVal.length - 1];
			// 如果头部显示框有值而且不是加减乘除任意一个则不做计算	
			if(inputVal != '' && operators.indexOf(lastChar) == -1) 
				input.innerHTML += btnVal;
			
			// Allow minus if the string is empty
			else if(inputVal == '' && btnVal == '-') 
				input.innerHTML += btnVal;
			// 如果头部显示框没有值按了减号也不做计算
			if(operators.indexOf(lastChar) > -1 && inputVal.length > 1) {
				// 如果头部显示框有值，而且是最后一个是加减乘除任意一个则替换掉，变成当前点击的
				input.innerHTML = inputVal.replace(/.$/, btnVal);
			}
			
			decimalAdded =false;
		}
		
		// 如果点击的是点，在后面加点就是了	
		else if(btnVal == '.') {
			if(!decimalAdded) {
				input.innerHTML += btnVal;
				decimalAdded = true;
			}
		}
		
		// 点什么后面加什么	
		else {
			input.innerHTML += btnVal;
		}
		
		// 阻止默认事件
		e.preventDefault();
	} 
}