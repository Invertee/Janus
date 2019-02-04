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

document.getElementById('encrypt').addEventListener('click', function() 
{
    fetchWrapper( '/encrypt', 
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
                console.log(data)
                document.getElementById('input').value = data.result
            })
            .catch(err => console.error(err))
});

document.getElementById('decrypt').addEventListener('click', function() 
{
    fetchWrapper( '/decrypt', 
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
                console.log(data)
                document.getElementById('input').value = data.result
            })
            .catch(err => console.error(err))
});

document.getElementById('copybutton').addEventListener('click', function(){
    
    document.getElementById('input').select();

    document.execCommand("copy")
  
});
