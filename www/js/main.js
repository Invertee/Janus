var pageState = ''
var hidden = false
function fetchWrapper(url, options, timeout) 
{
    return new Promise((resolve, reject) => {
      fetch(url, options).then(resolve).catch(reject);

      if (timeout) {
        const e = new Error("Connection timed out");
        setTimeout(reject, timeout, e);
      }
    });
}

function submit(action) {
    fetchWrapper( `/${action}`, 
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            input: (document.getElementById('input').value),
        })
        }, 10000 )
        .then(data => {
            return data.json();
        })
        .then(data => {
            pageState = action
            if (data.status === 'okay')
            {   
                let inp = document.getElementById('input')
                inp.value = data.result
                copyText('input')
            } else {
                document.getElementById('input').value = data.result
                addFlash('input')
            }
        })
        .catch(err => console.error(err))
}

function copyText(elementID) {
    var copyText = document.getElementById(elementID);
    if (hidden) {
        toggleHidden()
        copyText.select();
        document.execCommand("copy");
        toggleHidden()
    } else {
        copyText.select();
        document.execCommand("copy");
    }
}

function toggleHidden() {
    if (hidden) {
        hidden = false
        document.getElementById('input').classList.remove('hidden')
        document.getElementById('hidebutton').innerText = '🙉'
    } else {
        hidden = true
        document.getElementById('input').classList.add('hidden')
        document.getElementById('hidebutton').innerText = '🙈'
    }
}

function addFlash(elementID) {
    let div = document.getElementById(elementID)
    div.classList.add('flash');
    setTimeout( () => {
        div.classList.remove('flash');
    }, 500);
}

document.getElementById('encrypt').addEventListener('click', () => submit("encrypt") );

document.getElementById('decrypt').addEventListener('click', () => submit("decrypt") );

document.getElementById('copybutton').addEventListener('click', () => {
    document.getElementById('input').select();
    copyText('input')
});

document.getElementById('hidebutton').addEventListener('click', () => toggleHidden() )

const buttons = document.querySelectorAll(".button")
for (const button of buttons) {
  button.addEventListener('click', () => {
    addFlash(button.id)
  })
}

document.onkeyup = (e) => {
    if (e.ctrlKey && e.which == 66) {
        submit('encrypt');
        addFlash('encrypt')
    } else if (e.ctrlKey && e.which == 77) {
        submit('decrypt');
        addFlash('decrypt')
    }
  };

window.addEventListener('DOMContentLoaded', () => {
    fetchWrapper('https://api.quotable.io/random' , {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
        }, 10000 )
    .then(data => {
        return data.json();
    })
    .then(json => {
        let div = document.getElementById('quote')
        div.innerText = json.content
        div.classList.add('fade-in')
    })
    .catch(err => {console.error(err)})
});