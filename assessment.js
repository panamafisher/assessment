'use strict';
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');
/**
    * 指定した要素の子供を全部削除する関数
    * @param {HTMLElement}element HTMLの要素
    */
function removeAllChildren(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}    

assessmentButton.onclick = () => {
    const userName = userNameInput.value;
    if (userName.length === 0){//ガード句
        return;
    }
    
    // 診断結果表示エリアの作成
    removeAllChildren(resultDivided);
    const header = document.createElement('h3');
    header.innerText = '診断結果';
    resultDivided.appendChild(header);

    const paragragh = document.createElement('p');
    const result = assessment(userName);
    paragragh.innerText = result;
    resultDivided.appendChild(paragragh);

    //　ツイートエリアの作成
    removeAllChildren(tweetDivided);
    const anchor = document.createElement('a');
    const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag='
        +encodeURIComponent('組分け武士')
        +'&ref_src=twsrc%5Etfw';
    anchor.setAttribute('href',hrefValue);
    anchor.className = 'twitter-hashtag-button';
    anchor.setAttribute('data-text',result);
    anchor.innerText = 'Tweet #組分け武士';
    tweetDivided.appendChild(anchor);
    
    //widgets.js options
    const script = document.createElement('script');
    script.setAttribute('src','https://platform.twitter.com/widgets.js')
    tweetDivided.appendChild(script);
};

const answers =[
    '{userName}は織田家に仕えています。謀反を起こしますが殺されます。',
    '{userName}は徳川家に仕えています。参勤交代の度にそこそこうまいお菓子をもらえます。',
    '{userName}は豊臣家に仕えています。一夜城の労災で一族が存続します。',
    '{userName}は毛利家に仕えています。事あるごとに三本の矢をこすり続ける毛利のモノマネをしてるのを本人に見られます。',
    '{userName}は武田家に仕えています。信玄堤を壊して怒られがちです。',
    '{userName}は島津家に仕えています。デブすぎて死にます。',
    '{userName}は中川家に仕えています。お兄ちゃんが3年前から口をきいてくれなくなりました。',
    '{userName}は上杉家に仕えています。嫁が不細工すぎて醜女だけ楷書で書けます。'    
];
/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param{string}userName 
 * @return{string}　結果
 */
function assessment(userName){
    //get codeNum, then sum up
    let sum0fCharCode = 0;
    for(let i = 1; i < userName.length; i++){
        sum0fCharCode += userName.charCodeAt(i);
    }
    //divide
    const index = sum0fCharCode % answers.length;    
    let result = answers[index];
    
    result = result.replace(/{userName}/g,userName);
    return result;
}

// enter で診断
userNameInput.onkeydown = (event) =>{
    if(event.key === 'Enter'){
        assessmentButton.onclick();
    }
} 

//testcode
console.assert(
    assessment('松永弾正')　=== '松永弾正は徳川家に仕えています。参勤交代の度にそこそこうまいお菓子をもらえます。',
    '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
);

console.assert(
    assessment('rambo') === assessment('rambo'),
    'you cannot deal with same name'
);
