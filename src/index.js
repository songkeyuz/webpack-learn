import _ from 'lodash';
import './style/index.css'; //导入css文件  安装模块工具 npm i -D style-loader css-loader
import './style/a.scss';

//在html中创建一个div
function createDomElement() {
    let dom = document.createElement('div');
    dom.innerHTML = _.join(['学习', 'webpack', 'sky', '']);
    //添加类名
    // dom.className = 'box';
    dom.classList.add('box');
    return dom;
}

let divDom = createDomElement();

document.body.appendChild(divDom);
console.log('sky mzz');